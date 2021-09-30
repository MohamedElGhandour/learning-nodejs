const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "first1web@gmail.com", // Change to your verified sender
    subject: "Thanks for joining in!",
    html: `<strong>Welocme to the app, ${name}. Let me know how you get along with the app.</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

const sendCancelEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "first1web@gmail.com", // Change to your verified sender
    subject: "We Will Miss You!",
    html: `<strong>Hi ${name}. Let me know why you cancel your account?.</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
