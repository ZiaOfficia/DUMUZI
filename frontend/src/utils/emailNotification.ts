export const sendEmailNotification = async (data: Record<string, any>) => {
  try {
    await fetch("https://formsubmit.co/ajax/sales@littlefun.in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        _subject: "New Enquiry from DUMUZI Website", // Email Subject
        _template: "table", // Clean table format
      }),
    });
  } catch (error) {
    console.error(
      "Email notification failed, but Google Sheet succeeded.",
      error,
    );
  }
};
