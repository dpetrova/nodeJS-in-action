'use strict';
const express = require('express');

//function provides a way to add messages to a session variable from any Express request
function message(req) {
  return (msg, type) => {
    type = type || 'info';
    let sess = req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({ type: type, string: msg });
  };
};

//adding properties to express.response object (res) means they’ll then be available to all middleware and routes
//now you’re able to access messages and removeMessages() within any view
module.exports = (req, res, next) => {  
  //add messages to the message queue
  res.message = message(req);
  //add a message of type error to the message queue
  res.error = (msg) => {
    return res.message(msg, 'error');
  };  
  //array that may or may not exist from the previous request 
  res.locals.messages = req.session.messages || [];
  //remove the messages from the session
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };
  next();
};
