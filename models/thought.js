const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    }, reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    }, createdAt: {
        type: Date,
        date: new Date(),
    }, username: {
        type: String,
        required: true,
    }, reactions: [reactionSchema], 
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
