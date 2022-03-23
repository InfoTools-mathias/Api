const express = require('express');

const { middelware, login, getUserByToken } = require('./middleware');

const UserController = require('../controlers/user');
const CategorieController = require('../controlers/categorie');
const ProductController = require('../controlers/product');
const MeetingController = require('../controlers/meeting');
const FactureController = require('../controlers/facture');

class Routes {
    userController = new UserController();
    categorieController = new CategorieController();
    productController = new ProductController();
    meetingController = new MeetingController();
    factureController = new FactureController();

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

    factureRouteV1() {
        const route = express.Router();

        route.get('/', this.factureController.index);
        route.post('/', this.factureController.create);

        route.get('/:id', this.factureController.show);
        route.put('/:id', this.factureController.update);
        route.delete('/:id', this.factureController.delete);

        route.post('/:id/lignes', this.factureController.createLigne);
        route.put('/:id/lignes/:ligneId', this.factureController.editLigne);
        route.delete('/:id/lignes/:ligneId', this.factureController.deleteLigne);

        return route;
    }

    oauthRouteV1() {
        const route = express.Router();

        route.post('/password', login);
        route.get('/@me', middelware, getUserByToken);

        return route;
    }

    routes(app) {

        app.use('/img', express.static('assets/img'));

        //API V1
        app.use('/api/v1/oauth', this.oauthRouteV1());
        app.use('/api/v1/users', this.userRouteV1());
        app.use('/api/v1/categories', this.categorieRouteV1());
        app.use('/api/v1/products', this.produitRouteV1());
        app.use('/api/v1/meetings', this.meetingRouteV1());
        app.use('/api/v1/factures', this.factureRouteV1());
    }
}

module.exports = Routes;