function word (correct, wrong, exampleSentence){
	this.correct = correct;
	this.wrong = wrong;
	this.exampleSentence = exampleSentence;

	this.random = function (){
		var randomNum = Math.round(Math.random());
		if (randomNum === 1){
			return this.correct;
		}
		return this.wrong;
	};

	this.other = function(word){
		if (word == this.correct) return this.wrong;
		return this.correct;
	}
};

game.username = "";
game.words = [];
game.score = 0;
game.playtime = 0;
game.energypoints = 100;
game.level = 1;
game.knowledgePoints = 0;

game.loadFromDatabase = function loadFromDatabase(){
	this.database_resources["words"].forEach(function forEach(value) {
           var newWord = new word(value[0], value[1], value[2]);
           game.words.push(newWord);
    });
    game.username = this.database_resources.user.username;
    game.score = this.database_resources.user.userscore;
    game.playtime = this.database_resources.user.playduration;
    game.energypoints = this.database_resources.user.userEnergyPoints;
    game.level = this.database_resources.user.userLevel;
    game.knowledgePoints = this.database_resources.user.userKnowledgePoints

}



