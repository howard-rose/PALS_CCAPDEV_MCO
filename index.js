// Web-app
import express from 'express';
import exphbs from 'express-handlebars';
// Session and Auth
import session from 'express-session';
import passport from 'passport';
// DB
import { connect } from './src/models/db.js';
// Routes
import router from './src/routes/index.js';

async function main() {
    const app = express();

    app.use('/static', express.static('public'));
    app.engine('hbs', exphbs.engine({
        extname: 'hbs',
        helpers: {
            ifEq: function(arg1, arg2, options) {
                //console.log('COMPARED');
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
    app.set('view cache', false);

    app.use(express.json());

    app.use(session({
        secret: 'VERY very SECRET WOW',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(router);

    app.listen(process.env.PORT, () => {
        console.log("Express app now listening");
        connect().then(() => {
            console.log("Now connected to MongoDB server");
        })
    })
}

main();
