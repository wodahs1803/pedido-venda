const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PurchaseSchema = new mongoose.Schema({
    client:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    address:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        deafult: Date.now,
    },
});

PurchaseSchema.plugin(mongoosePaginate);

mongoose.model('Purchases', PurchaseSchema);