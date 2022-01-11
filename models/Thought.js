const { Schema, model, Types } = require("mongoose");
const { shortDateFormat } = require("../utils/dateFormat");

//reaction Schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    id: false,
    _id: false,
  }
);

ReactionSchema.virtual("createdDate").get(() => shortDateFormat(this.createAt));

// Thought Schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

//virtuals
ThoughtSchema.virtual("createdDate").get(() => shortDateFormat(this.createAt));

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;