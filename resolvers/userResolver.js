const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userResolver = {
  Query: {
    currentUser: (_, __, { currentUser }) => currentUser,
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      return { token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
  },
};

module.exports = userResolver;
