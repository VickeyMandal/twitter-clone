const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware");
const flash = require("connect-flash");

//Database connection (DB Promise)
mongoose
  .connect("mongodb://localhost:27017/twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

//Setting template engine
app.set("view engine", "ejs");

//Setting path for views
//__dirname: it contains the whole path of the folder
app.set("views", path.join(__dirname, "/views"));

//Middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));

//For parsing the body
app.use(express.urlencoded({ extended: true }));
//For parsing the json data
app.use(express.json());

//Routes
const authRoutes = require("./routes/authRoutes");

//APIs
const postsApiRoute = require("./routes/api/posts");

//Express-session MiddleWare
app.use(
  session({
    secret: "weneedbettersecret",
    resave: false,
    saveUninitialized: true,
  })
);

//flash is a special area of the session used for storing messages
app.use(flash());

//1:Passport Initialization
app.use(passport.initialize());
//2:Required passport session
app.use(passport.session());
//3:Authentication Strategy Used: Passport-Local
//User: user modal data
passport.use(new LocalStrategy(User.authenticate()));
//4:To serialize the users
passport.serializeUser(User.serializeUser());
//5.To deserialize the users
passport.deserializeUser(User.deserializeUser());

//using routes
app.use(authRoutes);

//Using apis
app.use(postsApiRoute);

//Display :Home element if logged in
//main-layout is an ejs file
app.get("/", isLoggedIn, (req, res) => {
  res.render("layouts/main-layout");
});

//To start the server
app.listen(3000, () => {
  console.log("Server running at 3000");
});
