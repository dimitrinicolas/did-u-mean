
/**
 * modules/langs-load.js
 * 
 * Load langs files
 */

var langs = {},
	defaultLang = "fr";

var folders = fs.readdirSync("server/words/");

folders.map(function(file) {

	var lang = file.replace(".txt", "");

	langs[lang] = fs.readFileSync("server/words/" + file, {

		encoding: "utf8"

	}).split("\r\n");

	for (var i = 0, length = langs[lang].length; i < length; i++) {
	
		langs[lang][i] = langs[lang][i].toLowerCase();
	
	}

});