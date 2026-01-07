// UTM Row data structure
export interface UTMRow {
  id: string;
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  selected: boolean;
  // Index signature for dynamic field access
  [key: string]: string | boolean;
}

// Saved item structure
export interface SavedItem {
  id: number;
  campaignName: string;
  savedAt: number;
  comment: string;
  params: {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
  };
  fullUrl: string;
}

// Saved item with selection state
export interface SavedItemWithSelection extends SavedItem {
  selected: boolean;
}

// Cell position for keyboard navigation
export interface CellPosition {
  rowIndex: number;
  field: UTMField;
}

// Cell range for selection
export interface CellRange {
  start: CellPosition;
  end: CellPosition;
}

// Row range for selection
export interface RowRange {
  start: number;
  end: number;
}

// Toast notification
export interface ToastState {
  message: string;
  type: "success" | "warning" | "error";
}

// History state for undo/redo
export interface HistoryState {
  rows: UTMRow[];
  editingCell: CellPosition | null;
}

// UTM field names
export type UTMField =
  | "baseUrl"
  | "source"
  | "medium"
  | "campaign"
  | "term"
  | "content";

// Field configuration
export interface FieldConfig {
  key: UTMField;
  placeholder: string;
}

// Keyboard shortcut item
export interface ShortcutItem {
  key: string;
  description: string;
}

// Keyboard shortcut category
export interface ShortcutCategory {
  category: string;
  items: ShortcutItem[];
}
