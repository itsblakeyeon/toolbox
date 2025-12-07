// Counter for generating unique IDs
let idCounter = 0;

/**
 * Generates a unique ID (timestamp + counter)
 * @returns {string} Unique ID
 */
const generateUniqueId = () => {
  idCounter++;
  return `${Date.now()}-${idCounter}`;
};

/**
 * Creates an empty row object
 * @returns {Object} New empty row object
 */
export const createEmptyRow = () => ({
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
 * @param {Object} copiedRow - Copied row data
 * @returns {Object} Row object with new ID
 */
export const createRowFromCopied = (copiedRow) => ({
  ...copiedRow,
  id: generateUniqueId(),
  selected: false,
});
