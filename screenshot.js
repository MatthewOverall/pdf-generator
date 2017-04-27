// ReSharper disable UndeclaredGlobalVariableUsing
"use strict";

var system = require("system");
var webpage = require("webpage");


var args = system.args;


//var html;
//if (args[1]) {
//	html = args[1];
//}

// Reading HTML from stdin instead of command line - breaking for large html chunks
var html = system.stdin.read();


var page = webpage.create();
page.content = html;

page.evaluate(function () {
	document.body.bgColor = "white";
	document.body.style.margin = "40px";
});

page.viewportSize = {
	width: 816,
	height: 1066
};

page.onLoadFinished = function () {
	window.setTimeout(function () {
		var base64 = page.renderBase64("PNG");
		console.log(base64);
		phantom.exit();
	}, 100);
}