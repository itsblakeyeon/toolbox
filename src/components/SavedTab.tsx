"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";
import SavedTableHeader from "./SavedTableHeader";
import SavedTableRow from "./SavedTableRow";
import type { SavedItem, SavedItemWithSelection } from "@/types";

interface SavedTabProps {
  savedItems: SavedItem[];
  onDeleteAll: () => void;
  onDeleteSelected: (ids: number[]) => void;
  onUpdateComment: (id: number, comment: string) => void;
}

function SavedTab({
  savedItems,
  onDeleteAll,
  onDeleteSelected,
  onUpdateComment,
}: SavedTabProps) {
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
      <div className="max-w-full mx-auto py-16 text-center">
        <p className="text-[var(--text-secondary)] text-base">No saved URLs.</p>
        <p className="text-[var(--text-tertiary)] text-sm mt-2">
          Select and save URLs from the Builder tab.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      {/* Control buttons */}
      <div className="mb-4 flex gap-2 items-center">
        <button
          onClick={onDeleteAll}
          className="notion-button"
          title="Delete all saved items"
        >
          Reset All
        </button>

        <div className="flex-1"></div>

        <button
          onClick={toggleSelectAll}
          className="notion-button"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        <div className="h-5 w-px bg-[var(--border-default)]"></div>

        <button
          onClick={handleDeleteSelected}
          disabled={!hasSelectedRows}
          className="notion-button notion-button-danger"
          title="Delete selected items"
        >
          Delete Selected
        </button>
      </div>

      {/* Table format */}
      <div className="notion-table-container overflow-x-auto">
        <table className="notion-table">
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
                onUpdateComment={onUpdateComment}
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
