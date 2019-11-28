const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ItemPurchaseSchema = new mongoose.Schema({
    item_id:[
        {   
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Items'
        }
    ],
    purchase_id:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchases'
        }
    ],
    quantity:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        deafult: Date.now,
    },
});

ItemPurchaseSchema.plugin(mongoosePaginate);

mongoose.model('ItemPurchase', ItemPurchaseSchema);