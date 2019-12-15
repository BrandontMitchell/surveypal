const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// contains functionality inhereted from Mail object via sendgrid npm module
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
      super();

      this.from_email = new helper.Email('no-reply@emaily.com');
      this.subject = subject;
      this.body = new helper.Content('text/html', content);
      this.recipients = this.formatAddresses(recipients);

      // builting function to helper.Mail for adding content to mail
      this.addContent(this.body);
      this.addClickTracking();
      this.addRecipients();
  }

  formatAddresses(recipients) {
      return recipients.map(({ email }) => {
        // destructuring w/ arrow function
        return new helper.Email(email);
      });
  }

  addClickTracking() {
      const trackingSettings = new helper.TrackingSettings();
      const clickTracking = new helper.ClickTracking(true, true);

      trackingSettings.setClickTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
      const personalize = new helper.Personalization();
      this.recipients.forEach( recipient => {
        personalize.addTo(recipient);
      });
      this.addPersonalization(personalize);
  }
}

module.exports = Mailer;
