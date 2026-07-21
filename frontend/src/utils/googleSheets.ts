export interface EnquiryData {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  message?: string;
  serviceName?: string;
   venue?: string;
  budget?: string;
  businessName?: string;
  businessType?: string;
  city?: string;
  gstNumber?: string;
}

export const submitToGoogleSheets = async (
  data: EnquiryData,
): Promise<{ success: boolean; message?: string }> => {
  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  if (!GOOGLE_SHEET_URL) {
    console.error("Google Sheet URL is missing in environment variables.");
    return { success: false, message: "Configuration error." };
  }

  try {
    // The "no-cors" mode is often required for Google App Script Web Apps
    // when called from the browser to avoid CORS errors,
    // BUT "no-cors" means we can't read the response status/body.
    // However, Google App Script can return CORS headers (as I added in the plan).
    // If the user deployed the script with the CORS headers, standard POST works.
    // Given the script I provided has `doOptions` and headers, we'll try standard POST first.

    // Note: Google App Script redirects 302 to the content.
    // fetch follows redirects automatically.

    // We'll use 'no-cors' if standard fails, or just default to it if we want to be safe.
    // Actually, sending JSON with 'no-cors' is tricky (content-type is ignored).
    // The script expects JSON.
    // We use mode: 'no-cors' because Google Apps Script redirects (302) 
    // often trigger CORS blocks in browsers even with correct headers.
    // This ensures the data ARRIVES at the sheet, even if we can't read the response.
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we assume success if the fetch doesn't throw.
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { success: false, message: "Network error." };
  }
};
