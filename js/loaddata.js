function word (correct, wrong){
	this.correct = correct;
	this.wrong = wrong;

	this.random = function (){
		var randomNum = Math.round(Math.random() * 2);
		if (randomNum === 1){
			return this.correct;
		}
		return this.wrong;
	},

	this.other = function(word){
		if (word == this.correct) return this.wrong;
		return this.correct;
	}
};
game.username = "";
game.words = [];
game.score = 0;
game.playtime = 0;
game.loadFromDatabase = function loadFromDatabase(){
	this.database_resources["words"].forEach(function forEach(value) {
           var newWord = new word(value[0], value[1]);
           game.words.push(newWord);
    });
    game.username = this.database_resources.user.username;
    game.score = this.database_resources.user.userscore;
    game.playtime = this.database_resources.user.playduration;

}



