const User = require('../models/user');

const userResolver = {
  Query: {
    getAllUsers: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, email } = input;
      const newUser = new User({ username, email });
      await newUser.save();
      return newUser;
    },
  },
};

module.exports = userResolver;
