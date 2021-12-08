const express = require('express');
const oauth = require('./middleware');

const UserController = require('../controlers/v1/user');
const CategorieController = require('../controlers/v1/categorie');
const ProductController = require('../controlers/v1/product');

class Routes {
    userController = new UserController();
    categorieController = new CategorieController();
    productController = new ProductController();

    userRouteV1() {
        const route = express.Router();

        route.get('/', oauth.middelware, this.userController.index);
        route.post('/', this.userController.create);

        route.get('/:ids', oauth.middelware, this.userController.show);
        route.put('/:id', oauth.middelware, this.userController.update);
        route.delete('/:id', oauth.middelware, this.userController.delete);

        return route;
    }

    categorieRouteV1() {
        const route = express.Router();

        route.get('/', this.categorieController.index);
        route.post('/', oauth.middelware, this.categorieController.create);

        route.get('/:id', this.categorieController.show);
        route.put('/:id', oauth.middelware, this.categorieController.update);
        route.delete('/:id', oauth.middelware, this.categorieController.delete);

        return route;
    }

    produitRouteV1() {
        const route = express.Router();

        route.get('/', this.productController.index);
        route.post('/', oauth.middelware, this.productController.create);

        route.get('/:ids', this.productController.show);
        route.put('/:id', this.productController.update);
        //route.put('/:id', oauth.middelware, this.productController.update);
        route.delete('/:id', oauth.middelware, this.productController.delete);

        return route;
    }

    oauthRouteV1() {
        const route = express.Router();

        route.post('/password', oauth.login);

        return route;
    }

    routes(app) {

        app.use('/img', express.static('assets'));

        //API V1
        app.use('/api/v1/oauth', this.oauthRouteV1());
        app.use('/api/v1/users', this.userRouteV1());
        app.use('/api/v1/categories', this.categorieRouteV1());
        app.use('/api/v1/products', this.produitRouteV1());
    }
}

module.exports = Routes;