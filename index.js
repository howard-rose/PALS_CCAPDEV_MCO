// .env
import 'dotenv/config';
// Web-app
import express from 'express';
import exphbs from 'express-handlebars';
// DB
import { connect } from './src/models/db.js';
// Routes
import router from './src/routes/index.js';

async function main() {
    const app = express();

    app.use('/static', express.static('public'));
    app.engine('hbs', exphbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
    app.set('view cache', false);

    app.use(express.json());

    app.use(router);

    app.listen(process.env.SERVER_PORT, () => {
        console.log("Express app now listening");
        connect().then(() => {
            console.log("Now connected to MongoDB server");
        })
    })
}

main();
