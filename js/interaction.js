
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
        this.font = new me.Font("Monaco, Courier New", 16, "#000");

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
          me.game.viewport.fadeOut("black", 3000);
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
            this.to_x.stop();
            this.to_y.stop();
            me.game.viewport.fadeIn("black", 1000, function () {
                me.state.change(c.STATE_INTRO);
            });
        }
        return this.parent() || (this.fader !== -1);
    },

    "draw" : function draw(context) {
    	var background = game.getImage("fight");

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
		this.drawWords(context, this.teammate.username , 45, 50);
		this.drawWords(context, game.username , 435, 320);
		this.drawWords(context, game.words , 200, 200);
         
        
    },

    "drawWords" : function drawWords(context, message, width, height) {
    	
        var w = Math.min(this.font.measureText(context, message).width, c.WIDTH);    
        context.save();
		this.font.draw(context, message, width, height);    
        context.restore();

    }

});