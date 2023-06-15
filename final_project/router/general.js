const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const myPromise = new Promise((resolve,reject) => {
    try{
      let data = JSON.stringify(books,null,4);
      resolve(data);
    }catch(err){
      reject(err);
    }
  });
  myPromise.then(
    (data) => res.send(data);
    (err) => console.log("Error"
  );
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const myPromise = new Promise((resolve,reject) => {
    try{
      let isbn = req.params.isbn;
      let data = JSON.stringify(books[isbn],null,4);
      resolve(data);
    }catch(err){
      reject(err);
    }
  });
  myPromise.then(
    (data) => res.send(data);
    (err) => console.log("Error"
  );
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const myPromise = new Promise((resolve,reject) => {
    try{
      let author = req.params.author;
      let keys = Object.keys(books);
      for (i=1; i<=keys.length; i++){
        if (books[i].author == author){
          return res.send(JSON.stringify(books[i],null,4));
        }
      };
      resolve("success");
    }catch(err){
      reject(err);
    }
  });
  myPromise.then(
    (data) => console.log(data);
    (err) => console.log("Error"
  );
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const myPromise = new Promise((resolve,reject) => {
    try{
      let title = req.params.title;
      let keys = Object.keys(books);
      for (i=1; i<=keys.length; i++){
        if (books[i].title == title){
          return res.send(JSON.stringify(books[i],null,4));
        }
      };
      resolve("success");
    }catch(err){
      reject(err);
    }
  });
  myPromise.then(
    (data) => console.log(data);
    (err) => console.log("Error"
  );
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  try{
      let isbn = req.params.isbn;
      let data = JSON.stringify(books[isbn].reviews,null,4);
      resolve(data);
    }catch(err){
      reject(err);
    }
  });
  myPromise.then(
    (data) => res.send(data);
    (err) => console.log("Error"
  );
});

module.exports.general = public_users;
