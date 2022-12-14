const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
    type: String,
    unique: true,
    required: "Please enter a username",
    trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match validation not sure if this works
        //match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
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
    }, {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
});

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;