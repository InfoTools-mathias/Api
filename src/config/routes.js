const express = require('express');

const { middelware, login, getUserByToken } = require('./middleware');

const UserController = require('../controlers/User');
const CategorieController = require('../controlers/Categorie');
const ProductController = require('../controlers/Product');
const MeetingController = require('../controlers/Meeting');
const FactureController = require('../controlers/Facture');

class Routes {
    userController = new UserController();
    categorieController = new CategorieController();
    productController = new ProductController();
    meetingController = new MeetingController();
    factureController = new FactureController();

    userRouteV1() {
        const route = express.Router();

        route.get('/', middelware, this.userController.index);
        route.post('/', middelware, this.userController.create);

        route.get('/:id', middelware, this.userController.show);
        route.put('/:id', middelware, this.userController.update);
        route.delete('/:id', middelware, this.userController.delete);

        return route;
    }

    categorieRouteV1() {
        const route = express.Router();

        route.get('/', this.categorieController.index);
        route.post('/', middelware, this.categorieController.create);

        route.get('/:id', this.categorieController.show);
        route.put('/:id', middelware, this.categorieController.update);
        route.delete('/:id', middelware, this.categorieController.delete);

        return route;
    }

    produitRouteV1() {
        const route = express.Router();

        route.get('/', this.productController.index);
        route.post('/', middelware, this.productController.create);

        route.get('/:id', this.productController.show);
        route.put('/:id', middelware, this.productController.update);
        route.delete('/:id', middelware, this.productController.delete);

        return route;
    }

    meetingRouteV1() {
        const route = express.Router();

        route.get('/', middelware, this.meetingController.index);
        route.post('/', middelware, this.meetingController.create);

        route.get('/:id', middelware, this.meetingController.show);
        route.put('/:id', middelware, this.meetingController.update);
        route.delete('/:id', middelware, this.meetingController.delete);

        return route;
    }

    factureRouteV1() {
        const route = express.Router();

        route.get('/', middelware, this.factureController.index);
        route.post('/', middelware, this.factureController.create);

        route.get('/:id', middelware, this.factureController.show);
        route.put('/:id', middelware, this.factureController.update);
        route.delete('/:id', middelware, this.factureController.delete);

        route.post('/:id/lignes', middelware, this.factureController.createLigne);
        route.put('/:id/lignes/:ligneId', middelware, this.factureController.editLigne);
        route.delete('/:id/lignes/:ligneId', middelware, this.factureController.deleteLigne);

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