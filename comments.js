//Create web server
//1. import express
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const fs = require('fs');
const path = require("path");
const { check, validationResult } = require('express-validator');

//2. create router
//3. export router
module.exports = router;

//4. create routes
//GET /comments - read all comments
router.get("/", (req, res) => {
    //read json file
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/comments.json")));
    //send json file to client
    res.send(comments);
});

//GET /comments/:id - read comment with id
router.get("/:id", (req, res) => {
    //read json file
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/comments.json")));
    //find comment with id
    const comment = comments.find((comment) => comment.id === req.params.id);
    //send comment to client
    res.send(comment);
});

//POST /comments - create comment
router.post("/", [
    check("author").isLength({ min: 3 }),
    check("text").isLength({ min: 3 }),
    check("post").isLength({ min: 3 }),
], (req, res) => {
    //read json file
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/comments.json")));
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        //create new comment
        const newComment = {
            id: uuidv4(),