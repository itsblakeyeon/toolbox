/**
 * Validates a URL
 * @param {string} url - URL to validate
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateUrl = (url) => {
  // Skip validation for empty strings
  if (!url || url.trim() === "") {
    return { valid: true, message: "" };
  }

  const trimmedUrl = url.trim();

  // Error if URL contains spaces
  if (url !== trimmedUrl || trimmedUrl.includes(" ")) {
    return { valid: false, message: "URL contains spaces" };
  }

  // Automatically add https:// if protocol is missing
  let fullUrl = trimmedUrl;
  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    fullUrl = `https://${trimmedUrl}`;
  }

  try {
    const urlObj = new URL(fullUrl);

    // Validate protocol (only http or https allowed)
    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return {
        valid: false,
        message: "Only http:// or https:// protocols are allowed",
      };
    }

    // Validate hostname (domain cannot be empty)
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return { valid: false, message: "Please enter a valid domain" };
    }

    // Hostname must contain at least one dot (domain format)
    if (!urlObj.hostname.includes(".")) {
      return {
        valid: false,
        message: "Invalid domain format (e.g., example.com)",
      };
    }

    // Error if hostname is too short (minimum 3 characters: a.b)
    if (urlObj.hostname.length < 3) {
      return { valid: false, message: "Domain is too short" };
    }

    // Validate special characters (some special characters must be URL encoded)
    const invalidChars = /[<>"`]/;
    if (invalidChars.test(trimmedUrl)) {
      return {
        valid: false,
        message: "URL contains invalid characters",
      };
    }

    return { valid: true, message: "" };
  } catch (error) {
    // More specific error message
    if (error.message.includes("Invalid URL")) {
      return { valid: false, message: "Invalid URL format" };
    }
    return { valid: false, message: "URL format is incorrect" };
  }
};

/**
 * Checks if all required fields are filled
 * @param {Object} row - Row data
 * @returns {boolean}
 */
export const hasRequiredFields = (row) => {
  return !!(row.baseUrl && row.source && row.medium && row.campaign);
};
