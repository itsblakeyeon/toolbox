(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/urlBuilder.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildUTMUrl",
    ()=>buildUTMUrl
]);
const buildUTMUrl = ({ baseUrl, source, medium, campaign, term, content })=>{
    // Return empty string if baseUrl is missing
    if (!baseUrl) {
        return "";
    }
    try {
        // Add https:// if URL doesn't have a protocol
        const fullUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
        const url = new URL(fullUrl);
        // Add UTM parameters if they exist
        if (source) url.searchParams.set("utm_source", source);
        if (medium) url.searchParams.set("utm_medium", medium);
        if (campaign) url.searchParams.set("utm_campaign", campaign);
        if (term) url.searchParams.set("utm_term", term);
        if (content) url.searchParams.set("utm_content", content);
        return url.toString();
    } catch  {
        // Return empty string if URL is invalid
        return "";
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/rowFactory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEmptyRow",
    ()=>createEmptyRow,
    "createRowFromCopied",
    ()=>createRowFromCopied
]);
// Counter for generating unique IDs
let idCounter = 0;
/**
 * Generates a unique ID (timestamp + counter)
 */ const generateUniqueId = ()=>{
    idCounter++;
    return `${Date.now()}-${idCounter}`;
};
const createEmptyRow = ()=>({
        id: generateUniqueId(),
        baseUrl: "",
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
        selected: false
    });
