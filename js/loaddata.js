function word (correct, wrong, exampleSentence, id){
	this.correct = correct;
	this.wrong = wrong;
	this.exampleSentence = exampleSentence;
	this.id = id;

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

	this.getID = function (i){
		return this.array[i].id;
	}
};

 function CategoryArray (){
	this.array = [];
	this.uncategorizedArray = [];
	this.selectedCategory = -1; // -1 keine Kategorie ausgewaehlt, Worte aus allen Kategorien

	this.push = function (value){
		this.array.push(value);	
	};

	this.pushWithoutCategory = function (value){
		this.uncategorizedArray.push(value);	
	};

	this.get = function (i){
		if (this.selectedCategory < 0){
			return this.uncategorizedArray[i];
		}
		return this.array[this.selectedCategory].get(i);
	};

	this.getID = function (i){
		if (this.selectedCategory < 0){
			return this.uncategorizedArray[i].id;
		}
		return this.array[this.selectedCategory].getID(i);
	}

	this.arraySize = function (){
		if (this.selectedCategory < 0){
			return this.uncategorizedArray.length;
		}
		return this.array[this.selectedCategory].array.length;
	};

	this.getSelectionID = function (name){
		for (var i = 0; i <= this.array.length - 1; i++ ) {
			if (this.array[i].category == name){
				return i;
			}
		};
		return -1;

	};

	this.getCategory = function (i){
		return this.array[i].category;
	};

};

game.categoryArray = new CategoryArray();
game.username = "";
game.playtime = 0;
game.energypoints = 100;
game.level = 1;
game.knowledgePoints = 0;
game.score = 0;

game.loadFromDatabase = function loadFromDatabase(){
	this.database_resources["categories"].forEach(function forEach(value) {
         	var newWordsArray = new WordsArray(value.name);
         	for (var i = 0; i <= value.elli_rpg_words.length - 1; i++ ) {
         	 	var newWord = new word(value.elli_rpg_words[i].correct, value.elli_rpg_words[i].wrong, 
         	 		value.elli_rpg_words[i].example, value.elli_rpg_words[i].id);
           		newWordsArray.push(newWord);
           		game.categoryArray.pushWithoutCategory(newWord);
         	 }; 
 			game.categoryArray.push(newWordsArray);
    });
    game.username = this.database_resources.user.username;
    game.playtime = this.database_resources.user.playduration;
    game.energypoints = this.database_resources.user.userEnergyPoints;
    game.level = this.database_resources.user.userLevel;
    game.knowledgePoints = this.database_resources.user.userKnowledgePoints;
    game.score = this.database_resources.user.userscore;
    game.money = this.database_resources.user.money;

}



