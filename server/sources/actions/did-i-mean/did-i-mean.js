
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