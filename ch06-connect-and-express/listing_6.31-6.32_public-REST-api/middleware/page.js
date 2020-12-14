// pagination middleware

'use strict';

module.exports = (cb, perpage) => {
  //defaults to 10 per page
  perpage = perpage || 10;
  //return middleware function
  return (req, res, next) => {
    //use the query-string ?page=N value to determine the current page    
    let page = Math.max(parseInt(req.params.page || '1', 10),  1) - 1; //parse page param as a base 10 integer
    //invoke passed callback which fetches the total number of results
    cb((err, total) => {
      //delegate errors
      if (err) return next(err);
      //store page properties for future reference
      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      };
      //pass control to next middleware component
      next();
    });
  };
};

