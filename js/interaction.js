
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
        this.focus = "left";
        this.focusColor = "#f00";
        this.normalTextColor = "#000";
        this.wordCounter = 0;
        this.word = game.words[this.wordCounter].correct;
        this.wordLeft = game.words[this.wordCounter].correct;
        this.wordRight = game.words[this.wordCounter].wrong;
        this.font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
        this.changeFocusColor(this.focusColor, this.normalTextColor, this.normalTextColor);
        // Render text to buffer canvas.
        this.canvas = document.createElement("canvas");
        this.buffer = this.canvas.getContext("2d");

    	var h = 1000;
        var x = ~~((c.WIDTH ) / 2);
        var y = 0;


        
        this.buffer.fillStyle = "#222";
        this.buffer.fillRect(0, 0, c.WIDTH, h);
        line = "test";
		this.font.draw(this.buffer, line, x, y);

	},
   onResetEvent: function()
	{	
      // stuff to reset on state change
          me.game.viewport.fadeOut("black", 2000);
          this.y = 0;
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
        	if (this.focus === "left"){
        		this.wordCounter++;
        		this.word = "richtig naechstes Wort:" + game.words[this.wordCounter].random();
        		this.wordLeft = game.words[this.wordCounter].random();
        		this.wordRight = game.words[this.wordCounter].other(this.wordLeft);
        	}
        	if (this.focus === "right"){
        		this.wordCounter++;

        		this.word = "falsch naechstes Wort:" + game.words[this.wordCounter].random();
        		this.wordLeft = game.words[this.wordCounter].random();
        		this.wordRight = game.words[this.wordCounter].other(this.wordLeft);
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

        context.save;
        context.beginPath();
        context.moveTo(47, 82);
        context.lineTo(221, 82);
        context.lineWidth = 8;
        context.strokeStyle = '#01DFA5';
        context.stroke();
        context.restore;
		
        this.drawWords(context, this.teammate.username , 45, 50, this.font);
		this.drawWords(context, game.username , 435, 320,this.font);
		this.drawWords(context, this.word, 200, 200, this.font);
		this.drawWords(context,"Welche Schreibweise ist richtig?", 50, 340,this.font); 
        this.drawWords(context, this.wordLeft, 100, 380, this.fontWordLeft);
        this.drawWords(context, this.wordRight , 250, 380, this.fontWordRight);
        this.drawWords(context,"Abbrechen", 270, 430,this.fontAbbrechen); 

        
    },
   
    "changeFocusColor" : function changeFocusColor(colorLeft,colorRight,colorAbbrechen){
            this.fontWordRight = new me.Font("Monaco, Courier New", 16, colorRight);
            this.fontWordLeft = new me.Font("Monaco, Courier New", 16, colorLeft);
            this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, colorAbbrechen);
    },
    "drawWords" : function drawWords(context, message, width, height, font) {
    	
        var w = Math.min(this.font.measureText(context, message).width, c.WIDTH);    
        context.save();
		font.draw(context, message, width, height);    
        context.restore();

    }
   

});