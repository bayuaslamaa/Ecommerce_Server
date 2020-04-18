const { Product } = require("../models")

class ProductController {
    static create(req, res, next) {
        const { name, image_url, price, stock } = req.body
        let newProduct = {
            name,
            image_url,
            price,
            stock
        }
        if (req.currentUserId)
            Product.create(newProduct)
                .then(data => res.status(201).json(data))
                .catch(err => next(err))
    }

    static getAll(req, res, next) {
        if (req.currentUserId)
            Product.findAll()
                .then(result => {
                    res.status(200).json({
                        products: result
                    })
                }).catch(err => next(err))

    }
    static getProduct(req, res, next) {
        let id = req.params.id
        if (req.currentUserId) {
            Product.findOne({
                where: {
                    'id': id
                }
            }).then(data => {
                if (data) {
                    // console.log('DaATA', data)
                    return res.status(200).json(data)
                } else {
                    return next({ name: 'NotFound' })
                }
            }).catch(err => next({ name: 'NotFound' }))
        }
    }
    static update(req, res, next) {
        let id = req.params.id
        const { name, image_url, price, stock } = req.body
        let updated = {
            name,
            image_url,
            price,
            stock
        }
        if (req.currentUserId)
            Product.update(updated, {
                where: {
                    'id': id
                }
            }).then((data) => {
                if (data) {
                    return res.status(201).json({
                        msg: 'success',
                        product: data
                    })
                } else {
                    return next({
                        name: 'NotFound'
                    })
                }
            }).catch(err => {
                next(err)
            })
    }
    static delete(req, res, next) {
        let id = req.params.id
        if (req.currentUserId)
            Product.destroy({
                where: {
                    'id': id
                }
            }).then(result => {
                return res.status(200).json({
                    msg: `success deleting task with id: ${id}`
                })
            }).catch(err => {
                return next({
                    name: 'NotFound'
                })
            })
    }
}

module.exports = ProductController