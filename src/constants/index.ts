import type { UTMField, FieldConfig } from "@/types";

// localStorage keys
export const STORAGE_KEYS = {
  ROWS: "utmBuilderRows",
  SAVED: "utmBuilderSaved",
} as const;

// Debounce delay (milliseconds)
export const DEBOUNCE_DELAY = 500;

// List of editable fields
export const FIELDS: UTMField[] = [
  "baseUrl",
  "source",
  "medium",
  "campaign",
  "term",
  "content",
];

// Field configuration (includes placeholders)
export const FIELD_CONFIG: FieldConfig[] = [
  { key: "baseUrl", placeholder: "nike.com" },
  { key: "source", placeholder: "google" },
  { key: "medium", placeholder: "cpc" },
  { key: "campaign", placeholder: "airmax" },
  { key: "term", placeholder: "shoes" },
  { key: "content", placeholder: "banner" },
];
