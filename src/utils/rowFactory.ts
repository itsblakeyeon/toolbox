import type { UTMRow } from "@/types";

// Counter for generating unique IDs
let idCounter = 0;

/**
 * Generates a unique ID (timestamp + counter)
 */
const generateUniqueId = (): string => {
  idCounter++;
  return `${Date.now()}-${idCounter}`;
};

/**
 * Creates an empty row object
 */
export const createEmptyRow = (): UTMRow => ({
  id: generateUniqueId(),
  baseUrl: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  selected: false,
});

/**
 * Creates a new row based on a copied row
 */
export const createRowFromCopied = (copiedRow: UTMRow): UTMRow => ({
  ...copiedRow,
  id: generateUniqueId(),
  selected: false,
});
