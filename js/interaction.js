
game.fight = function fight(teammate, mainplayer) {

    me.state.set(me.state.Info, new game.InteractionScreen(teammate, mainplayer));
    me.state.change(me.state.Info);
   
}

game.InteractionScreen = me.ScreenObject.extend(
{
	"init" : function init(teammate, mainplayer)
	{
		this.teammate = teammate;
        this.mainplayer = mainplayer;
        this.parent(true);
        
        this.focusColor = "#f00";
        this.normalTextColor = "#000";

        this.usedWords = [];
        this.wordNumber = this.getRandomWord();
        this.word = "";
        this.sentence = game.categoryArray.get(this.wordNumber).exampleSentence;
        this.usermessage = "";
        this.winLoseMessage = "";
        this.relexMessage = "";
        this.wordLeft = game.categoryArray.get(this.wordNumber).random();
        this.wordRight = game.categoryArray.get(this.wordNumber).other(this.wordLeft);

        this.font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
        this.changeFocusColor(this.focusColor, this.normalTextColor, this.normalTextColor);
        this.focus = c.FOCUS_LEFT;

        this.heading = "Welche Schreibweise ist richtig?";
        this.levelTeammate = teammate.playerLevel;
        this.energypointsTeammate = teammate.getEnergypoints();

        //Array fuer Linien initialisieren
        this.energyTeammateArray = [47,85,221,85,221]; 
        this.myEnergyArray = [435,352,603,352,603];
        this.myKnowledgeArray = [435,382,435,382,603];

        this.newWidthLostMain(0);
        this.newWidthGain(0);
     
        // Render text to buffer canvas.
        this.canvas = document.createElement("canvas");

	},
   onResetEvent: function()
	{	
      // stuff to reset on state change
          me.game.viewport.fadeOut("black", 2000);
          this.y = 0;
          this.teammate.isInteracting = false;
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
    onDestroyEvent: function()
    { 
    	 
	
    },
   
    "update" : function update() {
        if (me.input.isKeyPressed("action") ) {
        	if (this.focus === c.FOCUS_CANCEL){
        		me.state.change(me.state.PLAY);

        	}
            if (this.focus === c.FOCUS_END){
                me.state.change(me.state.PLAY);

            }
        	if (this.focus === c.FOCUS_LEFT || this.focus === c.FOCUS_RIGHT ){
                var energylost = this.energylost();
                if ((this.wordLeft === game.categoryArray.get(this.wordNumber).correct && this.focus === c.FOCUS_LEFT ) ||
                    (this.wordRight === game.categoryArray.get(this.wordNumber).correct && this.focus === c.FOCUS_RIGHT ) ){
                    
                    this.sendStatisticPostRequest(game.categoryArray.getID(this.wordNumber),true);

                    this.word = "Stimmt, '"+ game.categoryArray.get(this.wordNumber).correct +"' ist richtig.";
                    this.wordNumber = this.getRandomWord();
                    this.usermessage = "Dein Mitspieler verliert "+ energylost +" Energiepunkte!";
                    this.newWidthLostTeammate(energylost);
                    this.sendPostRequest();

                    if (this.energypointsTeammate === 0) { 
                        var gainPoints = this.getMoreKnowledge();
                        game.score = game.score + gainPoints;
                        this.newWidthGain(gainPoints);
                        this.winLoseMessage = "Gut gemacht, du gewinnst "+ gainPoints +" Wissenspunkte!";
                        this.end();
                        this.sendPostRequest();
                        return;
                    }
                
                }else { 
                    this.sendStatisticPostRequest(game.categoryArray.getID(this.wordNumber),false);
                    this.word = "Falsch, das richtige Wort ist: '"+ game.categoryArray.get(this.wordNumber).correct + "'";
                    this.wordNumber = this.getRandomWord();
                    this.usermessage = "Du verlierst "+ energylost +" Energiepunkte!";
                    this.newWidthLostMain(energylost);
                    this.sendPostRequest();
                    if (game.energypoints === 0){
                        this.winLoseMessage = "Oh nein, du hast leider verloren!";
                        this.relexMessage = "Ruh dich aus, damit du wieder neue Energie hast.";
                        this.end();
                        return;
                    }
                }
                
        		this.wordLeft = game.categoryArray.get(this.wordNumber).random();
        		this.wordRight = game.categoryArray.get(this.wordNumber).other(this.wordLeft);
                this.sentence = game.categoryArray.get(this.wordNumber).exampleSentence;
        	}
            


        } else if (me.input.isKeyPressed("left") ) {
            if (this.focus != c.FOCUS_END){
                this.changeFocusColor(this.focusColor, this.normalTextColor, this.normalTextColor);
                this.focus = c.FOCUS_LEFT;
            }
        } else if (me.input.isKeyPressed("right") ) {
            if (this.focus == c.FOCUS_LEFT && this.focus != c.FOCUS_END){
                this.changeFocusColor(this.normalTextColor, this.focusColor,this.normalTextColor);
                this.focus = c.FOCUS_RIGHT;
            }
        } else if (me.input.isKeyPressed("down") ) {
            this.changeFocusColor(this.normalTextColor, this.normalTextColor,this.focusColor);
            if (this.focus != c.FOCUS_END){
                this.focus = c.FOCUS_CANCEL;
            }
        } else if(me.input.isKeyPressed("up") ){
            if (this.focus == c.FOCUS_CANCEL && this.focus != c.FOCUS_END){
                this.changeFocusColor(this.normalTextColor, this.focusColor, this.normalTextColor);
                this.focus = c.FOCUS_RIGHT;
            }
        }
        return this.parent() || (this.fader !== -1);
    },

    "draw" : function draw(context) {
    	var background = game.getImage("fight");
    	this.context = context;
        context.drawImage(
            background,
            0, ~~this.y,
            c.WIDTH, c.HEIGHT,
            0, 0,
            c.WIDTH, c.HEIGHT
        );
        var player2 = game.getImage(this.teammate.interactionImage);
        context.drawImage(
            player2,
           435,30
        );   
        var mainplayerimage = game.getImage(this.mainplayer.interactionImage);
        context.drawImage(
            mainplayerimage,
           45, 220
        );  

        this.drawLine(this.energyTeammateArray[0],this.energyTeammateArray[1], 
            this.energyTeammateArray[2], this.energyTeammateArray[3], '#01DFA5');
        this.drawLine(this.myEnergyArray[0],this.myEnergyArray[1], 
            this.myEnergyArray[2], this.myEnergyArray[3], '#01DFA5');
        this.drawLine(this.myKnowledgeArray[0],this.myKnowledgeArray[1], 
            this.myKnowledgeArray[2], this.myKnowledgeArray[3],'#0080FF');
        
        	
        this.drawWords(this.teammate.username , 45, 50, this.font);
        this.drawWords("lv:" + this.levelTeammate,535, 100, this.font);
        this.drawWords(this.energypointsTeammate + "/" + this.teammate.getEnergypoints(),100, 80, this.font);
		this.drawWords(game.username , 435, 320,this.font);
        this.drawWords("lv:" + game.level , 150, 300,this.font);
        this.drawWords(game.energypoints + "/" + this.mainplayer.getEnergypoints(), 490, 348,this.font);
        this.drawWords(game.knowledgePoints + "/" + this.mainplayer.getMaxKnowledge(), 490, 378,this.font);
		this.drawWords(this.word, 100, 150, this.font);
        this.drawWords(this.usermessage, 100, 180, this.font);
        this.drawWords(this.sentence, 100, 210, this.font);
        this.drawWords(this.winLoseMessage, 150, 240, this.font);
        this.drawWords(this.relexMessage, 150, 270, this.font);
		this.drawWords(this.heading, 50, 340,this.font); 
        this.drawWords(this.wordLeft, 100, 380, this.fontWordLeft);
        this.drawWords(this.wordRight , 250, 380, this.fontWordRight);
        this.drawWords("Abbrechen", 270, 430,this.fontAbbrechen); 

        
    },
   
    "changeFocusColor" : function changeFocusColor(colorLeft,colorRight,colorAbbrechen){
            this.fontWordRight = new me.Font("Monaco, Courier New", 16, colorRight);
            this.fontWordLeft = new me.Font("Monaco, Courier New", 16, colorLeft);
            this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, colorAbbrechen);
    },
    "drawWords" : function drawWords(message, width, height, font) {
    	
        var w = Math.min(this.font.measureText(this.context, message).width, c.WIDTH);    
        this.context.save();
		font.draw(this.context, message, width, height);    
        this.context.restore();

    },   

    "drawLine" : function drawLine(fromX, fromY, toX, toY, color) {
        this.context.save;
        this.context.beginPath();
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.lineWidth = 6;
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.restore;

    },

    "energylost" : function energylost(){
        return (Math.abs((game.level * 2) + (Math.pow(-1,Math.round(Math.random())) * Math.round(Math.random() * 4)))) + 1;
    },
 
     "getMoreKnowledge" : function getMoreKnowledge(){
        return (Math.abs((this.teammate.playerLevel * 2) + (Math.pow(-1,Math.round(Math.random())) * Math.round(Math.random() * 4)))) + 1;
    },
   
   "newWidthLostTeammate" : function newWidthLostTeammate(energylost){
        if (energylost < this.energypointsTeammate ){
            this.energypointsTeammate = this.energypointsTeammate - energylost;
            var newWidth = (this.energypointsTeammate/this.teammate.getEnergypoints()) * 
                 (this.energyTeammateArray[4] - this.energyTeammateArray[0]);
            this.energyTeammateArray[2] = this.energyTeammateArray[0] + newWidth;
        } else{
             this.energypointsTeammate = 0;
             this.energyTeammateArray[2] = this.energyTeammateArray[0];
        } 
        
        
   },
    
    "newWidthLostMain" : function newWidthLostMain(energylost){
        if (energylost < game.energypoints){
            game.energypoints = game.energypoints - energylost;
            var newWidth = (game.energypoints/this.mainplayer.getEnergypoints())* (this.myEnergyArray[4] - this.myEnergyArray[0]);
            this.myEnergyArray[2] = this.myEnergyArray[0] + newWidth;
        } else{
             game.energypoints = 0;
             this.myEnergyArray[2] = this.myEnergyArray[0];
        } 
        
        
   },

    "newWidthGain" : function newWidthGain(gain){
    
        if (game.knowledgePoints + gain > this.mainplayer.getMaxKnowledge()){
            game.knowledgePoints = game.knowledgePoints + gain;
            this.levelUp();
            game.energypoints = this.mainplayer.getEnergypoints();
            var newWidth = (game.energypoints/this.mainplayer.getEnergypoints())* (this.myEnergyArray[4] - this.myEnergyArray[0]);
            this.myEnergyArray[2] = this.myEnergyArray[0] + newWidth;
        } else {
            game.knowledgePoints = game.knowledgePoints + gain;
        }
             
        var newWidth = (game.knowledgePoints/this.mainplayer.getMaxKnowledge()) * (this.myKnowledgeArray[4] - this.myKnowledgeArray[0]);
        this.myKnowledgeArray[2] = this.myKnowledgeArray[0] + newWidth;
        
   },

    "levelUp" : function levelUp(){
        game.knowledgePoints =  game.knowledgePoints - this.mainplayer.getMaxKnowledge();
        game.level++;
        if (game.knowledgePoints > this.mainplayer.getMaxKnowledge()) {
            return this.levelUp();
        };


    },
  
   "getRandomWord" : function getRandomWord(){
        if(game.categoryArray.arraySize() === this.usedWords.length){
            this.usedWords = [];
        }
        var number = Math.round(Math.random() * (game.categoryArray.arraySize() - 1));
        for (var i in this.usedWords){
            if (number == this.usedWords[i]) {return this.getRandomWord()};

        }
        this.usedWords.push(number);
        return number;
   },

   "end" : function end(){
        this.wordLeft = "";
        this.wordRight = "";
        this.sentence = "";
        this.focus = c.FOCUS_END;
   },

    "sendPostRequest" : function sendPostRequest(){
        var now = new Date();
        game.playtime = game.playtime + (Math.round(now.getTime()/1000) - game.startTime);
        game.startTime = Math.round(now.getTime()/1000);
        data = { "stats": {"level": game.level, "duration" : game.playtime, 
        "knowledge_points": game.knowledgePoints, "energy_points": game.energypoints, "score": game.score}};
        jQuery.post( "./elli/update_stats" ,data );

   },

   "sendStatisticPostRequest" : function sendStatisticPostRequest(id, correct){
        data = { "word_stats": {"word_id": id, "correct" : correct }}
        jQuery.post( "./elli/update_word_statistics" ,data )
   }

});