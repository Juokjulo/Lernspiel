
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
        this.focus = "";
        this.word = game.words[0].correct;
        this.font = new me.Font("Monaco, Courier New", 16, "#000");
        this.fontWordLeft = new me.Font("Monaco, Courier New", 16, "#000");
        this.fontWordRight = new me.Font("Monaco, Courier New", 16, "#000");
        this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, "#000");
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
        		this.word = "richtig";
        	}
        	if (this.focus === "right"){
        		this.word = "falsch";
        	}
            
        }
        if (me.input.isKeyPressed("left") ) {
           this.fontWordLeft = new me.Font("Monaco, Courier New", 16, "#f00");
           this.fontWordRight = new me.Font("Monaco, Courier New", 16, "#000");
           this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, "#000");
           this.focus = "left";
        }
        if (me.input.isKeyPressed("right") ) {
           this.fontWordRight = new me.Font("Monaco, Courier New", 16, "#f00");
           this.fontWordLeft = new me.Font("Monaco, Courier New", 16, "#000");
           this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, "#000");
           this.focus = "right"
        }
        if (me.input.isKeyPressed("down") ) {
           this.fontWordRight = new me.Font("Monaco, Courier New", 16, "#000");
           this.fontWordLeft = new me.Font("Monaco, Courier New", 16, "#000");
           this.fontAbbrechen = new me.Font("Monaco, Courier New", 16, "#f00");
           this.focus = "abbrechen";
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
        
		this.drawWords(context, this.teammate.username , 45, 50, this.font);
		this.drawWords(context, game.username , 435, 320,this.font);
		this.drawWords(context, this.word, 200, 200, this.font);
        this.drawWords(context, game.words[0].correct , 100, 400, this.fontWordLeft);
        this.drawWords(context, game.words[0].wrong , 250, 400, this.fontWordRight);
        this.drawWords(context,"abbrechen", 200, 430,this.fontAbbrechen); 

        
    },

    "drawWords" : function drawWords(context, message, width, height, font) {
    	
        var w = Math.min(this.font.measureText(context, message).width, c.WIDTH);    
        context.save();
		font.draw(context, message, width, height);    
        context.restore();

    }
   

});