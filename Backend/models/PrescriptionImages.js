const mongoose = require('mongoose')
const { Schema } = mongoose;

const ImagesSchema = new Schema({
    pres_image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const PresImage = mongoose.model('presimage', ImagesSchema)
PresImage.createIndexes()
module.exports = PresImage