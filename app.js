"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);

const sessionConfig = {
    store: new RedisStore({ client: redis.createClient()}),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, 
    name: "session",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 8, // big number for testing cookies
    }
};

app.use(session(sessionConfig));

//For Static Views
app.use(express.static("public", {index: "index.html", extensions: ["html"]}));
app.use(express.json({limit: '200kb'}));
app.use(express.urlencoded({ extended: false }));

//For Dynamic Views
app.set("view engine", "ejs");

const userValidator = require("./Validators/userValidator");
const userController = require("./Controllers/userController");
const recipeController = require("./Controllers/recipeController");

/********************************************************
 * ENDPOINTS
 ********************************************************/

app.post("/api/login",
 userValidator.validateLoginBody,
 userController.logIn
 );

 app.post("/api/register", 
    userValidator.validateRegisterBody, 
    userController.createNewUser
);

app.post("/api/createRecipe", recipeController.createRecipe);
app.post("/api/search", recipeController.searchRecipes)

 app.get("/login", (req, res) => {
    console.log("login page requested");
    res.render("login");
 });

 app.get("/test", (req, res) => {
    res.send("/test");
 });

 app.get("/register", (req, res) => {
    console.log('register requested');
    res.render("register");
 });

 app.get("/", (req, res) => {
    console.log('index requested');
    res.render("index");
 });

 app.get("/search", (req, res) => {
    console.log(req.session.user);
    res.render("search");
 });

 app.get("/create", (req, res) => {
    res.render("create");
 });

 app.get("/me", (req, res) => {
    const recipes = recipeController.getAllUsersRecipes(req.session.user.userID);
    res.render("me", {"recipes": recipes});
 });

app.post("/logout", (req, res) => {
    req.session.regenerate( (err) =>{
        if (err){
            console.error(err);
        }
        res.redirect("/");
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});

module.exports = {
    app
};