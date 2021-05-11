const { User, Thought } = require('../models');

const resolvers = {
    Query: {
      thoughts: async () => {
        const params = username ? {username} : {};
        return Thought.find().sort({ createdAt: -1 });
      },
      // place this inside of the `Query` nested object right after `thoughts` 
      thought: async (parent, { _id }) => {
        return Thought.findOne({ _id });
      },
      // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
          
            return user;
        },
      login: async () => {
  
      }
    }
  };

  module.exports = resolvers;