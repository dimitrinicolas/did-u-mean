
/**
 * core/node-modules.js
 *
 * Définition des modules nodeJs utilisés.
 */

var http = require("http"),

	fs = require("fs"),

	socketIo = require("socket.io");

/**
 * core/main.js
 *
 * Création de la variable principale "server".
 */

var server = {

	website: "MarmWork",

	sessions: {}

};

/**
 * core/onload.js
 *
 * Callback lors du chargement complet du script serveur.
 */

server.loadListeners = [];

function $(callback) {

	if (typeof callback === "function") {

		server.loadListeners.push(callback);

	}

}

/**
 * core/socket.js
 *
 * Initialisation de socket.io
 */

var httpServer = http.createServer(),

	io = new socketIo();

httpServer.listen(3000);

io.listen(httpServer);

io.sockets.on("connection", function(socket) {

	Actions.initListeners(socket);

});

/**
 * core/utils/each.js
 *
 * Créer simplement une boucle dans un objet.
 */

function each(object, fn) {

	if (typeof object === "object") {

		if (object instanceof Array) {

			var length = object.length,
				i;

			for (i = 0; i < length; i++) {

				fn(object[i], i);

			}

		}

		else {

		    for (var name in object) {

		        if (object.hasOwnProperty(name)) {

		        	fn(object[name], name);

		        }

		    }

		}

	}

}

/**
 * core/utils/is-function.js
 *
 * Vérifier si une variable est une fonction.
 */

function is_function(fn) {

	return typeof fn === "function";

}

/**
 * core/log.js
 *
 * Fonction de log du serveur.
 */

function log(message, type) {

	if (!message) { return; }

	if (typeof message !== "string") {

		console.log(message);

	}

	else {

		if (type === "error") {

			var intro = "\x1B[31m\x1b[1m",
				outro = "\x1B[39m";

		}

		else if (type === "good") {

			var intro = "\x1B[36m\x1b[1m",
				outro = "\x1B[39m";

		}

		else {

			var intro = "\x1B[29m\x1b[1m",
				outro = "\x1B[39m";

		}

		console.log(intro + message + outro);

	}

}

/**
 * modules/did-i-mean.js
 * 
 * Did I mean function.
 */

var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

function known(word, lang) {

	lang = lang || langs[defaultLang];

	for (var i = 0, length = lang.length; i < length; i++) {

		if (lang[i] == word) {

			return word;

		}

	}

	return false;

}


function knownWithoutAccent(word, lang) {

	word = removeAccents(word);

	lang = lang || langs[defaultLang];

	for (var i = 0, length = lang.length; i < length; i++) {

		if (removeAccents(lang[i]) == word) {

			return lang[i];

		}

	}

	return false;

}

function known2(req, lang) {

	var search = req.toLowerCase();

	lang = lang || langs[defaultLang];

	var splits = search.split(""),
		length = splits.length;

	/* Unaccentement */

	var isKnownWithoutAccent = knownWithoutAccent(search);

	if (isKnownWithoutAccent) {

		return isKnownWithoutAccent;

	}

	/* Doublement */

	for (var i = 0; i < length; i++) {

		var word = search.substring(0, i + 1) + search.substring(i, i + 1) + search.substring(i + 1, length);

		if (known(word)) {

			return word;

		}
	
	}

	/* Transposement */

	for (var i = 0; i < length - 1; i++) {
	
		var word = search.substring(0, i) + splits[i + 1] + splits[i] + search.substring(i + 2, length);

		if (known(word)) {

			return word;

		}
	
	}

	/* Deletion */

	for (var i = 0; i < length; i++) {
	
		var word = search.substring(0, i) + search.substring(i + 1, length);

		if (known(word)) {

			return word;

		}
	
	}

	/* Replacement */

	for (var i = 0; i < length - 1; i++) {

		for (var a = 0, aLength = alphabet.length; a < aLength; a++) {

			var i_ = i !== length ? i_ = i + 1 : 0;
		
			var letter = alphabet[a];

			var word = search.substring(0, i_) + letter + search.substring(i_ + 1, length);

			if (known(word)) {

				return word;

			}
		
		}
	
	}

	/* Inseriont */

	for (var i = 0; i < length; i++) {

		for (var a = 0, aLength = alphabet.length; a < aLength; a++) {
		
			var letter = alphabet[a];

			var word = search.substring(0, i) + letter + search.substring(i, length);

			if (known(word)) {

				return word;

			}
		
		}
	
	}

	return false;

}

function didImean(search) {

	word = search.toLowerCase();

	var lang = langs[defaultLang];

	if (known(word)) {

		return search;

	}

	var isKnown2 = known2(search, lang);

	if (isKnown2) {

		return isKnown2;

	}

	return search;

}

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

/**
 * modules/remove-accents.js
 * 
 * Remove accent in string
 */

var accents = [

    /[\300-\306]/g, /[\340-\346]/g,
    /[\310-\313]/g, /[\350-\353]/g,
    /[\314-\317]/g, /[\354-\357]/g,
    /[\322-\330]/g, /[\362-\370]/g,
    /[\331-\334]/g, /[\371-\374]/g,
    /[\321]/g, /[\361]/g,
    /[\307]/g, /[\347]/g

],

noAccents = ["A", "a", "E", "e", "I", "i", "O", "o", "U", "u", "N", "n", "C", "c"];

function removeAccents(str){
     
    for(var i = 0; i < accents.length; i++) {

        str = str.replace(accents[i], noAccents[i]);

    }
     
    return str;
    
}

/**
 * actions/intro.js
 *
 * Introduction de la définition des Actions.
 */

var Actions = {};

Actions.initListeners = function(socket) {

/**
 * actions/did-i-mean/did-i-mean.js
 *
 * Did I mean function
 */

socket.on("did i mean", function(request, callback) {

	request.words.map(function(word, i) {

		request.words[i] = didImean(word);

	})
	
	callback(request.words);

});

/**
 * actions/outro.js
 *
 * Fermeture des Actions.
 */

};

/**
 * outro.js
 *
 * Vérification de la variable "server"
 */

if (typeof server === "object") {

	log("Server started", "good");

	for (var i = 0; i < server.loadListeners.length; i++) {
		
		server.loadListeners[i]();

	}

}

else {

	log("Erreur: La variable `server` est invalide.", "error");

}