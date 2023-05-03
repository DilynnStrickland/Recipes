CREATE TABLE IF NOT EXISTS Users (
    uid TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    passwordHash TEXT
);

CREATE TABLE IF NOT EXISTS Recipes (
    id TEXT PRIMARY KEY,
    name TEXT,
    ingredients TEXT,
    tag TEXT,
    rating INTEGER,
    creator TEXT
);