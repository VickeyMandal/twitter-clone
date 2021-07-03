const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware");
const flash = require('connect-flash');

//DB Promise
mongoose
  .connect("mongodb://localhost:27017/twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//create path from currect dir to views
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

const authRoutes = require("./routes/authRoutes");


//APIs
const postsApiRoute = require('./routes/api/posts');

app.use(
  session({
    secret: "weneedbettersecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//using routes
app.use(authRoutes);

//Using apis
app.use(postsApiRoute);




app.get("/", isLoggedIn, (req, res) => {
  res.render('layouts/main-layout');
});

app.listen(3000, () => {
  console.log("Server running at 3000");
});
