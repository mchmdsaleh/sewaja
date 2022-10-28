const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    image: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);
