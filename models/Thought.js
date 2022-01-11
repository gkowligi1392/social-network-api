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
        createAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => shortDateFormat(createdAtVal),
        },
            username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    }
);

// Thought Schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => shortDateFormat(createdAtVal),
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

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;