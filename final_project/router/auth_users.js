const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"user2", "password":"password2"}];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    if (username) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let username = req.session.authorization['username']; 
    let isbn = req.params.isbn;
    let reviews = books[isbn].reviews
    let key = Object.keys(books[isbn].reviews);
    if(key == username){
        reviews[uesrname] = req.body.review;
        return res.status(300).json({
            message: "the review for the book ISBN ${isbn} has been update"
        });
    }else{
        reviews.uesrname = req.body.review;
        return res.status(300).json({
            message: "the review for the book ISBN "+isbn +"has been add"
        });
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let username = req.session.authorization['username']; 
    let isbn = req.params.isbn;
    let reviews = books[isbn].reviews

    if (username){
        delete reviews[username];
        return res.send(`Review for the book isbn  ${isbn} posted user ${username} deleted.`);
    }
    
  });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
