export const sendEmailNotification = async (data: Record<string, any>) => {
  try {
    await fetch("https://formsubmit.co/ajax/ss4526312@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        _subject: "New Enquiry from DUMUZI Luxury Chocolates Website", // Email Subject
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
