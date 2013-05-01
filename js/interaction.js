
game.fight = function fight(teammate) {
    var background = game.getImage("fight");
    var font = new me.Font("Tahoma", 18, "#000000");
    
    me.state.set(me.state.Info, new game.InfoScreen(20));
    me.state.change(me.state.Info);
   //  var fight_box = new game.FightObject();
     
    //me.game.add(fight_box);
    //me.game.sort.defer(game.sort);
}

game.InfoScreen = me.ScreenObject.extend(
{
	"init" : function init()
	{

        this.parent(true);
        this.font = new me.Font("Monaco, Courier New", 13, "#aaa");

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
    }

});