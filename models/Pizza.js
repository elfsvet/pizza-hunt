const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [], // could've use Array
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    // add options:
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    // ! PLAY WITH REDUCE MORE
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// The code is trying to find the number of comments in a comment.
// It does this by using a for loop that goes through each comment and adds 1 to the total count.
// The code is also looking at the replies property on each comment, which is an array with all of the replies from other users who have commented on that particular post.
// The code would be used to calculate the number of comments on a post.
// The code above attempts to calculate the total number of replies for a comment.

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;