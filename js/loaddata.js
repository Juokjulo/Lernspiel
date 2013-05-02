 function word (correct, wrong){
	this.correct = correct;
	this.wrong = wrong;

};
game.username = "Elli";
var word1 = new word("kenne", "kene");
var word2 = new word("lesen", "lessen");
game.words = [word1,word2];
game.score = 0;
game.playtime = 0;


