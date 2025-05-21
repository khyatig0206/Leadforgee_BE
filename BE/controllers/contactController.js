const Contact = require('../models/Contact');
const sendEmail = require("../configs/email")

exports.sendMessage = async (req, res) => {
   try {
    const { name, email, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Save contact message to DB
    const contact = await Contact.create({
      name,
      email,
      company,
      subject,
      message
    });

    // Respond fast before sending email
    res.status(201).json({ message: "Message saved successfully.", data: contact });

    // Prepare and send email notification in the background
    const emailSubject = `New Contact Message: ${subject}`;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    // Async email send (no await)
    sendEmail("info@leadforgee.com", emailSubject, emailHtml)
      .catch(err => console.error("Error sending notification email:", err));

  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};



exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts." });
  }
};


 exports.markViewed = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.viewed = true;
    await contact.save();

    return res.json({ message: 'Contact marked as viewed' });
  } catch (error) {
    console.error('Error marking contact as viewed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};