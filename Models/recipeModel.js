"use strict";
const db = require("./db");
const crypto = require("crypto");


async function addRecipe(name, ingredients, tag, creator) {
    const recipeID = crypto.randomUUID();
    const sql = `INSERT INTO Recipes (id, name, ingredients, tag, creator) VALUES (@id, @name, @ingredients, @tag, @creator)`;
    const stmt = db.prepare(sql);
    try {
        stmt.run({
            "id": String(recipeID),
            "name": name,
            "ingredients": ingredients,
            "tag": tag,
            "creator": creator
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function searchRecipes(query) {
    const search = "%" + query.search + "%";
    const sql = `SELECT * FROM Recipes WHERE name LIKE @query`;
    const stmt = db.prepare(sql);
    try {
        const results = stmt.all({
            "query": search
        });
        return results;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function getUsersRecipes(uid) {
    const sql = `SELECT * FROM Recipes WHERE creator=@uid`;
    const stmt = db.prepare(sql);
    try {
        const results = stmt.all({
            "uid": uid
        });
        return results;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    addRecipe,
    searchRecipes,
    getUsersRecipes
}