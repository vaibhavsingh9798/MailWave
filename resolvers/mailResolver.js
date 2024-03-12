const Mail = require('../models/mail');

const mailResolver = {
  Query: {
    getAllMails: async () => await Mail.find(),
  },
  Mutation: {
    createMail: async (_, { input }) => {
      const { sender, recipient, subject, body } = input;
      const newMail = new Mail({ sender, recipient, subject, body });
      await newMail.save();
      return newMail;
    },
  },
};

module.exports = mailResolver;
