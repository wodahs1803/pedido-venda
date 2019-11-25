const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ItemPurchaseSchema = new mongoose.Schema({
    item_id:[
        {   
            id:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Items',
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    purchase_id:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchases'
        }
    ],
    createdAt: {
        type: Date,
        deafult: Date.now,
    },
});

ItemPurchaseSchema.plugin(mongoosePaginate);

mongoose.model('ItemPurchase', ItemPurchaseSchema);