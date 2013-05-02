function word (correct, wrong){
	this.correct = correct;
	this.wrong = wrong;

	this.random = function (){
		return this.correct;
	}
};
game.username = "Elli";
var word1 = new word("kenne", "kene");
var word2 = new word("lesen", "lessen");
var word3 = new word("Schloss", "Schlos");
var word4 = new word("Schiff", "Schif");
var word5 = new word("Tipp", "Tip");
var word6 = new word("Ebbe", "Ebe");
var word7 = new word("einschlafen", "einschlaffen");
var word8 = new word("scharf", "scharff");
var word9 = new word("Keks", "Keeks");
var word10 = new word("Mond", "Moond");
game.words = [word1,word2,word3, word4,word5,word6,word7, word8, word9, word10];
game.score = 0;
game.playtime = 0;


