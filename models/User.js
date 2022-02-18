const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
           type: String,
           unique: true,
           required: 'Please enter a username',
           trim: true 
        },
        email: {
            type: String,
            unique: true,
            required: 'Please enter a valid email',
            match: [/.+\@.+\..+/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// length of user friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;