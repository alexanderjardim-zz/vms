var http       = require("http");
var url        = require("url"); 
var fs         = require("fs");
var ctl        = require("./controller.js")
var serverPort = 3000;

function serve(res, status, type, content) {
	res.writeHead(status, {"Content-type": type});
	res.write(content+'');
	res.end();	
}

function Controller(url, method) {
	var parameters = url.pathname.substring(1,url.pathname.length).split("/");
	this.model = parameters[0];
	this.id = parameters[1];
}

http.createServer( function(req, res) {

	var parsedUrl = url.parse(req.url);
	var templateFile = "templates/"+parsedUrl.pathname;
	var notFoundFile = "templates/status/404.html";

	console.log(new Controller(parsedUrl));

	fs.exists(templateFile, function(exists) {

		if (exists) {
			fs.readFile( templateFile, "utf8", function(err, data) {
				if (err) {
					console.log(err);
					serve(res, 500, "text/html", err);
				} else {
					serve(res, 200, "text/html", data);
				}			
			});			
		} else {
			fs.readFile( notFoundFile, "utf8", function(err, data) {
				var content;
				if (err) {
					content = "<html><head><title>404</title></head><body>404 - P&aacute;gina n&atilde;o encontrada!<br />"+err+"</body></html>";
				} else {
					content = data;
				}
				serve(res, 404, "text/html", content);
			});		
		}

	});

}).listen(serverPort);

console.log("Running server at port: "+serverPort);