const { Schema, model } = require("mongoose");
const { shortDateFormat } = require("../utils/dateFormat");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
            email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,
        timestamps: true,
    }
);
UserSchema.virtual("createdDate").get(() => shortDateFormat(this.createAt));
UserSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;