const createRowFromCopied = (copiedRow)=>({
        ...copiedRow,
        id: generateUniqueId(),
        selected: false
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useRowClipboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRowClipboard",
    ()=>useRowClipboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rowFactory.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const useRowClipboard = ()=>{
    _s();
    const [copiedRow, setCopiedRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedRows, setCopiedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * Copy a single row to clipboard
   */ const copyRow = (row)=>{
        setCopiedRow({
            ...row
        });
        setCopiedRows(null);
        return true;
    };
    /**
   * Copy multiple rows to clipboard
   */ const copyRows = (rows)=>{
        if (rows && rows.length > 0) {
            setCopiedRows(rows.map((row)=>({
                    ...row
                })));
            setCopiedRow(null);
            return true;
        }
        return false;
    };
    /**
   * Paste a single row at a specific position
   */ const pasteRow = (rows, rowIndex)=>{
        if (!copiedRow && !copiedRows) {
            return {
                success: false
            };
        }
        if (copiedRows && copiedRows.length > 0) {
            return pasteRows(rows, rowIndex);
        }
        if (copiedRow) {
            const newRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRowFromCopied"])(copiedRow);
            const newRows = [
                ...rows.slice(0, rowIndex + 1),
                newRow,
                ...rows.slice(rowIndex + 1)
            ];
            return {
                success: true,
                newRows,
                insertedIndex: rowIndex + 1
            };
        }
        return {
            success: false
        };
    };
    /**
   * Paste multiple rows at a specific position
   */ const pasteRows = (rows, rowIndex)=>{
        if (!copiedRows || copiedRows.length === 0) {
            return pasteRow(rows, rowIndex);
        }
        const newRows = copiedRows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRowFromCopied"])(row));
        const updatedRows = [
            ...rows.slice(0, rowIndex + 1),
            ...newRows,
            ...rows.slice(rowIndex + 1)
        ];
        return {
            success: true,
            newRows: updatedRows,
            insertedIndex: rowIndex + 1
        };
    };
    return {
        copiedRow,
        copiedRows,
        copyRow,
        copyRows,
        pasteRow,
        pasteRows,
        hasCopiedRow: copiedRow !== null || copiedRows !== null && copiedRows.length > 0
    };
};
_s(useRowClipboard, "2wW4MekerNJYCuhJ8beGj0GxZo8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useToast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useToast = ()=>{
    _s();
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[showToast]": (message, type = "success")=>{
            setToast({
                message,
                type
            });
        }
    }["useToast.useCallback[showToast]"], []);
    const hideToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useToast.useCallback[hideToast]": ()=>{
            setToast(null);
        }
    }["useToast.useCallback[hideToast]"], []);
    return {
        toast,
        showToast,
        hideToast
    };
};
_s(useToast, "MXt/530GHE00Hv521G9IqSMOnck=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useCellSelection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCellSelection",
    ()=>useCellSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useCellSelection = (rows, setRows, fields, showToast, setEditingCell)=>{
    _s();
    const [selectedCell, setSelectedCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCellRange, setSelectedCellRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedCellRangeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selectedCellRange);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCellSelection.useEffect": ()=>{
            selectedCellRangeRef.current = selectedCellRange;
        }
    }["useCellSelection.useEffect"], [
        selectedCellRange
    ]);
    const handleCellSelectionKeyDown = (e, rowIndex, field)=>{
        if (!e || !e.key) return;
        // Shift + Arrow: Cell range selection
        if (e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
            e.preventDefault();
            const currentRange = selectedCellRangeRef.current;
            const startCell = currentRange ? currentRange.start : {
                rowIndex,
                field
            };
            let endCell = {
                rowIndex,
                field
            };
            if (e.key === "ArrowUp") {
                endCell = {
                    rowIndex: Math.max(0, rowIndex - 1),
                    field
                };
            } else if (e.key === "ArrowDown") {
                endCell = {
                    rowIndex: Math.min(rows.length - 1, rowIndex + 1),
                    field
                };
            } else if (e.key === "ArrowLeft") {
                const currentFieldIndex = fields.indexOf(field);
                if (currentFieldIndex > 0) {
                    endCell = {
                        rowIndex,
                        field: fields[currentFieldIndex - 1]
                    };
                }
            } else if (e.key === "ArrowRight") {
                const currentFieldIndex = fields.indexOf(field);
                if (currentFieldIndex < fields.length - 1) {
                    endCell = {
                        rowIndex,
                        field: fields[currentFieldIndex + 1]
                    };
                }
            }
            setSelectedCellRange({
                start: startCell,
                end: endCell
            });
            setSelectedCell(endCell);
            return;
        }
        // Delete or Backspace: Delete cell values
        if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();
            const currentRange = selectedCellRangeRef.current;
            if (currentRange) {
                const minRow = Math.min(currentRange.start.rowIndex, currentRange.end.rowIndex);
                const maxRow = Math.max(currentRange.start.rowIndex, currentRange.end.rowIndex);
                const startFieldIndex = fields.indexOf(currentRange.start.field);
                const endFieldIndex = fields.indexOf(currentRange.end.field);
                const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
                const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);
                setRows((prevRows)=>prevRows.map((row, idx)=>{
                        if (idx >= minRow && idx <= maxRow) {
                            const updatedRow = {
                                ...row
                            };
                            for(let i = minFieldIndex; i <= maxFieldIndex; i++){
                                updatedRow[fields[i]] = "";
                            }
                            return updatedRow;
                        }
                        return row;
                    }));
            } else {
                setRows((prevRows)=>prevRows.map((row, idx)=>idx === rowIndex ? {
                            ...row,
                            [field]: ""
                        } : row));
            }
            return;
        }
        // Cmd/Ctrl + C: Copy cell values
        if ((e.metaKey || e.ctrlKey) && e.key === "c") {
            e.preventDefault();
            const currentRange = selectedCellRangeRef.current;
            if (currentRange) {
                const minRow = Math.min(currentRange.start.rowIndex, currentRange.end.rowIndex);
                const maxRow = Math.max(currentRange.start.rowIndex, currentRange.end.rowIndex);
                const startFieldIndex = fields.indexOf(currentRange.start.field);
                const endFieldIndex = fields.indexOf(currentRange.end.field);
                const minFieldIndex = Math.min(startFieldIndex, endFieldIndex);
                const maxFieldIndex = Math.max(startFieldIndex, endFieldIndex);
                const cellValues = [];
                for(let r = minRow; r <= maxRow; r++){
                    const rowValues = [];
                    for(let f = minFieldIndex; f <= maxFieldIndex; f++){
                        const fieldKey = fields[f];
                        const row = rows[r];
                        rowValues.push(row[fieldKey] || "");
                    }
                    cellValues.push(rowValues.join("\t"));
                }
                const textToCopy = cellValues.join("\n");
                navigator.clipboard.writeText(textToCopy);
                showToast("Cell range copied to clipboard!", "success");
            } else {
                const cellValue = rows[rowIndex][field] || "";
                navigator.clipboard.writeText(cellValue);
                showToast("Cell value copied to clipboard!", "success");
            }
            return;
        }
        // Cmd/Ctrl + V: Paste cell values
        if ((e.metaKey || e.ctrlKey) && e.key === "v") {
            e.preventDefault();
            navigator.clipboard.readText().then((text)=>{
                if (!text) return;
                const lines = text.split("\n").filter((line)=>line.trim());
                if (lines.length === 0) return;
                const currentRange = selectedCellRangeRef.current;
                const startRow = currentRange ? currentRange.start.rowIndex : rowIndex;
                const startField = currentRange ? currentRange.start.field : field;
                const startFieldIndex = fields.indexOf(startField);
                setRows((prevRows)=>{
                    const newRows = [
                        ...prevRows
                    ];
                    lines.forEach((line, lineIndex)=>{
                        const values = line.split("\t");
                        const targetRowIndex = startRow + lineIndex;
                        if (targetRowIndex < newRows.length) {
                            values.forEach((value, colIndex)=>{
                                const targetFieldIndex = startFieldIndex + colIndex;
                                if (targetFieldIndex < fields.length) {
                                    newRows[targetRowIndex] = {
                                        ...newRows[targetRowIndex],
                                        [fields[targetFieldIndex]]: value.trim()
                                    };
                                }
                            });
                        }
                    });
                    return newRows;
                });
                showToast("Pasted!", "success");
            }).catch(()=>{
                showToast("Failed to read clipboard!", "error");
            });
            return;
        }
        // Arrow keys: Navigate to adjacent cells
        const arrowKeys = {
            ArrowUp: {
                rowDelta: -1,
                fieldDelta: 0,
                rowBoundCheck: (r)=>r > 0
            },
            ArrowDown: {
                rowDelta: 1,
                fieldDelta: 0,
                rowBoundCheck: (r)=>r < rows.length - 1
            },
            ArrowLeft: {
                rowDelta: 0,
                fieldDelta: -1,
                fieldBoundCheck: (f)=>f > 0
            },
            ArrowRight: {
                rowDelta: 0,
                fieldDelta: 1,
                fieldBoundCheck: (f)=>f < fields.length - 1
            }
        };
        const arrowConfig = arrowKeys[e.key];
        if (arrowConfig) {
            e.preventDefault();
            const currentRange = selectedCellRangeRef.current;
            if (currentRange) {
                const startRow = currentRange.start.rowIndex;
                const startField = currentRange.start.field;
                const startFieldIndex = fields.indexOf(startField);
                const newRow = startRow + arrowConfig.rowDelta;
                const newFieldIndex = startFieldIndex + arrowConfig.fieldDelta;
                const canMoveRow = arrowConfig.rowBoundCheck ? arrowConfig.rowBoundCheck(startRow) : true;
                const canMoveField = arrowConfig.fieldBoundCheck ? arrowConfig.fieldBoundCheck(startFieldIndex) : true;
                if (canMoveRow && canMoveField) {
                    setSelectedCell({
                        rowIndex: newRow,
                        field: arrowConfig.fieldDelta !== 0 ? fields[newFieldIndex] : startField
                    });
                    setSelectedCellRange(null);
                }
            } else {
                const currentFieldIndex = fields.indexOf(field);
                const newRow = rowIndex + arrowConfig.rowDelta;
                const newFieldIndex = currentFieldIndex + arrowConfig.fieldDelta;
                const canMoveRow = arrowConfig.rowBoundCheck ? arrowConfig.rowBoundCheck(rowIndex) : true;
                const canMoveField = arrowConfig.fieldBoundCheck ? arrowConfig.fieldBoundCheck(currentFieldIndex) : true;
                if (canMoveRow && canMoveField) {
                    setSelectedCell({
                        rowIndex: newRow,
                        field: arrowConfig.fieldDelta !== 0 ? fields[newFieldIndex] : field
                    });
                    setSelectedCellRange(null);
                }
            }
            return;
        }
        // Enter or character input: Switch to edit mode
        if (e.key === "Enter" || e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (e.key.length === 1 && e.key !== "Enter") {
                setRows((prevRows)=>prevRows.map((row, idx)=>idx === rowIndex ? {
                            ...row,
                            [field]: e.key
                        } : row));
            }
            setSelectedCell(null);
            setSelectedCellRange(null);
            setEditingCell({
                rowIndex,
                field
            });
            return;
        }
    };
    return {
        selectedCell,
        selectedCellRange,
        setSelectedCell,
        setSelectedCellRange,
        handleCellSelectionKeyDown
    };
};
_s(useCellSelection, "EGyL2HzZL6T/DuUxQFQViwYM1/E=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useRowSelection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRowSelection",
    ()=>useRowSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRowClipboard.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const useRowSelection = (rows, setRows, onDeleteRow, onToggleSelect, showToast, focusCell, lastFocusedField)=>{
    _s();
    const [selectedRowIndex, setSelectedRowIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedRange, setSelectedRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { copyRow, copyRows, pasteRows } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowClipboard"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRowSelection.useEffect": ()=>{
            if (selectedRowIndex !== null) {
                requestAnimationFrame({
                    "useRowSelection.useEffect": ()=>{
                        const rowElement = document.querySelector(`tr[data-row-index="${selectedRowIndex}"]`);
                        if (rowElement) {
                            rowElement.focus();
                        }
                    }
                }["useRowSelection.useEffect"]);
            }
        }
    }["useRowSelection.useEffect"], [
        selectedRowIndex,
        selectedRange
    ]);
    const handleRowSelectionKeyDown = (e, rowIndex)=>{
        if (!e || !e.key) return;
        // Shift + ArrowUp/Down: Range selection
        if (e.shiftKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
            e.preventDefault();
            const startIndex = selectedRange ? selectedRange.start : rowIndex;
            let endIndex = rowIndex;
            if (e.key === "ArrowUp") {
                endIndex = Math.max(0, rowIndex - 1);
            } else if (e.key === "ArrowDown") {
                endIndex = Math.min(rows.length - 1, rowIndex + 1);
            }
            setSelectedRange({
                start: startIndex,
                end: endIndex
            });
            setSelectedRowIndex(endIndex);
            return;
        }
        // Space: Toggle checkbox
        if (e.key === " ") {
            e.preventDefault();
            if (onToggleSelect) {
                if (selectedRange) {
                    const minIndex = Math.min(selectedRange.start, selectedRange.end);
                    const maxIndex = Math.max(selectedRange.start, selectedRange.end);
                    const rangeRows = rows.slice(minIndex, maxIndex + 1);
                    const allSelected = rangeRows.every((row)=>row.selected);
                    rangeRows.forEach((row)=>{
                        if (allSelected && row.selected) {
                            onToggleSelect(row.id);
                        } else if (!allSelected && !row.selected) {
                            onToggleSelect(row.id);
                        }
                    });
                } else {
                    onToggleSelect(rows[rowIndex].id);
                }
            }
            return;
        }
        // ArrowUp/Down: Move rows
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const delta = e.key === "ArrowUp" ? -1 : 1;
            const boundCheck = e.key === "ArrowUp" ? (idx)=>idx > 0 : (idx)=>idx < rows.length - 1;
            if (selectedRange) {
                const startIndex = selectedRange.start;
                if (boundCheck(startIndex)) {
                    setSelectedRowIndex(startIndex + delta);
                    setSelectedRange(null);
                }
            } else if (boundCheck(rowIndex)) {
                setSelectedRowIndex(rowIndex + delta);
            }
        } else if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();
            if (selectedRange) {
                const minIndex = Math.min(selectedRange.start, selectedRange.end);
                const maxIndex = Math.max(selectedRange.start, selectedRange.end);
                const deleteCount = maxIndex - minIndex + 1;
                if (rows.length - deleteCount < 1) {
                    showToast("At least 1 row is required!", "warning");
                    return;
                }
                setRows((prevRows)=>prevRows.filter((_, idx)=>idx < minIndex || idx > maxIndex));
                showToast(`${deleteCount} row(s) deleted!`, "success");
                setSelectedRange(null);
                const newRowCount = rows.length - deleteCount;
                if (newRowCount > 0) {
                    const newIndex = Math.min(minIndex, newRowCount - 1);
                    requestAnimationFrame(()=>{
                        setSelectedRowIndex(newIndex);
                        setTimeout(()=>{
                            const rowElement = document.querySelector(`tr[data-row-index="${newIndex}"]`);
                            if (rowElement) {
                                rowElement.focus();
                            }
                        }, 0);
                    });
                } else {
                    setSelectedRowIndex(null);
                }
            } else {
                if (rows.length > 1) {
                    onDeleteRow(rows[rowIndex].id);
                    showToast("Row deleted!", "success");
                    const newFocusIndex = rowIndex > 0 ? rowIndex - 1 : 0;
                    requestAnimationFrame(()=>{
                        setSelectedRowIndex(newFocusIndex);
                        setTimeout(()=>{
                            const rowElement = document.querySelector(`tr[data-row-index="${newFocusIndex}"]`);
                            if (rowElement) {
                                rowElement.focus();
                            }
                        }, 0);
                    });
                } else {
                    showToast("At least 1 row is required!", "warning");
                }
            }
        } else if ((e.metaKey || e.ctrlKey) && e.key === "c") {
            e.preventDefault();
            if (selectedRange) {
                const minIndex = Math.min(selectedRange.start, selectedRange.end);
                const maxIndex = Math.max(selectedRange.start, selectedRange.end);
                const rowsToCopy = rows.slice(minIndex, maxIndex + 1);
                if (copyRows(rowsToCopy)) {
                    showToast(`${rowsToCopy.length} row(s) copied!`, "success");
                }
            } else {
                if (copyRow(rows[rowIndex])) {
                    showToast("Row copied!", "success");
                }
            }
        } else if ((e.metaKey || e.ctrlKey) && e.key === "v") {
            e.preventDefault();
            const result = pasteRows(rows, rowIndex);
            if (result.success && result.newRows) {
                setRows(result.newRows);
                if (result.insertedIndex !== undefined) {
                    setSelectedRowIndex(result.insertedIndex);
                }
                showToast("Row(s) pasted!", "success");
            }
        } else if (e.key === "Enter" || e.key.length === 1) {
            e.preventDefault();
            setSelectedRowIndex(null);
            focusCell(rowIndex, lastFocusedField);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setSelectedRowIndex(null);
            setSelectedRange(null);
            focusCell(rowIndex, lastFocusedField);
        }
    };
    return {
        selectedRowIndex,
        selectedRange,
        setSelectedRowIndex,
        setSelectedRange,
        handleRowSelectionKeyDown
    };
};
_s(useRowSelection, "kNUDmnSDT52oQ1DDhHgcREJScHk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowClipboard"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useKeyboardNavigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardNavigation",
    ()=>useKeyboardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rowFactory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRowClipboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCellSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCellSelection.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRowSelection.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const useKeyboardNavigation = (rows, setRows, fields, onDeleteRow, onToggleSelect, editingCell, setEditingCell)=>{
    _s();
    const [lastFocusedField, setLastFocusedField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("baseUrl");
    const [isComposing, setIsComposing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { copyRow } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowClipboard"])();
    const focusCell = (rowIndex, field)=>{
        if (rowIndex < 0) return;
        const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
        const nextInput = document.querySelector(selector);
        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        }
    };
    const { selectedCell, selectedCellRange, setSelectedCell, setSelectedCellRange, handleCellSelectionKeyDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCellSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCellSelection"])(rows, setRows, fields, showToast, setEditingCell);
    const { selectedRowIndex, selectedRange, setSelectedRowIndex, setSelectedRange, handleRowSelectionKeyDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowSelection"])(rows, setRows, onDeleteRow, onToggleSelect, showToast, focusCell, lastFocusedField);
    const wrappedCellSelectionKeyDown = (e, rowIndex, field)=>{
        if (e.key === "Escape") {
            e.preventDefault();
            setSelectedCell(null);
            setSelectedCellRange(null);
            setSelectedRowIndex(rowIndex);
            setSelectedRange(null);
            requestAnimationFrame(()=>{
                const rowElement = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
                if (rowElement) {
                    rowElement.focus();
                }
            });
            return;
        }
        handleCellSelectionKeyDown(e, rowIndex, field);
    };
    const handleInputFocus = (field, rowIndex)=>{
        setSelectedRowIndex(null);
        setSelectedCell(null);
        setSelectedCellRange(null);
        setEditingCell({
            rowIndex,
            field
        });
        setLastFocusedField(field);
    };
    const handleKeyDown = (e, rowIndex, field)=>{
        if (!e || !e.target) return;
        const input = e.target;
        const cursorAtStart = input.selectionStart === 0;
        const cursorAtEnd = input.selectionStart === input.value.length;
        // ESC: Exit edit mode → Cell selection mode
        if (e.key === "Escape") {
            e.preventDefault();
            const isEditingMode = editingCell && editingCell.rowIndex === rowIndex && editingCell.field === field;
            const isCurrentCellSelected = selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.field === field;
            if (isEditingMode) {
                setEditingCell(null);
                setSelectedCell({
                    rowIndex,
                    field
                });
                setSelectedCellRange(null);
                setSelectedRowIndex(null);
                setSelectedRange(null);
            } else if (isCurrentCellSelected) {
                setSelectedCell(null);
                setSelectedCellRange(null);
                setSelectedRowIndex(rowIndex);
                setSelectedRange(null);
            }
            return;
        }
        // Shift + Arrow: Cell range selection
        if (e.shiftKey && !e.metaKey && !e.ctrlKey && [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(e.key)) {
            const hasSelection = input.selectionStart !== input.selectionEnd;
            if (hasSelection) {
                if (e.key === "ArrowLeft" && !cursorAtStart) {
                    return;
                }
                if (e.key === "ArrowRight" && !cursorAtEnd) {
                    return;
                }
            }
            if (e.key === "ArrowLeft" && !cursorAtStart) {
                return;
            }
            if (e.key === "ArrowRight" && !cursorAtEnd) {
                return;
            }
            e.preventDefault();
            setEditingCell(null);
            const startCell = {
                rowIndex,
                field
            };
            let endCell = {
                ...startCell
            };
            if (e.key === "ArrowUp") {
                endCell = {
                    rowIndex: Math.max(0, rowIndex - 1),
                    field
                };
            } else if (e.key === "ArrowDown") {
                endCell = {
                    rowIndex: Math.min(rows.length - 1, rowIndex + 1),
                    field
                };
            } else if (e.key === "ArrowLeft") {
                const currentFieldIndex = fields.indexOf(field);
                if (currentFieldIndex > 0) {
                    endCell = {
                        rowIndex,
                        field: fields[currentFieldIndex - 1]
                    };
                }
            } else if (e.key === "ArrowRight") {
                const currentFieldIndex = fields.indexOf(field);
                if (currentFieldIndex < fields.length - 1) {
                    endCell = {
                        rowIndex,
                        field: fields[currentFieldIndex + 1]
                    };
                }
            }
            setSelectedCellRange({
                start: startCell,
                end: endCell
            });
            setSelectedCell(endCell);
            setSelectedRowIndex(null);
            setSelectedRange(null);
            return;
        }
        // Cmd/Ctrl + C: Copy row
        if ((e.metaKey || e.ctrlKey) && e.key === "c") {
            const hasSelection = input.selectionStart !== input.selectionEnd;
            if (hasSelection) {
                return;
            }
            e.preventDefault();
            if (copyRow(rows[rowIndex])) {
                showToast("Row copied!", "success");
            }
            return;
        }
        // Enter: Move to next row
        if (e.key === "Enter") {
            if (isComposing) return;
            e.preventDefault();
            if (rowIndex === rows.length - 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])(()=>{
                    const newRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])();
                    setRows((prevRows)=>[
                            ...prevRows,
                            newRow
                        ]);
                });
                requestAnimationFrame(()=>{
                    focusCell(rowIndex + 1, field);
                });
            } else {
                focusCell(rowIndex + 1, field);
            }
        } else if (e.key === "ArrowDown") {
            if (isComposing) return;
            e.preventDefault();
            focusCell(rowIndex + 1, field);
        } else if (e.key === "ArrowUp") {
            if (isComposing) return;
            e.preventDefault();
            focusCell(rowIndex - 1, field);
        } else if (e.key === "ArrowRight" && cursorAtEnd) {
            e.preventDefault();
            const currentFieldIndex = fields.indexOf(field);
            if (currentFieldIndex < fields.length - 1) {
                focusCell(rowIndex, fields[currentFieldIndex + 1]);
            }
        } else if (e.key === "ArrowLeft" && cursorAtStart) {
            e.preventDefault();
            const currentFieldIndex = fields.indexOf(field);
            if (currentFieldIndex > 0) {
                focusCell(rowIndex, fields[currentFieldIndex - 1]);
            }
        }
    };
    return {
        selectedCell,
        selectedCellRange,
        selectedRowIndex,
        selectedRange,
        setSelectedCell,
        setSelectedCellRange,
        setSelectedRowIndex,
        setSelectedRange,
        handleCellSelectionKeyDown: wrappedCellSelectionKeyDown,
        handleRowSelectionKeyDown,
        handleInputFocus,
        handleKeyDown,
        isComposing,
        onCompositionStart: ()=>setIsComposing(true),
        onCompositionEnd: ()=>setIsComposing(false),
        focusCell
    };
};
_s(useKeyboardNavigation, "/hEtIzuB0Siv38iePwEHFPc1xjI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowClipboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowClipboard"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCellSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCellSelection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRowSelection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRowSelection"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useHistory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHistory",
    ()=>useHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useHistory = (initialState, options = {})=>{
    _s();
    const { maxHistory = 50, onUndoRedo = null } = options;
    const createHistoryReducer = (maxHist)=>{
        return (state, action)=>{
            switch(action.type){
                case "SET":
                    {
                        return {
                            ...state,
                            present: action.payload
                        };
                    }
                case "RECORD":
                    {
                        const newPast = [
                            ...state.past,
                            action.payload
                        ];
                        if (newPast.length > maxHist) {
                            newPast.shift();
                        }
                        return {
                            past: newPast,
                            present: state.present,
                            future: []
                        };
                    }
                case "UNDO":
                    {
                        if (state.past.length === 0) {
                            return state;
                        }
                        const previous = state.past[state.past.length - 1];
                        const newPast = state.past.slice(0, -1);
                        return {
                            past: newPast,
                            present: previous,
                            future: [
                                state.present,
                                ...state.future
                            ]
                        };
                    }
                case "REDO":
                    {
                        if (state.future.length === 0) {
                            return state;
                        }
                        const next = state.future[0];
                        const newFuture = state.future.slice(1);
                        return {
                            past: [
                                ...state.past,
                                state.present
                            ],
                            present: next,
                            future: newFuture
                        };
                    }
                case "CLEAR":
                    {
                        return {
                            past: [],
                            present: state.present,
                            future: []
                        };
                    }
                default:
                    return state;
            }
        };
    };
    const historyReducer = createHistoryReducer(maxHistory);
    const computedInitialState = typeof initialState === "function" ? initialState() : initialState;
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(historyReducer, {
        past: [],
        present: computedInitialState,
        future: []
    });
    const isUndoRedoActionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const cloneState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHistory.useCallback[cloneState]": (s)=>{
            return structuredClone(s);
        }
    }["useHistory.useCallback[cloneState]"], []);
    const recordSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHistory.useCallback[recordSnapshot]": (previousState)=>{
            if (isUndoRedoActionRef.current) {
                return;
            }
            dispatch({
                type: "RECORD",
                payload: cloneState(previousState)
            });
        }
    }["useHistory.useCallback[recordSnapshot]"], [
        cloneState
    ]);
    const setStateWithHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHistory.useCallback[setStateWithHistory]": (newStateOrUpdater)=>{
            const currentPresent = state.present;
            const newState = typeof newStateOrUpdater === "function" ? newStateOrUpdater(currentPresent) : newStateOrUpdater;
            if (currentPresent === newState) {
                return;
            }
            recordSnapshot(currentPresent);
            dispatch({
                type: "SET",
                payload: newState
            });
        }
    }["useHistory.useCallback[setStateWithHistory]"], [
        state.present,
        recordSnapshot
    ]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHistory.useCallback[undo]": ()=>{
            isUndoRedoActionRef.current = true;
            dispatch({
                type: "UNDO"
            });
            if (onUndoRedo) onUndoRedo();
            requestAnimationFrame({
                "useHistory.useCallback[undo]": ()=>{
                    isUndoRedoActionRef.current = false;
                }
            }["useHistory.useCallback[undo]"]);
        }
    }["useHistory.useCallback[undo]"], [
        onUndoRedo
    ]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHistory.useCallback[redo]": ()=>{
            isUndoRedoActionRef.current = true;
            dispatch({
                type: "REDO"
            });
            if (onUndoRedo) onUndoRedo();
            requestAnimationFrame({
                "useHistory.useCallback[redo]": ()=>{
                    isUndoRedoActionRef.current = false;
                }
            }["useHistory.useCallback[redo]"]);
        }
    }["useHistory.useCallback[redo]"], [
        onUndoRedo
    ]);
    return [
        state.present,
        setStateWithHistory,
        {
            undo,
            redo,
            canUndo: state.past.length > 0,
            canRedo: state.future.length > 0,
            clearHistory: ()=>{
                dispatch({
                    type: "CLEAR"
                });
            }
        }
    ];
};
_s(useHistory, "4mB7pBUyGwYRlYSBjFFzwIM4qcE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BuilderTableHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
/**
 * Header component for UTM Builder table
 */ function BuilderTableHeader({ allSelected, onToggleSelectAll }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        className: "bg-white/5 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        onChange: onToggleSelectAll,
                        checked: allSelected,
                        className: "w-4 h-4 cursor-pointer accent-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTableHeader.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "#"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Base URL"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Source"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Medium"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Campaign"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Term"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Content"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Generated URL"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-center text-gray-200 text-xs font-semibold border-b border-white/10",
                    children: "Actions"
                }, void 0, false, {
                    fileName: "[project]/src/components/BuilderTableHeader.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BuilderTableHeader.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/BuilderTableHeader.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = BuilderTableHeader;
const __TURBOPACK__default__export__ = BuilderTableHeader;
var _c;
__turbopack_context__.k.register(_c, "BuilderTableHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UTMTableInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
/**
 * Input field component for UTM table
 */ function UTMTableInput({ value, field, rowId, rowIndex, placeholder, onChange, onFocus, onKeyDown, isEditing, isCellSelected, onCellClick, onCompositionStart, onCompositionEnd }) {
    _s();
    const divRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Focus div when in cell selection mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UTMTableInput.useEffect": ()=>{
            if (isCellSelected && divRef.current) {
                divRef.current.focus();
            }
        }
    }["UTMTableInput.useEffect"], [
        isCellSelected
    ]);
    // Focus input when in edit mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UTMTableInput.useEffect": ()=>{
            if (isEditing && inputRef.current) {
                inputRef.current.focus();
            }
        }
    }["UTMTableInput.useEffect"], [
        isEditing
    ]);
    // Cell selection mode: render div (no cursor, focusable)
    if (isCellSelected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: divRef,
            onClick: ()=>onCellClick(rowIndex, field),
            onKeyDown: (e)=>onKeyDown(e, rowIndex, field),
            "data-row-index": rowIndex,
            "data-field": field,
            tabIndex: 0,
            className: "w-full bg-transparent text-gray-200 px-2 py-1 text-sm min-h-[28px] cursor-text focus:outline-none",
            children: value || rowIndex === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-500",
                children: placeholder
            }, void 0, false, {
                fileName: "[project]/src/components/UTMTableInput.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/UTMTableInput.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    }
    // Edit mode or default: render input (with cursor)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: inputRef,
        type: "text",
        value: value,
        onChange: (e)=>onChange(rowId, field, e.target.value),
        onFocus: ()=>onFocus(field, rowIndex),
        onKeyDown: (e)=>onKeyDown(e, rowIndex, field),
        onCompositionStart: onCompositionStart,
        onCompositionEnd: onCompositionEnd,
        "data-row-index": rowIndex,
        "data-field": field,
        placeholder: rowIndex === 0 ? placeholder : "",
        className: "w-full glass-input text-gray-200 px-2 py-1 text-sm rounded"
    }, void 0, false, {
        fileName: "[project]/src/components/UTMTableInput.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(UTMTableInput, "swoS727Vc4ewlqIV59U+hvu1Xg0=");
_c = UTMTableInput;
const __TURBOPACK__default__export__ = UTMTableInput;
var _c;
__turbopack_context__.k.register(_c, "UTMTableInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEBOUNCE_DELAY",
    ()=>DEBOUNCE_DELAY,
    "FIELDS",
    ()=>FIELDS,
    "FIELD_CONFIG",
    ()=>FIELD_CONFIG,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS
]);
const STORAGE_KEYS = {
    ROWS: "utmBuilderRows",
    SAVED: "utmBuilderSaved"
};
const DEBOUNCE_DELAY = 500;
const FIELDS = [
    "baseUrl",
    "source",
    "medium",
    "campaign",
    "term",
    "content"
];
const FIELD_CONFIG = [
    {
        key: "baseUrl",
        placeholder: "https://example.com"
    },
    {
        key: "source",
        placeholder: "google"
    },
    {
        key: "medium",
        placeholder: "cpc"
    },
    {
        key: "campaign",
        placeholder: "spring_sale"
    },
    {
        key: "term",
        placeholder: "running shoes"
    },
    {
        key: "content",
        placeholder: "banner_ad"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UTMTableRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/urlBuilder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMTableInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UTMTableInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
/**
 * Component that renders individual rows in the UTM table
 */ function UTMTableRow({ row, index, editingCell, selectedCell, selectedCellRange, selectedRowIndex, selectedRange, onToggleSelect, onChange, onInputFocus, onKeyDown, onCellSelectionKeyDown, onCompositionStart, onCompositionEnd, onCopyUrl, onTestUrl, onRowSelectionKeyDown, onCellClick }) {
    const generatedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildUTMUrl"])(row);
    // Check if within range selection
    const isInRange = selectedRange && index >= Math.min(selectedRange.start, selectedRange.end) && index <= Math.max(selectedRange.start, selectedRange.end);
    // Check if row is selected
    const isRowSelected = selectedRowIndex === index || isInRange;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        "data-row-index": index,
        tabIndex: isRowSelected ? 0 : -1,
        onKeyDown: (e)=>isRowSelected && onRowSelectionKeyDown(e, index),
        className: `transition-all duration-200 ${isRowSelected ? "bg-white/10 ring-2 ring-white/20 backdrop-blur-sm" : "hover:bg-white/5"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 text-center border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: row.selected || false,
                    onChange: ()=>onToggleSelect(row.id),
                    className: "w-4 h-4 cursor-pointer accent-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/UTMTableRow.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UTMTableRow.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 text-center text-gray-200 text-sm border-r border-b border-white/10",
                children: index + 1
            }, void 0, false, {
                fileName: "[project]/src/components/UTMTableRow.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIELD_CONFIG"].map((field)=>{
                // Check single cell selection
                const isCellSelected = selectedCell && selectedCell.rowIndex === index && selectedCell.field === field.key;
                // Check if within cell range selection
                const isInCellRange = selectedCellRange && index >= Math.min(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex) && index <= Math.max(selectedCellRange.start.rowIndex, selectedCellRange.end.rowIndex);
                // Check if field is within range
                const currentFieldIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIELD_CONFIG"].findIndex((f)=>f.key === field.key);
                const startFieldIndex = selectedCellRange ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIELD_CONFIG"].findIndex((f)=>f.key === selectedCellRange.start.field) : -1;
                const endFieldIndex = selectedCellRange ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIELD_CONFIG"].findIndex((f)=>f.key === selectedCellRange.end.field) : -1;
                const isFieldInRange = selectedCellRange && currentFieldIndex >= Math.min(startFieldIndex, endFieldIndex) && currentFieldIndex <= Math.max(startFieldIndex, endFieldIndex);
                const isCellInRange = isInCellRange && isFieldInRange;
                // Check edit mode
                const isEditing = editingCell && editingCell.rowIndex === index && editingCell.field === field.key;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: `px-2 py-1 border-r border-b border-white/10 ${isCellSelected || isCellInRange ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-sm" : ""}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMTableInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: row[field.key],
                        field: field.key,
                        rowId: row.id,
                        rowIndex: index,
                        placeholder: field.placeholder,
                        onChange: onChange,
                        onFocus: onInputFocus,
                        onKeyDown: isEditing ? onKeyDown : isCellSelected || isCellInRange ? (e)=>onCellSelectionKeyDown(e, index, field.key) : onKeyDown,
                        onCompositionStart: onCompositionStart,
                        onCompositionEnd: onCompositionEnd,
                        isEditing: !!isEditing,
                        isCellSelected: !!isCellSelected,
                        onCellClick: onCellClick
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMTableRow.tsx",
                        lineNumber: 154,
                        columnNumber: 13
                    }, this)
                }, field.key, false, {
                    fileName: "[project]/src/components/UTMTableRow.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `px-2 py-1 border-r border-b border-white/10 ${isRowSelected ? "" : "bg-white/2"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `text-sm max-w-sm overflow-x-auto whitespace-nowrap ${generatedUrl ? "text-gray-200" : "text-gray-500 italic"}`,
                    children: generatedUrl || ""
                }, void 0, false, {
                    fileName: "[project]/src/components/UTMTableRow.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UTMTableRow.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onCopyUrl(row),
                            disabled: !generatedUrl,
                            className: "glass-button text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",
                            title: "Copy URL",
                            "aria-label": "Copy URL",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UTMTableRow.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMTableRow.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/UTMTableRow.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onTestUrl(row),
                            disabled: !generatedUrl,
                            className: "glass-button glass-button-green text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",
                            title: "Open in new tab",
                            "aria-label": "Open in new tab",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/UTMTableRow.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMTableRow.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/UTMTableRow.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UTMTableRow.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UTMTableRow.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, row.id, true, {
        fileName: "[project]/src/components/UTMTableRow.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c = UTMTableRow;
const __TURBOPACK__default__export__ = UTMTableRow;
var _c;
__turbopack_context__.k.register(_c, "UTMTableRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
/**
 * Toast notification component
 */ function Toast({ message, type = "success", onClose }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            const timer = setTimeout({
                "Toast.useEffect.timer": ()=>{
                    onClose();
                }
            }["Toast.useEffect.timer"], 2000);
            return ({
                "Toast.useEffect": ()=>clearTimeout(timer)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        onClose
    ]);
    const bgStyle = {
        success: {
            background: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 0.4)"
        },
        error: {
            background: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 0.4)"
        },
        warning: {
            background: "rgba(234, 179, 8, 0.2)",
            borderColor: "rgba(234, 179, 8, 0.4)"
        }
    }[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 right-4 z-50 animate-slide-up",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass-strong text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2",
            style: bgStyle,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-medium",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/Toast.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Toast.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
const __TURBOPACK__default__export__ = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/KeyboardShortcuts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
/**
 * Keyboard shortcuts guide component
 */ function KeyboardShortcuts({ shortcuts }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 glass-subtle rounded-xl p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-4 w-4 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        strokeWidth: 2,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-gray-300",
                        children: "Keyboard Shortcuts"
                    }, void 0, false, {
                        fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: shortcuts.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-xs font-semibold text-gray-400 uppercase tracking-wide",
                                children: group.category
                            }, void 0, false, {
                                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: group.items.map((shortcut, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "glass-button px-2 py-1 rounded text-xs font-mono text-gray-200 min-w-[90px] text-center",
                                                children: shortcut.key
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: shortcut.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                                                lineNumber: 44,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        ]
                    }, groupIndex, true, {
                        fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/KeyboardShortcuts.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/KeyboardShortcuts.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = KeyboardShortcuts;
const __TURBOPACK__default__export__ = KeyboardShortcuts;
var _c;
__turbopack_context__.k.register(_c, "KeyboardShortcuts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BuilderTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/urlBuilder.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rowFactory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useKeyboardNavigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useHistory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuilderTableHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BuilderTableHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UTMTableRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KeyboardShortcuts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KeyboardShortcuts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function BuilderTab({ onSave }) {
    _s();
    const fields = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIELDS"];
    const { toast, showToast, hideToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [historyState, setHistoryState, { undo, redo, canUndo, canRedo }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHistory"])({
        "BuilderTab.useHistory": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].ROWS);
            const initialRows = ({
                "BuilderTab.useHistory.initialRows": ()=>{
                    if (saved) {
                        try {
                            return JSON.parse(saved);
                        } catch  {
                            return [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])(),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])(),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])()
                            ];
                        }
                    }
                    return [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])(),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])()
                    ];
                }
            })["BuilderTab.useHistory.initialRows"]();
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        return {
                            rows: parsed,
                            editingCell: null
                        };
                    }
                    return {
                        rows: initialRows,
                        editingCell: null
                    };
                } catch  {
                    return {
                        rows: initialRows,
                        editingCell: null
                    };
                }
            }
            return {
                rows: initialRows,
                editingCell: null
            };
        }
    }["BuilderTab.useHistory"], {
        maxHistory: 50,
        debounceMs: 500
    });
    const { rows, editingCell } = historyState;
    const setRows = (updaterOrValue, preserveEditingCell = true)=>{
        setHistoryState((prev)=>{
            const prevRows = prev.rows;
            const nextRows = typeof updaterOrValue === "function" ? updaterOrValue(prevRows) : updaterOrValue;
            return {
                ...prev,
                rows: nextRows,
                editingCell: preserveEditingCell ? prev.editingCell : null
            };
        });
    };
    const setEditingCell = (nextEditingCell)=>{
        setHistoryState((prev)=>({
                ...prev,
                editingCell: nextEditingCell
            }));
    };
    const deleteRow = (id)=>{
        if (rows.length === 1) {
            showToast("At least 1 row is required!", "warning");
            return;
        }
        const index = rows.findIndex((row)=>row.id === id);
        if (index === -1) return;
        const rowsAfter = rows.filter((row)=>row.id !== id);
        let targetIndex;
        if (index > 0) {
            targetIndex = index - 1;
        } else {
            targetIndex = 0;
        }
        if (targetIndex >= rowsAfter.length) {
            targetIndex = rowsAfter.length - 1;
        }
        setHistoryState((prev)=>({
                ...prev,
                editingCell: {
                    rowIndex: index,
                    field: fields[0]
                }
            }));
        setHistoryState((prev)=>({
                ...prev,
                rows: rowsAfter,
                editingCell: {
                    rowIndex: targetIndex,
                    field: fields[0]
                }
            }));
    };
    const toggleSelect = (id)=>{
        setRows((prevRows)=>prevRows.map((row)=>row.id === id ? {
                    ...row,
                    selected: !row.selected
                } : row));
    };
    const { selectedCell, selectedCellRange, selectedRowIndex, selectedRange, setSelectedCell, setSelectedCellRange, setSelectedRowIndex, setSelectedRange, handleCellSelectionKeyDown, handleRowSelectionKeyDown, handleInputFocus, handleKeyDown, isComposing, onCompositionStart, onCompositionEnd } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardNavigation"])(rows, setRows, fields, deleteRow, toggleSelect, editingCell, setEditingCell);
    const handleUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderTab.useCallback[handleUndo]": ()=>{
            undo();
            setSelectedCell(null);
            setSelectedCellRange(null);
            setSelectedRowIndex(null);
            setSelectedRange(null);
        }
    }["BuilderTab.useCallback[handleUndo]"], [
        undo,
        setSelectedCell,
        setSelectedCellRange,
        setSelectedRowIndex,
        setSelectedRange
    ]);
    const handleRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderTab.useCallback[handleRedo]": ()=>{
            redo();
            setSelectedCell(null);
            setSelectedCellRange(null);
            setSelectedRowIndex(null);
            setSelectedRange(null);
        }
    }["BuilderTab.useCallback[handleRedo]"], [
        redo,
        setSelectedCell,
        setSelectedCellRange,
        setSelectedRowIndex,
        setSelectedRange
    ]);
    const handleCellClick = (rowIndex, field)=>{
        setEditingCell({
            rowIndex,
            field
        });
    };
    const handleChange = (id, field, value)=>{
        let processedValue = value;
        if (field === "baseUrl" && value && !value.startsWith("http://") && !value.startsWith("https://")) {
            const trimmedValue = value.trim();
            if (trimmedValue && !trimmedValue.startsWith("http://") && !trimmedValue.startsWith("https://")) {
                processedValue = `https://${trimmedValue}`;
            }
        }
        setRows((prevRows)=>prevRows.map((row)=>row.id === id ? {
                    ...row,
                    [field]: processedValue
                } : row));
    };
    const addRow = ()=>{
        const newRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])();
        setHistoryState((prev)=>{
            const nextRows = [
                ...prev.rows,
                newRow
            ];
            return {
                ...prev,
                rows: nextRows,
                editingCell: {
                    rowIndex: nextRows.length - 1,
                    field: fields[0]
                }
            };
        });
    };
    const handleReset = ()=>{
        setRows([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rowFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyRow"])()
        ]);
    };
    const toggleSelectAll = ()=>{
        const allSelected = rows.every((row)=>row.selected);
        setRows((prevRows)=>prevRows.map((row)=>({
                    ...row,
                    selected: !allSelected
                })));
    };
    const saveSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BuilderTab.useCallback[saveSelected]": ()=>{
            const selectedRows = rows.filter({
                "BuilderTab.useCallback[saveSelected].selectedRows": (row)=>row.selected
            }["BuilderTab.useCallback[saveSelected].selectedRows"]);
            if (selectedRows.length === 0) {
                showToast("Please select items to save!", "warning");
                return;
            }
            const savedItems = selectedRows.map({
                "BuilderTab.useCallback[saveSelected].savedItems": (row)=>{
                    const fullUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildUTMUrl"])(row);
                    if (!fullUrl) return null;
                    return {
                        id: Date.now() + Math.random(),
                        campaignName: `${row.source}-${row.medium}-${row.campaign}`,
                        savedAt: Date.now(),
                        comment: "",
                        params: {
                            source: row.source,
                            medium: row.medium,
                            campaign: row.campaign,
                            term: row.term,
                            content: row.content
                        },
                        fullUrl: fullUrl
                    };
                }
            }["BuilderTab.useCallback[saveSelected].savedItems"]).filter({
                "BuilderTab.useCallback[saveSelected].savedItems": (item)=>item !== null
            }["BuilderTab.useCallback[saveSelected].savedItems"]);
            if (savedItems.length === 0) {
                showToast("Items without URLs cannot be saved!", "warning");
                return;
            }
            onSave(savedItems);
            if (savedItems.length < selectedRows.length) {
                const skippedCount = selectedRows.length - savedItems.length;
                showToast(`${savedItems.length} item(s) saved. (${skippedCount} item(s) excluded due to missing URL)`, "success");
            } else {
                showToast(`${savedItems.length} item(s) saved!`, "success");
            }
        }
    }["BuilderTab.useCallback[saveSelected]"], [
        rows,
        onSave,
        showToast
    ]);
    const copyUrl = (row)=>{
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildUTMUrl"])(row);
        if (url) {
            navigator.clipboard.writeText(url);
            showToast("URL copied to clipboard!", "success");
        }
    };
    const openUrlInNewTab = (row)=>{
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$urlBuilder$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildUTMUrl"])(row);
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
            showToast("Opened in new tab!", "success");
        }
    };
    const deleteSelectedRows = ()=>{
        const selectedRows = rows.filter((row)=>row.selected);
        if (selectedRows.length === 0) {
            showToast("Please select rows to delete!", "warning");
            return;
        }
        if (rows.length === selectedRows.length) {
            showToast("At least 1 row is required!", "warning");
            return;
        }
        const remainingRows = rows.filter((row)=>!row.selected);
        setRows(remainingRows);
        showToast(`${selectedRows.length} row(s) deleted!`, "success");
    };
    // Auto-save to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderTab.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const timer = setTimeout({
                "BuilderTab.useEffect.timer": ()=>{
                    localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].ROWS, JSON.stringify(rows));
                }
            }["BuilderTab.useEffect.timer"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_DELAY"]);
            return ({
                "BuilderTab.useEffect": ()=>clearTimeout(timer)
            })["BuilderTab.useEffect"];
        }
    }["BuilderTab.useEffect"], [
        rows
    ]);
    // Focus management after undo/redo
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderTab.useEffect": ()=>{
            if (!editingCell) return;
            const { rowIndex, field } = editingCell;
            if (rowIndex == null || !field) return;
            requestAnimationFrame({
                "BuilderTab.useEffect": ()=>{
                    const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
                    const input = document.querySelector(selector);
                    if (input) {
                        input.focus();
                        const length = input.value?.length ?? 0;
                        input.setSelectionRange(length, length);
                    }
                }
            }["BuilderTab.useEffect"]);
        }
    }["BuilderTab.useEffect"], [
        editingCell
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderTab.useEffect": ()=>{
            const handleKeyDownGlobal = {
                "BuilderTab.useEffect.handleKeyDownGlobal": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (canUndo) {
                            handleUndo();
                        }
                        return;
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (canRedo) {
                            handleRedo();
                        }
                        return;
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
                        e.preventDefault();
                        e.stopPropagation();
                        saveSelected();
                    }
                }
            }["BuilderTab.useEffect.handleKeyDownGlobal"];
            window.addEventListener("keydown", handleKeyDownGlobal, true);
            return ({
                "BuilderTab.useEffect": ()=>window.removeEventListener("keydown", handleKeyDownGlobal, true)
            })["BuilderTab.useEffect"];
        }
    }["BuilderTab.useEffect"], [
        canUndo,
        canRedo,
        handleUndo,
        handleRedo,
        saveSelected
    ]);
    const hasSelectedRows = rows.some((row)=>row.selected);
    const allSelected = rows.length > 0 && rows.every((row)=>row.selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-full mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex gap-3 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleReset,
                        className: "glass-button text-gray-300 hover:text-white px-4 py-2 rounded-xl font-medium shadow-lg",
                        title: "Delete all data",
                        children: "Reset All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleSelectAll,
                        className: "glass-button glass-button-purple text-white px-4 py-2 rounded-xl font-medium shadow-lg",
                        children: allSelected ? "Deselect All" : "Select All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-px bg-white/10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: saveSelected,
                        disabled: !hasSelectedRows,
                        className: `glass-button text-white px-4 py-2 rounded-xl font-medium shadow-lg ${!hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""}`,
                        title: "Save selected items (⌘S)",
                        children: "Save Selected"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: deleteSelectedRows,
                        disabled: !hasSelectedRows,
                        className: `glass-button glass-button-red text-white px-4 py-2 rounded-xl font-medium shadow-lg ${!hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""}`,
                        title: "Delete selected rows (Delete)",
                        children: "Delete Selected"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BuilderTab.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-2xl glass-strong shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuilderTableHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                allSelected: rows.length > 0 && rows.every((row)=>row.selected),
                                onToggleSelectAll: toggleSelectAll
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuilderTab.tsx",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: rows.map((row, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        row: row,
                                        index: index,
                                        editingCell: editingCell,
                                        selectedCell: selectedCell,
                                        selectedCellRange: selectedCellRange,
                                        selectedRowIndex: selectedRowIndex,
                                        selectedRange: selectedRange,
                                        onToggleSelect: toggleSelect,
                                        onChange: handleChange,
                                        onInputFocus: handleInputFocus,
                                        onKeyDown: handleKeyDown,
                                        onCellSelectionKeyDown: handleCellSelectionKeyDown,
                                        onCompositionStart: onCompositionStart,
                                        onCompositionEnd: onCompositionEnd,
                                        onCopyUrl: copyUrl,
                                        onTestUrl: openUrlInNewTab,
                                        onRowSelectionKeyDown: handleRowSelectionKeyDown,
                                        onCellClick: handleCellClick
                                    }, row.id, false, {
                                        fileName: "[project]/src/components/BuilderTab.tsx",
                                        lineNumber: 451,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuilderTab.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: addRow,
                        className: "w-full py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-b-2xl flex items-center justify-center border-t border-white/10",
                        "aria-label": "Add row",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 4v16m8-8H4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BuilderTab.tsx",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BuilderTab.tsx",
                            lineNumber: 482,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/BuilderTab.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BuilderTab.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KeyboardShortcuts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                shortcuts: [
                    {
                        category: "Edit",
                        items: [
                            {
                                key: "⌘/Ctrl + Z",
                                description: "Undo"
                            },
                            {
                                key: "⌘/Ctrl + Shift + Z",
                                description: "Redo"
                            },
                            {
                                key: "⌘/Ctrl + C",
                                description: "Copy row"
                            },
                            {
                                key: "⌘/Ctrl + V",
                                description: "Paste row"
                            }
                        ]
                    },
                    {
                        category: "Navigation",
                        items: [
                            {
                                key: "← → ↑ ↓",
                                description: "Move cells"
                            },
                            {
                                key: "Enter",
                                description: "Move to row below"
                            },
                            {
                                key: "ESC",
                                description: "Switch mode"
                            }
                        ]
                    },
                    {
                        category: "Selection & Actions",
                        items: [
                            {
                                key: "Shift + Arrow keys",
                                description: "Range selection"
                            },
                            {
                                key: "Space",
                                description: "Toggle checkbox"
                            },
                            {
                                key: "Delete",
                                description: "Delete selected rows"
                            },
                            {
                                key: "⌘/Ctrl + S",
                                description: "Save selected items"
                            }
                        ]
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/BuilderTab.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toast.message,
                type: toast.type,
                onClose: hideToast
            }, void 0, false, {
                fileName: "[project]/src/components/BuilderTab.tsx",
                lineNumber: 533,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BuilderTab.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
_s(BuilderTab, "uvrb6BFnPHdJXIwLXKyj5IxF998=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHistory"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardNavigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardNavigation"]
    ];
});
_c = BuilderTab;
const __TURBOPACK__default__export__ = BuilderTab;
var _c;
__turbopack_context__.k.register(_c, "BuilderTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SavedTableHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
/**
 * Header component for Saved Tab table
 */ function SavedTableHeader({ allSelected, onToggleSelectAll }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        className: "bg-white/5 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        onChange: onToggleSelectAll,
                        checked: allSelected,
                        className: "w-4 h-4 cursor-pointer accent-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTableHeader.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-center text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "#"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Source"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Medium"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Campaign"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Term"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Content"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-r border-b border-white/10",
                    children: "Generated URL"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: "px-3 py-3 text-left text-gray-200 text-xs font-semibold border-b border-white/10",
                    children: "Comment"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableHeader.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SavedTableHeader.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SavedTableHeader.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = SavedTableHeader;
const __TURBOPACK__default__export__ = SavedTableHeader;
var _c;
__turbopack_context__.k.register(_c, "SavedTableHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SavedTableRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
/**
 * Component that renders individual rows in the Saved Tab table
 */ function SavedTableRow({ item, index, isSelected, onToggleSelect, editingCommentId, editComment, onStartEditComment, onSaveComment, onCancelEditComment, onUpdateEditComment }) {
    const isEditing = editingCommentId === item.id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: `transition-all duration-200 ${isSelected ? "bg-white/10 ring-2 ring-white/20 backdrop-blur-sm" : "hover:bg-white/5"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 text-center border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isSelected || false,
                    onChange: ()=>onToggleSelect(item.id),
                    className: "w-4 h-4 cursor-pointer accent-gray-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 text-center text-gray-200 text-sm border-r border-b border-white/10",
                children: index + 1
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-white",
                    children: item.params.source || "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-white",
                    children: item.params.medium || "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-white",
                    children: item.params.campaign || "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-300",
                    children: item.params.term || "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-r border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-300",
                    children: item.params.content || "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: `px-2 py-1 border-r border-b border-white/10 ${isSelected ? "" : "bg-white/2"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm max-w-sm overflow-x-auto whitespace-nowrap text-gray-200",
                    children: item.fullUrl || ""
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 border-b border-white/10",
                children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: editComment,
                            onChange: (e)=>onUpdateEditComment(e.target.value),
                            placeholder: "Enter comment",
                            className: "flex-1 glass-input text-gray-200 px-2 py-1 rounded-lg text-sm",
                            autoFocus: true,
                            onKeyDown: (e)=>{
                                if (e.key === "Enter") {
                                    onSaveComment(item.id);
                                } else if (e.key === "Escape") {
                                    onCancelEditComment();
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/SavedTableRow.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSaveComment(item.id),
                            className: "glass-button glass-button-green text-white px-2 py-1 rounded-lg text-xs",
                            title: "Save (Enter)",
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SavedTableRow.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancelEditComment,
                            className: "glass-button text-white px-2 py-1 rounded-lg text-xs",
                            title: "Cancel (Esc)",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SavedTableRow.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>onStartEditComment(item),
                    className: "glass-subtle text-gray-200 px-2 py-1 rounded-lg cursor-pointer hover:border-white/30 transition duration-200 text-sm min-h-[28px] flex items-center",
                    children: item.comment || "Click to add comment"
                }, void 0, false, {
                    fileName: "[project]/src/components/SavedTableRow.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTableRow.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SavedTableRow.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = SavedTableRow;
const __TURBOPACK__default__export__ = SavedTableRow;
var _c;
__turbopack_context__.k.register(_c, "SavedTableRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SavedTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTableHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SavedTableHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SavedTableRow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SavedTab({ savedItems, onDelete, onDeleteAll, onDeleteSelected, onUpdateComment }) {
    _s();
    const [editingCommentId, setEditingCommentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editComment, setEditComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [itemsWithSelection, setItemsWithSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SavedTab.useState": ()=>savedItems.map({
                "SavedTab.useState": (item)=>({
                        ...item,
                        selected: false
                    })
            }["SavedTab.useState"])
    }["SavedTab.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavedTab.useEffect": ()=>{
            setItemsWithSelection({
                "SavedTab.useEffect": (prev)=>{
                    const prevMap = new Map(prev.map({
                        "SavedTab.useEffect": (item)=>[
                                item.id,
                                item.selected
                            ]
                    }["SavedTab.useEffect"]));
                    return savedItems.map({
                        "SavedTab.useEffect": (item)=>({
                                ...item,
                                selected: prevMap.get(item.id) || false
                            })
                    }["SavedTab.useEffect"]);
                }
            }["SavedTab.useEffect"]);
        }
    }["SavedTab.useEffect"], [
        savedItems
    ]);
    const { toast, showToast, hideToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const startEditComment = (item)=>{
        setEditingCommentId(item.id);
        setEditComment(item.comment || "");
    };
    const saveComment = (id)=>{
        onUpdateComment(id, editComment);
        setEditingCommentId(null);
        setEditComment("");
    };
    const cancelEditComment = ()=>{
        setEditingCommentId(null);
        setEditComment("");
    };
    const updateEditComment = (value)=>{
        setEditComment(value);
    };
    const toggleSelect = (id)=>{
        setItemsWithSelection((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    selected: !item.selected
                } : item));
    };
    const toggleSelectAll = ()=>{
        const allSelected = itemsWithSelection.every((item)=>item.selected);
        setItemsWithSelection((prev)=>prev.map((item)=>({
                    ...item,
                    selected: !allSelected
                })));
    };
    const handleDeleteSelected = ()=>{
        const selectedItems = itemsWithSelection.filter((item)=>item.selected);
        if (selectedItems.length === 0) {
            showToast("Please select items to delete!", "warning");
            return;
        }
        onDeleteSelected(selectedItems.map((item)=>item.id));
    };
    const allSelected = itemsWithSelection.length > 0 && itemsWithSelection.every((item)=>item.selected);
    const hasSelectedRows = itemsWithSelection.some((item)=>item.selected);
    if (savedItems.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-full mx-auto p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-strong rounded-2xl p-12 text-center shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-200 text-lg",
                        children: "No saved URLs."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-sm mt-2",
                        children: "Select and save URLs from the Builder tab."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SavedTab.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/SavedTab.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-full mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex gap-3 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleSelectAll,
                        className: "glass-button glass-button-purple text-white px-4 py-2 rounded-xl font-medium shadow-lg",
                        children: allSelected ? "Deselect All" : "Select All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-px bg-white/10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDeleteSelected,
                        disabled: !hasSelectedRows,
                        className: `glass-button glass-button-red text-white px-4 py-2 rounded-xl font-medium shadow-lg ${!hasSelectedRows ? "opacity-50 cursor-not-allowed" : ""}`,
                        title: "Delete selected items",
                        children: "Delete Selected"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SavedTab.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SavedTab.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-2xl glass-strong shadow-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTableHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            allSelected: allSelected,
                            onToggleSelectAll: toggleSelectAll
                        }, void 0, false, {
                            fileName: "[project]/src/components/SavedTab.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: itemsWithSelection.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTableRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    item: item,
                                    index: index,
                                    isSelected: item.selected,
                                    onToggleSelect: toggleSelect,
                                    editingCommentId: editingCommentId,
                                    editComment: editComment,
                                    onStartEditComment: startEditComment,
                                    onSaveComment: saveComment,
                                    onCancelEditComment: cancelEditComment,
                                    onUpdateEditComment: updateEditComment
                                }, item.id, false, {
                                    fileName: "[project]/src/components/SavedTab.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/SavedTab.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SavedTab.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTab.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toast.message,
                type: toast.type,
                onClose: hideToast
            }, void 0, false, {
                fileName: "[project]/src/components/SavedTab.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SavedTab.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(SavedTab, "pD9y8yYo71OAAVg/3hRHCXdHH6U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = SavedTab;
const __TURBOPACK__default__export__ = SavedTab;
var _c;
__turbopack_context__.k.register(_c, "SavedTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UTMGuide.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
/**
 * UTM Guide component - Server Component (no 'use client')
 * Educational content about UTM parameters
 */ function UTMGuide() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto p-6 mt-12 relative z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10 mb-12"
            }, void 0, false, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-white mb-3 drop-shadow-lg",
                        children: "What are UTM Parameters?"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-200 text-lg max-w-3xl mx-auto",
                        children: "UTM parameters are tags added to URLs to track the traffic source of marketing campaigns. You can analyze which channels are most effective in Google Analytics."
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 gap-6 mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-2xl p-6 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold",
                                        children: "Required"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: "utm_source"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-200 mb-4",
                                children: "Identifies where traffic comes from. (advertising platform, search engine, newsletter, etc.)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-subtle p-4 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-2",
                                        children: "Examples:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 38,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-green-300 text-sm",
                                        children: [
                                            "utm_source=google",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 41,
                                                columnNumber: 15
                                            }, this),
                                            "utm_source=facebook",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 43,
                                                columnNumber: 15
                                            }, this),
                                            "utm_source=newsletter"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-2xl p-6 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold",
                                        children: "Required"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: "utm_medium"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-200 mb-4",
                                children: "Indicates the type of marketing medium. (paid advertising, email, social media, etc.)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-subtle p-4 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-2",
                                        children: "Examples:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-green-300 text-sm",
                                        children: [
                                            "utm_medium=cpc (cost per click)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            "utm_medium=email",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 67,
                                                columnNumber: 15
                                            }, this),
                                            "utm_medium=social"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-2xl p-6 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold",
                                        children: "Required"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: "utm_campaign"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-200 mb-4",
                                children: "Identifies a specific campaign. (promotion name, strategic campaign, etc.)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-subtle p-4 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-2",
                                        children: "Examples:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-green-300 text-sm",
                                        children: [
                                            "utm_campaign=spring_sale",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 89,
                                                columnNumber: 15
                                            }, this),
                                            "utm_campaign=black_friday",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            "utm_campaign=product_launch"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-2xl p-6 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold",
                                        children: "Optional"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: "utm_term"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-200 mb-4",
                                children: "Tracks keywords for paid search advertising. (Google Ads, etc.)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-subtle p-4 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-2",
                                        children: "Examples:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-green-300 text-sm",
                                        children: [
                                            "utm_term=running+shoes",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this),
                                            "utm_term=best+laptop",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this),
                                            "utm_term=marketing+tools"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-2xl p-6 shadow-xl md:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold",
                                        children: "Optional"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white",
                                        children: "utm_content"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-200 mb-4",
                                children: "Distinguishes multiple links within the same ad. (A/B testing, banner placement, etc.)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-subtle p-4 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-300 mb-2",
                                        children: "Examples:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-green-300 text-sm",
                                        children: [
                                            "utm_content=banner_ad (banner ad)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this),
                                            "utm_content=text_link (text link)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this),
                                            "utm_content=header_cta (header CTA button)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-strong rounded-2xl p-8 mb-12 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-white mb-4",
                        children: "Real-world Usage Example"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-200 mb-4",
                        children: "If you're running a spring sale campaign on Facebook ads:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-subtle p-4 rounded-xl overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "text-gray-200 text-sm break-all",
                            children: "https://example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_sale&utm_content=banner_ad"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UTMGuide.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-300 mt-4 text-sm",
                        children: '→ In Google Analytics, you can track the number of visitors who clicked on the "spring sale campaign banner from Facebook paid ads".'
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-strong rounded-2xl p-8 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl font-bold text-white mb-4",
                        children: "UTM Parameter Naming Rules (Best Practices)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-3 text-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-300 mt-1",
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: "Use lowercase:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 173,
                                                columnNumber: 15
                                            }, this),
                                            " Use",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "glass-subtle px-2 py-1 rounded-lg text-green-300",
                                                children: "utm_source=google"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            "instead of utm_source=Google"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-300 mt-1",
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: "Maintain consistency:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 183,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            "Always use the same naming convention (e.g., facebook vs fb)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-300 mt-1",
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: "Use underscores:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, this),
                                            " Use",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "glass-subtle px-2 py-1 rounded-lg text-green-300",
                                                children: "spring_sale"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            "instead of spaces (automatically encoded)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-300 mt-1",
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: "Keep it concise:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            " Use meaningful abbreviations rather than long names"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-300 mt-1",
                                        children: "✗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-white",
                                                children: "No personal information:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UTMGuide.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            "Do not include sensitive information like emails or phone numbers"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UTMGuide.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UTMGuide.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UTMGuide.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-300",
                    children: [
                        "You can view your UTM URLs in",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "text-white",
                            children: "Google Analytics > Acquisition > Campaigns"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UTMGuide.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UTMGuide.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UTMGuide.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UTMGuide.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = UTMGuide;
const __TURBOPACK__default__export__ = UTMGuide;
var _c;
__turbopack_context__.k.register(_c, "UTMGuide");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLocalStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalStorage",
    ()=>useLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useLocalStorage = (key, initialValue)=>{
    _s();
    // Get initial value from localStorage
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLocalStorage.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.error(`Error loading ${key} from localStorage:`, error);
                return initialValue;
            }
        }
    }["useLocalStorage.useState"]);
    // Save to localStorage when value changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLocalStorage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(`Error saving ${key} to localStorage:`, error);
            }
        }
    }["useLocalStorage.useEffect"], [
        key,
        storedValue
    ]);
    return [
        storedValue,
        setStoredValue
    ];
};
_s(useLocalStorage, "l1XcwNNlXBp748+iQLS7Yhu1cxE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/utm-builder/UTMBuilderClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UTMBuilderClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuilderTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BuilderTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SavedTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UTMGuide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLocalStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function UTMBuilderClient() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("builder");
    const [savedItems, setSavedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])("utmSavedItems", []);
    // Add saved items
    const handleSave = (newItems)=>{
        setSavedItems([
            ...savedItems,
            ...newItems
        ]);
    };
    // Delete individual item
    const handleDelete = (id)=>{
        if (confirm("Are you sure you want to delete this item?")) {
            setSavedItems(savedItems.filter((item)=>item.id !== id));
        }
    };
    // Delete all
    const handleDeleteAll = ()=>{
        if (confirm("Are you sure you want to delete all saved URLs?")) {
            setSavedItems([]);
        }
    };
    // Delete selected items in bulk
    const handleDeleteSelected = (ids)=>{
        if (confirm(`Are you sure you want to delete ${ids.length} selected item(s)?`)) {
            setSavedItems(savedItems.filter((item)=>!ids.includes(item.id)));
        }
    };
    // Update comment
    const handleUpdateComment = (id, comment)=>{
        setSavedItems(savedItems.map((item)=>item.id === id ? {
                ...item,
                comment
            } : item));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto py-8 relative z-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "inline-flex items-center text-gray-300 hover:text-white transition-colors mb-4 glass px-4 py-2 rounded-xl shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                "Home"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold text-white mb-2 drop-shadow-lg",
                                    children: "UTM Builder"
                                }, void 0, false, {
                                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: "UTM builder for everyone"
                                }, void 0, false, {
                                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex rounded-2xl glass-strong p-1.5 shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("builder"),
                                className: `px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeTab === "builder" ? "bg-white/20 text-white shadow-lg backdrop-blur-sm" : "text-gray-300 hover:text-white hover:bg-white/5"}`,
                                children: "Builder"
                            }, void 0, false, {
                                fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("saved"),
                                className: `px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeTab === "saved" ? "bg-white/20 text-white shadow-lg backdrop-blur-sm" : "text-gray-300 hover:text-white hover:bg-white/5"}`,
                                children: [
                                    "Saved (",
                                    savedItems.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                activeTab === "builder" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BuilderTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onSave: handleSave
                }, void 0, false, {
                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SavedTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    savedItems: savedItems,
                    onDelete: handleDelete,
                    onDeleteAll: handleDeleteAll,
                    onDeleteSelected: handleDeleteSelected,
                    onUpdateComment: handleUpdateComment
                }, void 0, false, {
                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UTMGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/utm-builder/UTMBuilderClient.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(UTMBuilderClient, "rG3e3097EAoEquSi4gxtCooCIpM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"]
    ];
});
_c = UTMBuilderClient;
var _c;
__turbopack_context__.k.register(_c, "UTMBuilderClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_86b87cc5._.js.map