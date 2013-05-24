

game.MenuScreen = me.ScreenObject.extend(
	{
	"init" : function init(mainplayer)
	{
		this.menuItemArray = new MenuItemArray();
        this.mainplayer = mainplayer;
        this.parent(true);
        
        this.focusColor = "#f00";
        this.normalTextColor = "#000";

        //Menuliste fuellen
        this.menuItemArray.push([new menuItem("Profil",0), new menuItem("Schultasche",1), 
        	new menuItem("Spiel speichern",2), 
        	new menuItem("Highscore",3), new menuItem("Einstellungen",4), new menuItem("Menu verlassen",5), ]);

        this.focus = 0;
        this.changeFocus(0);

        me.input.bindKey(me.input.KEY.LEFT,  "left", true);
		me.input.bindKey(me.input.KEY.RIGHT, "right", true);
		me.input.bindKey(me.input.KEY.UP,  "up", true);
		me.input.bindKey(me.input.KEY.DOWN, "down", true);

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
        	switch(this.focus)
			{
				case 0:
				  //this.profil();
				  break;
				case 1:
				 this.bag();
				  break;
				case 2:
				  
				  break;
				case 3:
				  
				  break;
				case 4:
				  this.myoptions();
				  break;
				case 5:
				  this.ende();
				  break;
				
			}

        } else if (me.input.isKeyPressed("left") || me.input.isKeyPressed("up") ) {
        	this.focus--;
        	this.changeFocus(this.focus);
        } else if (me.input.isKeyPressed("right") || me.input.isKeyPressed("down") ) {
     		this.focus++;
     		this.changeFocus(this.focus);
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
 			this.drawWords(this.menuItemArray.getName(i), 70, (i * 50) + 100, this.menuItemArray.getFont(i));
 		};
 		
    },
   
    "changeFocus" : function changeFocus(number){
    	if (number < 0){
    		this.focus = 0;
    		number = 0;
    	} 
    	if (number > this.menuItemArray.array.length - 1 ) {
    		this.focus = this.menuItemArray.array.length - 1 ;
    		number = this.focus;
    	};

    	for (var i in this.menuItemArray.array) {
    		 this.menuItemArray.array[i].font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
    	};
    	font = new me.Font("Monaco, Courier New", 16, this.focusColor);
        this.menuItemArray.setFont(font, number);
            
    },
    "drawWords" : function drawWords(message, width, height, font) {
    	
        var w = Math.min(font.measureText(this.context, message).width, c.WIDTH);    
        this.context.save();
		font.draw(this.context, message, width, height);    
        this.context.restore();

    },   

    "ende" : function ende(){
    	me.state.change(me.state.PLAY);
    },

    "save" : function save(){

    },
     "myoptions" : function myoptions(){

    },
     "bag" : function bag(){

    },

     "showHighscore" : function showHighscore(){

    },

    "profil" : function profil(){
    	this.context.save;
    	var background = game.getImage("profil");
        this.context.drawImage(
            background,
            45, 220
        );
        var playerFace = game.getImage(this.mainplayer.interactionImage);
        this.context.drawImage(
            playerFace,
            45, 220
        );
        this.context.restore;
    },


});

 function MenuItemArray(){
	this.array = [];
	this.push = function (value){
		for (var i in value) {
			this.array.push(value[i]);
		};
		
	};

	this.setFont = function (font, id){
		this.array[id].setFont(font);
	};

	this.getName = function (id){
		return this.array[id].name;
	};

	this.getFont = function (id){
		return this.array[id].font;
	};


}

function menuItem (name, number){
	this.name = name;
	this.number = number;
	this.font = new me.Font("Monaco, Courier New", 16, "#000");
	

	this.getPosition = function(){
		return 20;
	};

	this.setFont = function(font){
		this.font = font;
	};
};

