if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

//requiring libraries
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParse = require('cookie-parser')
const MongoStore = require('connect-mongo')

//require routes
const userRoutes = require('./routes/user')
const avmetRoutes = require('./routes/avmet')

//require middleware
const { isLoggedIn } = require('./middleware')

//models
const Avmet = require('./models/avmet')
const User = require('./models/user')
const cookieParser = require('cookie-parser')

//initialise express
const app = express()


//initialise mongoose
const dbURL = process.env.DB_URL

async function main() {
    await mongoose.connect(dbURL)
}

main()
    .then(() => {
        console.log('database is connected!')
    })
    .catch((err) => {
        console.log('failed connection')
        console.log(err)
    })

//configuring mongostore to store sessions
const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET
    }
})


//configuring sessions in development
// const sessionConfig = {
//     store: store,
//     secret: process.env.SECRET, //required parameter
//     name: process.env.SESSION_NAME, //this is to change the default connectsid, so people cannot see what is the session name on the console. 
//     resave: false, //set to false if we are not using session.touch()
//     saveUninitialized: true, //set to true if want to track session id
//     cookie: {
//         httpOnly: false,
//         secure: false, //recommended for https:// webpages. if project, we wont have https. 
//         expires: Date.now() + 604800000,
//         maxAge: 604800000,
//         // sameSite:'none'
//     }
// }


//configuring sessions in deployment
const sessionConfig = {
    store: store,
    secret: process.env.SECRET, //required parameter
    name: process.env.SESSION_NAME, //this is to change the default connectsid, so people cannot see what is the session name on the console. 
    resave: false, //set to false if we are not using session.touch()
    saveUninitialized: true, //set to true if want to track session id
    cookie: {
        httpOnly: true,
        secure: true, //recommended for https:// webpages. if project, we wont have https. 
        expires: Date.now() + 604800000,
        maxAge: 604800000,
        sameSite:'none'
    }
}


//definiting  uses
app.set("trust proxy", 1);
app.use(session(sessionConfig))
app.use(express.json())
app.use(cookieParser())

//cors in development
// app.use(cors({
//     origin: true, // front end link
//     credentials: true
// }))

//cors in deployment
app.use(cors({
    origin: process.env.FRONT_END, // front end link
    credentials: true
}))

//passport initialising
app.use(passport.initialize()); // to initialize passportjs
app.use(passport.session()); // use for persistent login
passport.use(User.createStrategy());
// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // how to store user in session
passport.deserializeUser(User.deserializeUser()); // how to remove user in session

//routes
app.use('/', userRoutes)
app.use('/', avmetRoutes)

app.get('/', isLoggedIn, async (req, res) => {
    console.log(req.sessionID)
    if (res.statusCode === 200) {
        const avmet = await Avmet.find({})
        res.json(avmet)
    } else {
        res.json({ session: req.sessionID, path: '/login' })
    }
})

app.listen(3000, () => {
    console.log('running on port 3000')
})
