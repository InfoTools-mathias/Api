const express = require('express');
const Routes = require("./config/routes");

class App {
    app = express()
    route = new Routes();

    constructor() {
        this.app = express()
        this.config()
        this.route.routes(this.app)
    }

    config() {
        this.app.use(express.json());
    }
}

module.exports = new App().app;