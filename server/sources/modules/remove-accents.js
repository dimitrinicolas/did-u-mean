
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