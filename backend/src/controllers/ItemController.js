const mongoose = require('mongoose');

const Item = mongoose.model('Items');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const items = await Item.paginate({}, { page, limit: 10 });
        
        return res.json(items);
    },

    async show(req, res){
        const item = await Item.findById(req.params.id);

        return res.json(item);
    },

    async store(req, res){
        const item = await Item.create(req.body);
    
        return res.json(item);
    },

    async update(req, res){
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(item);
    },

    async destroy(req, res){
        const item = await Item.findByIdAndRemove(req.params.id);

        return res.send();
    },

};