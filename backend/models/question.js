const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String
    },
    image: {
        type: String
    },
    optionId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Option'
        }
    ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;