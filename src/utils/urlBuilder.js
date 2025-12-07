/**
 * Generates a complete URL with UTM parameters
 * @param {Object} params - UTM parameter object
 * @param {string} params.baseUrl - Base URL (required)
 * @param {string} params.source - utm_source (optional)
 * @param {string} params.medium - utm_medium (optional)
 * @param {string} params.campaign - utm_campaign (optional)
 * @param {string} params.term - utm_term (optional)
 * @param {string} params.content - utm_content (optional)
 * @returns {string} Generated UTM URL
 */
export const buildUTMUrl = ({
  baseUrl,
  source,
  medium,
  campaign,
  term,
  content,
}) => {
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
  } catch (error) {
    // Return empty string if URL is invalid
    return "";
  }
};
