"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";
import SavedTableHeader from "./SavedTableHeader";
import SavedTableRow from "./SavedTableRow";
import type { SavedItem, SavedItemWithSelection } from "@/types";

interface SavedTabProps {
  savedItems: SavedItem[];
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
  onDeleteSelected: (ids: number[]) => void;
  onUpdateComment: (id: number, comment: string) => void;
}

function SavedTab({
  savedItems,
  onDelete,
  onDeleteAll,
  onDeleteSelected,
  onUpdateComment,
}: SavedTabProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editComment, setEditComment] = useState("");

  const [itemsWithSelection, setItemsWithSelection] = useState<
    SavedItemWithSelection[]
  >(() => savedItems.map((item) => ({ ...item, selected: false })));

  useEffect(() => {
    setItemsWithSelection((prev) => {
      const prevMap = new Map(prev.map((item) => [item.id, item.selected]));
      return savedItems.map((item) => ({
        ...item,
        selected: prevMap.get(item.id) || false,
      }));
    });
  }, [savedItems]);

  const { toast, showToast, hideToast } = useToast();

  const startEditComment = (item: SavedItemWithSelection) => {
    setEditingCommentId(item.id);
    setEditComment(item.comment || "");
  };

  const saveComment = (id: number) => {
    onUpdateComment(id, editComment);
    setEditingCommentId(null);
    setEditComment("");
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditComment("");
  };

  const updateEditComment = (value: string) => {
    setEditComment(value);
  };

  const toggleSelect = (id: number) => {
    setItemsWithSelection((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = itemsWithSelection.every((item) => item.selected);
    setItemsWithSelection((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const handleDeleteSelected = () => {
    const selectedItems = itemsWithSelection.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      showToast("Please select items to delete!", "warning");
      return;
    }
    onDeleteSelected(selectedItems.map((item) => item.id));
  };

  const allSelected =
    itemsWithSelection.length > 0 &&
    itemsWithSelection.every((item) => item.selected);

  const hasSelectedRows = itemsWithSelection.some((item) => item.selected);

  if (savedItems.length === 0) {
    return (
      <div className="max-w-full mx-auto p-6">
        <div className="glass-strong rounded-2xl p-12 text-center shadow-xl">
          <p className="text-gray-200 text-lg">No saved URLs.</p>
          <p className="text-gray-400 text-sm mt-2">
            Select and save URLs from the Builder tab.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6">
      {/* Control buttons */}
      <div className="mb-4 flex gap-3 items-center">
        <div className="flex-1"></div>

        <button
          onClick={toggleSelectAll}
          className="glass-button glass-button-purple text-white px-4 py-2 rounded-xl font-medium shadow-lg"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <button
          onClick={handleDeleteSelected}
          disabled={!hasSelectedRows}
          className={`glass-button glass-button-red text-white px-4 py-2 rounded-xl font-medium shadow-lg ${
            !hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Delete selected items"
        >
          Delete Selected
        </button>
      </div>

      {/* Table format */}
      <div className="overflow-x-auto rounded-2xl glass-strong shadow-2xl">
        <table className="w-full">
          <SavedTableHeader
            allSelected={allSelected}
            onToggleSelectAll={toggleSelectAll}
          />
          <tbody>
            {itemsWithSelection.map((item, index) => (
              <SavedTableRow
                key={item.id}
                item={item}
                index={index}
                isSelected={item.selected}
                onToggleSelect={toggleSelect}
                editingCommentId={editingCommentId}
                editComment={editComment}
                onStartEditComment={startEditComment}
                onSaveComment={saveComment}
                onCancelEditComment={cancelEditComment}
                onUpdateEditComment={updateEditComment}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast notifications */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default SavedTab;
