const cors = require('cors');
const app = require('./app');

app.use(cors({
    origin: '*',
    credentials: true
}));

app.listen('5000', () => console.log("Server Running"));