/*  Define custom tokens */

var url = require('url');

morgan.token('query-string', function(req, res){
    return url.parse(req.url).query;
});