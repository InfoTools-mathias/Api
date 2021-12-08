const Product = require("../../models/v1/product");
const { parseProduct, writeProductImage } = require('../../functions/utilsV1');

class ProductController {
    
    index(req, res) {
        Product.findAll()
        .then(async products => {
            const data = JSON.parse(JSON.stringify(products));

            let final = [];
            for(let product of data) {
                product = await parseProduct(product);
                final.push(product);
            }
            return res.json(final);
        })
        .catch(err => res.status(500).json(err));
    }

    create(req, res) {
        const params = req.body;

        if(!params) {
            return res.status(400);
        }

        if(params.id !== undefined) {
            delete params.id;
        }

        if(params.image !== undefined && req.headers['x-image-data'] !== undefined) {
            writeProductImage(req.headers['x-image-data'], params.image);
        }

        Product.create(params)
        .then(async product => {
            product = await parseProduct(product);
            res.status(201).json(product);
        })
        .catch(err => res.status(500).json(err))
    }

    show(req, res) {
        const ids = String(req.params.ids).split(',');

        let final = [];
        Product.findAll()
        .then(async products => {
            const data = JSON.parse(JSON.stringify(products));
            let final = [];
            for(const product of data) {
                if(ids.includes(String(product.id))) {
                    product = await parseProduct(product);
                    console.log(product);
                    final.push(product);
                }
                else {
                    final.push({
                        id: id,
                        error: 'Product not found'
                    })
                }
            }
            return res.json(final);
        })
        .catch(err => res.status(500).json(err))
    }

    async delete(req, res) {
        const delProduct = await Product.findByPk(parseInt(req.params.id));
        await delProduct.destroy();
        return res.status(202);
    }

    update(req, res) {
        const id = req.params.id;
        const params = req.body;
        const update = {
            where: { id: id },
            limit: 1
        }

        if(params.image !== undefined && req.headers['x-image-data'] !== undefined) {
            writeProductImage(req.headers['x-image-data'], params.image);
        }

        Product.update(params, update)
        .then(product => {
            const data = JSON.parse(JSON.stringify(product));
            res.status(201).json(data);
        })
    }
}

module.exports = ProductController;