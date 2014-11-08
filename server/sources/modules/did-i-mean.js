
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