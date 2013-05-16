
game.PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
        // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP,  "up");
    me.input.bindKey(me.input.KEY.DOWN, "down");
          me.levelDirector.loadLevel("KlassenzimmerStart");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
    onDestroyEvent: function()
    {
	
    },
   
    "update" : function update() {
        if (me.input.isKeyPressed("action") ) {
          
        }
    },

    "draw" : function draw(context) {
       
    }

});


