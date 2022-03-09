const cors = require('cors');
const app = require('./app');

app.use(
    cors({
        origin: 'http://localhost:4200',
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: [ "Authorization", "Content-Type" ]
    })
);

app.listen('5000', () => console.log("Server Running"));