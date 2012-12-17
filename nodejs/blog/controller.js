var fs = require("fs");

function getController(url, method, data) {
	var path = "controller/";
	var parameters = url.pathname.substring(1,url.pathname.length).split("/");
	controllerPath = path+parameters[0]+".js";
	fs.exists( controllerPath, function(exists) {
		if (exists) {
			var controller = require(controllerPath);
			controller.method = method ? method : "GET";
			controller.data   = data;
			console.log(controller);
		} else {
			return;
		}
	});
}