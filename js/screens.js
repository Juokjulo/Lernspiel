
game.PlayScreen = me.ScreenObject.extend(
{

   init: function()
   {
   
   }, 
   
   onResetEvent: function()
	{	
      // stuff to reset on state change
        
     me.levelDirector.loadLevel("KlassenzimmerStart", false);
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


