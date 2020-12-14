'use strict';

// Validation middleware implementation

//parse entry[prop] notation
function parseField(field) {
  return field
    .split(/\[|\]/)
    .filter((s) => s);
}

//look up property based on parseField() results
function getField(req, field) {
  let val = req.body;
  field.forEach((prop) => {
    val = val[prop];
  });
  return val;
}

// export several middleware components:
exports.required = (field) => {
  field = parseField(field);
  return (req, res, next) => {
    //check if field has a value
    if (getField(req, field)) {
      // move on to next middleware component
      next();
    } else {
      //display an error
      res.error(`${field.join(' ')} is required`);
      res.redirect('back');
    }
  };
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    //check if field's value has enough lenght
    if (getField(req, field).length > len) {
      // move on to next middleware component
      next();
    } else {
      //display an error
      const fields = field.join(' ');
      res.error(`${fields} must have more than ${len} characters`);
      res.redirect('back');
    }
  };
};

