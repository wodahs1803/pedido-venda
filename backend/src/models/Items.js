const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        deafult: Date.now,
    },
});

ItemsSchema.plugin(mongoosePaginate);

mongoose.model('Items', ItemsSchema);