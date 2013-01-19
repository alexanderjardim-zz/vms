var http = require("http")

http.createServer( function(req, res) {
	res.writeHead(200, {"Content-type":"text/xhtml"})
	res.write("Funciona!")
	res.close()
}).listen(3000)