
game.fight = function fight(teammate) {
    var background = game.getImage("fight");
    var font = new me.Font("Tahoma", 18, "#000000");

    
    me.state.set(me.state.Info, new game.InteractionScreen(teammate));
    me.state.change(me.state.Info);
   //  var fight_box = new game.FightObject();
     
    //me.game.add(fight_box);
    //me.game.sort.defer(game.sort);
}

game.InteractionScreen = me.ScreenObject.extend(
{
	"init" : function init(teammate)
	{
		this.teammate = teammate;
        this.parent(true);
        
        this.focusColor = "#f00";
        this.normalTextColor = "#000";

        this.usedWords = [];
        this.wordNumber = this.getRandomWord();
        this.word = "";
        this.sentence = game.words[this.wordNumber].exampleSentence;
        this.usermessage = "";
        this.wordLeft = game.words[this.wordNumber].random();
        this.wordRight = game.words[this.wordNumber].other(this.wordLeft);

        this.font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
        this.changeFocusColor(this.focusColor, this.normalTextColor, this.normalTextColor);
        this.focus = "left";

        this.heading = "Welche Schreibweise ist richtig?";
        this.levelTeammate = teammate.playerLevel;
        this.energypointsTeammate = teammate.getEnergypoints();
        this.myLevel = game.level;
        this.myEnergypoints = game.energypoints;
        this.myknowledgePoints = game.knowledgePoints;

        this.energyTeammateArray = [47,85,221,85,221]; 
        this.myEnergyArray = [435,352,603,352,603];
        this.myKnowledgeArray = [435,382,603,382,603];
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
        	if (this.focus === "abbrechen"){
        		me.state.change(me.state.PLAY);

        	}
        	if (this.focus === "left" || this.focus === "right" ){
                var energylost = this.energylost();
                if ((this.wordLeft === game.words[this.wordNumber].correct && this.focus === "left" ) ||
                    (this.wordRight === game.words[this.wordNumber].correct && this.focus === "right" ) ){

                    this.word = "Stimmt, '"+ game.words[this.wordNumber].correct +"' ist richtig.";
                    this.wordNumber = this.getRandomWord();
                    this.usermessage = "Dein Mitspieler verliert "+ energylost +" Energiepunkte!";
                    this.newWidthTeammate(energylost);
                    this.drawLine(this.energyTeammateArray[4],this.energyTeammateArray[3],
                        this.energyTeammateArray[2], this.energyTeammateArray[3], '#000000');
                }else { 
                    this.word = "Falsch, das richtige Wort ist: '"+ game.words[this.wordNumber].correct + "'";
                    this.wordNumber = this.getRandomWord();
                    this.usermessage = "Du verlierst "+ energylost +" Energiepunkte!";
                    this.newWidthMainplayer(energylost);
                    this.drawLine(this.myEnergyArray[4],this.myEnergyArray[3],
                        this.myEnergyArray[2], this.myEnergyArray[3], '#000000');
                }
                
        		this.wordLeft = game.words[this.wordNumber].random();
        		this.wordRight = game.words[this.wordNumber].other(this.wordLeft);
                this.sentence = game.words[this.wordNumber].exampleSentence;
        	}
            


        } else if (me.input.isKeyPressed("left") ) {
            this.changeFocusColor(this.focusColor, this.normalTextColor, this.normalTextColor);
            this.focus = "left";
        } else if (me.input.isKeyPressed("right") ) {
            if (this.focus == "left"){
                this.changeFocusColor(this.normalTextColor, this.focusColor,this.normalTextColor);
                this.focus = "right";
            }
        } else if (me.input.isKeyPressed("down") ) {
            this.changeFocusColor(this.normalTextColor, this.normalTextColor,this.focusColor);
            this.focus = "abbrechen";
        } else if(me.input.isKeyPressed("up") ){
            if (this.focus == "abbrechen"){
                this.changeFocusColor(this.normalTextColor, this.focusColor, this.normalTextColor);
                this.focus = "right";
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
        var mainplayer = game.getImage(c.INTERIMAGE);
        context.drawImage(
            mainplayer,
           45, 220
        );  

        this.drawLine(this.energyTeammateArray[0],this.energyTeammateArray[1], 
            this.energyTeammateArray[2], this.energyTeammateArray[3], '#01DFA5');
        this.drawLine(this.myEnergyArray[0],this.myEnergyArray[1], 
            this.myEnergyArray[2], this.myEnergyArray[3], '#01DFA5');
        this.drawLine(this.myKnowledgeArray[0],this.myKnowledgeArray[1], 
            this.myKnowledgeArray[2], this.myKnowledgeArray[3],'#0080FF');
        
        	
        this.drawWords(this.teammate.username , 45, 50, this.font);
        this.drawWords("lv:" + this.levelTeammate,170, 50, this.font);
        this.drawWords(this.energypointsTeammate + "/" + this.teammate.getEnergypoints(),100, 80, this.font);
		this.drawWords(game.username , 435, 320,this.font);
        this.drawWords("lv:" + this.myLevel , 560, 320,this.font);
        this.drawWords(this.myEnergypoints + "/" + game.energypoints, 490, 348,this.font);
        this.drawWords(this.myknowledgePoints, 490, 378,this.font);
		this.drawWords(this.word, 100, 150, this.font);
        this.drawWords(this.usermessage, 100, 180, this.font);
        this.drawWords(this.sentence, 100, 210, this.font);
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
        return Math.abs((game.level * 2) + (Math.pow(-1,Math.round(Math.random())) * Math.round(Math.random() * 4)));
    },

     "getMoreKnowledge" : function getMoreKnowledge(){
        return (Math.abs((this.teammate.playerLevel * 2) + (Math.pow(-1,Math.round(Math.random())) * Math.round(Math.random() * 4)))) + 1;
    },
   
   "newWidthTeammate" : function newWidthTeammate(energylost){
        if (energylost < this.energypointsTeammate){
            this.energypointsTeammate = this.energypointsTeammate - energylost;
            var newWidth = (this.energypointsTeammate/this.teammate.getEnergypoints())* (this.energyTeammateArray[4] - this.energyTeammateArray[0]);
            this.energyTeammateArray[2] = this.energyTeammateArray[0] + newWidth;
        } else{
             this.energypointsTeammate = 0;
             this.energyTeammateArray[2] = this.energyTeammateArray[0];
        } 
        
   },
    "newWidthMainplayer" : function newWidthMainplayer(energylost){
        if (energylost < this.myEnergypoints){
            this.myEnergypoints = this.myEnergypoints - energylost;
            var newWidth = (this.myEnergypoints/game.energypoints)* (this.myEnergyArray[4] - this.myEnergyArray[0]);
            this.myEnergyArray[2] = this.myEnergyArray[0] + newWidth;
        } else{
             this.myEnergypoints = 0;
             this.myEnergyArray[2] = this.myEnergyArray[0];
        } 
        
   },
   "getRandomWord" : function getRandomWord(){
        if(game.words.length === this.usedWords.length){
            this.usedWords = [];
        }
        var number = Math.round(Math.random() * (game.words.length-1));
        for (var i in this.usedWords){
            if (number == this.usedWords[i]) {return this.getRandomWord()};

        }
        this.usedWords.push(number);
        console.log(this.usedWords); 
        return number;
   }

});