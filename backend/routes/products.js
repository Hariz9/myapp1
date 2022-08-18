const {Product} = require('./models/product')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
    });

    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
    if(!product)
    return res.status(400).send('the product cannot be created!')

    res.send(product);
});

module.exports = router;