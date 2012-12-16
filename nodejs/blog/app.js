var http = require("http");
var url  = require("url"); 
var fs   = require("fs");

var server = http.createServer( function(req, res) {

	var parsedUrl = url.parse(req.url);
	var templateFile = "templates/"+parsedUrl.pathname;
	var notFoundFile = "templates/404.html";

	fs.exists(templateFile, function(exists) {

		if (exists) {
			fs.readFile( templateFile, "utf8", function(data, err) {
				if (err) {
					res.writeHead(500, {"Content-type": "text/html"});
					res.write(err+'');
					res.end();
				}
				res.writeHead(200, {"Content-type": "text/html"});
				res.write(data+'');			
				res.end();
			});			
		} else {
			fs.readFile( notFoundFile, "utf8", function(notFoundMsg, err) {
				res.writeHead(404, {"Content-type": "text/html"});
				if (err) {
					res.write("<html><head><title>404</title></head><body>404 - Página não encontrada!</body></html>", "utf8");
				} else {
					res.write(notFoundMsg+'');
				}
				res.end();	
			});		
		}

	});



});

server.listen(3000);