"use strict";

const recipeModel = require("../Models/recipeModel");

async function createRecipe(req, res) {
    const {name, ingredients, tag} = req.body;
    const creator = req.session.user.userID;
    await recipeModel.addRecipe(name, ingredients, tag, creator);
    const recipes = getAllUsersRecipes(creator);
    res.render("me", {"recipes": recipes});
}

function searchRecipes(req, res) {
    const query = req.body;
    const searchResults = recipeModel.searchRecipes(query);
    res.render("searchResults", {"results": searchResults});
}

function getAllUsersRecipes(uid) {
    const results = recipeModel.getUsersRecipes(uid);
    return results;
}

module.exports = {
    createRecipe,
    searchRecipes,
    getAllUsersRecipes
}