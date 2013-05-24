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

function WordsArray(category){
	this.array = [];
	this.category = category;

	this.push = function (value){
		this.array.push(value);	
	};

	this.pop = function (){
		this.array.pop();
	};

	this.get = function (i){
		return this.array[i];
	}
};

game.categoryArray = function(){
	this.array = [];
	this.selectedCategory = -1; // -1 keine Kategorie ausgewaehlt, Worte aus allen Kategorien

	this.MaxSize = function(){
		this.maxSize = 0;
		for (var i in this.array) {
         	 	
        };
	};

	this.push = function (value){
		this.array.push(value);	
	};

	this.get = function (i){
		if (this.selectedCategory < 0){
			return 
		}
	};

	this.arraySize = function (){
		if (this.selectedCategory < 0){
			return this.maxSize;
		}
		return this.array[this.selectedCategory].length;
	};


};

game.username = "";
game.words = [];
game.playtime = 0;
game.energypoints = 100;
game.level = 1;
game.knowledgePoints = 0;
game.score = 0;

game.loadFromDatabase = function loadFromDatabase(){
	this.database_resources["categories"].forEach(function forEach(value) {
         	console.log(value.elli_rpg_words[0]);
         	var newWordsArray = new WordsArray(value.name);

         	for (var i in value.elli_rpg_words) {
         	 	var newWord = new word(value.elli_rpg_words[i].correct, value.elli_rpg_words[i].wrong, 
         	 		value.elli_rpg_words[i].example);
           		newWordsArray.push(newWord);
         	 }; 
 			game.categoryArray.push(newWordsArray);
    });
    game.categoryArray.MaxSize();
    game.username = this.database_resources.user.username;
    game.playtime = this.database_resources.user.playduration;
    game.energypoints = this.database_resources.user.userEnergyPoints;
    game.level = this.database_resources.user.userLevel;
    game.knowledgePoints = this.database_resources.user.userKnowledgePoints;

}



