

game.MenuScreen = me.ScreenObject.extend(
	{
	"init" : function init(mainplayer)
	{
		this.menuItemArray = new MenuItemArray();
        this.mainplayer = mainplayer;
        this.parent(true);
        
        this.focusColor = "#f00";
        this.normalTextColor = "#000";

   
        this.font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
        this.focus = "";

        //Menuliste fuellen
        this.menuItemArray.push([new menuItem("Test",0), new menuItem("Schultasche",1), 
        	new menuItem("Spiel speichern",2), 
        	new menuItem("Highscore",3), new menuItem("Einstellungen",4), new menuItem("Menu verlassen",5), ]);

        // Render text to buffer canvas.
        this.canvas = document.createElement("canvas");

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


        } else if (me.input.isKeyPressed("left") ) {
        
        } else if (me.input.isKeyPressed("right") ) {
         
        } else if (me.input.isKeyPressed("down") ) {
          
        } else if(me.input.isKeyPressed("up") ){
          
        }
        return this.parent() || (this.fader !== -1);
    },

    "draw" : function draw(context) {
    	var background = game.getImage("menu");
    	this.context = context;
        context.drawImage(
            background,
            0, ~~this.y,
            c.WIDTH, c.HEIGHT,
            0, 0,
            c.WIDTH, c.HEIGHT
        );
 		
 		for (var i in this.menuItemArray.array) {
 			this.drawWords(this.menuItemArray.array[i].name, 50, (i * 50), this.font);
 		};
 		
    },
   
    "changeFocusColor" : function changeFocusColor(number,color){
    	for (var i = Things.length - 1; i >= 0; i--) {
    		Things[i]
    	};
            this.fontWordRight = new me.Font("Monaco, Courier New", 16, colorRight);
            
    },
    "drawWords" : function drawWords(message, width, height, font) {
    	
        var w = Math.min(this.font.measureText(this.context, message).width, c.WIDTH);    
        this.context.save();
		font.draw(this.context, message, width, height);    
        this.context.restore();

    },   


});

 function MenuItemArray(){
	this.array = [];
	this.push = function (value){
		for (var i in value) {
			this.array.push(value[i]);
		};
		
	};

}

function menuItem (name, number){
	this.name = name;
	this.number = number;
	
	this.menuAction = function (){
		// do something
	};

	this.getPosition = function(){
		return 20;
	};
};

