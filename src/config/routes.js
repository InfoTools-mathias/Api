const express = require('express');

const { middelware, login } = require('./middleware');
const UserController = require('../controlers/user');
const CategorieController = require('../controlers/categorie');
const ProductController = require('../controlers/product');
const MeetingController = require('../controlers/meeting');

class Routes {
    userController = new UserController();
    categorieController = new CategorieController();
    productController = new ProductController();
    meetingController = new MeetingController();

    userRouteV1() {
        const route = express.Router();

        route.get('/', this.userController.index);
        route.post('/', this.userController.create);

        route.get('/:id', this.userController.show);
        route.put('/:id', this.userController.update);
        route.delete('/:id', this.userController.delete);

        return route;
    }

    categorieRouteV1() {
        const route = express.Router();

        route.get('/', this.categorieController.index);
        route.post('/', this.categorieController.create);

        route.get('/:id', this.categorieController.show);
        route.put('/:id', this.categorieController.update);
        route.delete('/:id', this.categorieController.delete);

        return route;
    }

    produitRouteV1() {
        const route = express.Router();

        route.get('/', this.productController.index);
        route.post('/', this.productController.create);

        route.get('/:id', this.productController.show);
        route.put('/:id', this.productController.update);
        route.delete('/:id', this.productController.delete);

        return route;
    }

    meetingRouteV1() {
        const route = express.Router();

        route.get('/', this.meetingController.index);
        route.post('/', this.meetingController.create);

        route.get('/:id', this.meetingController.show);
        route.put('/:id', this.meetingController.update);
        route.delete('/:id', this.meetingController.delete);

        return route;
    }

    oauthRouteV1() {
        const route = express.Router();

        route.post('/password', login);

        return route;
    }

    routes(app) {

        app.use('/img', express.static('assets'));

        //API V1
        app.use('/api/v1/oauth', this.oauthRouteV1());
        app.use('/api/v1/users', this.userRouteV1());
        app.use('/api/v1/categories', this.categorieRouteV1());
        app.use('/api/v1/products', this.produitRouteV1());
        app.use('/api/v1/meetings', this.meetingRouteV1());
    }
}

module.exports = Routes;