const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {};

      if (args.genre) {
        filters["genres"] = { $in: [args.genre] };
      }

      return Book.find(filters).populate("author");
    },
    findBook: async (root, args) => Book.findOne({ name: args.name }),
    allGenres: async (root, args) => {
      const books = await Book.find({});
      let genreList = new Set(["all"]);
      books.forEach(({ genres }) => genres.forEach(genreList.add, genreList));
      return genreList;
    },

    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root) => Author.find({}).populate("books"),
    findAuthor: async (root, args) =>
      Author.findOne({ name: args.name }).populate("books"),

    me: (root, args, { currentUser }) => currentUser,
  },

  Author: {
    bookCount: async (root) => root.books.length,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if (args.author.length < 4) {
        throw new UserInputError("author name is too short", {
          invalidArgs: args.author,
        });
      }

      const book = new Book({ ...args });
      let author;

      try {
        author = await Author.findOneAndUpdate(
          { name: args.author },
          {
            $setOnInsert: { name: args.author },
          },
          { new: true, upsert: true }
        ).populate("books");
        book.author = author._id.toString();
        await book.save();

        author.books = author.books.concat(book._id.toString());
        author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      book.author = author;
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let editedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBornTo } },
        { new: true }
      ).populate("books");

      return editedAuthor._doc;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
