import type { UTMRow } from "@/types";

/**
 * Generates a complete URL with UTM parameters
 */
export const buildUTMUrl = ({
  baseUrl,
  source,
  medium,
  campaign,
  term,
  content,
}: Pick<
  UTMRow,
  "baseUrl" | "source" | "medium" | "campaign" | "term" | "content"
>): string => {
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
  } catch {
    // Return empty string if URL is invalid
    return "";
  }
};
