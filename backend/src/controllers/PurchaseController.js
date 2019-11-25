const mongoose = require('mongoose');

const Purchase = mongoose.model('Purchases');
const ItemPurchase = mongoose.model('ItemPurchase');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const purchases = await Purchase.paginate({}, { page, limit: 10 });
        
        return res.json(purchases);
    },

    async show(req, res){
        const purchase = await Purchase.findById(req.params.id);
        
        return res.json(purchase);
    },

    async store(req, res){
        const purchase = await Purchase.create(req.body);

        return res.json(purchase);
    },

    async update(req, res){
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(purchase);
    },

    async destroy(req, res){
        const purchase = await Purchase.findByIdAndRemove(req.params.id);

        return res.send();
    },

    async listItems(req, res){
        try {
        const { page = 1 } = req.query;
        const itemPurchase = await ItemPurchase.find({purchase_id: req.params.id}).populate('item_id.id').select('item_id');
        
        return res.json(itemPurchase);
        } catch (error) {
            return res.json(error);
        }
    },

    async manageItems(req, res){
        const itemPurchaseDel = await ItemPurchase.deleteMany({purchase_id: req.params.id});
        const itemPurchase = await ItemPurchase.create(req.body);
        
        return res.json(itemPurchase);
    },

};