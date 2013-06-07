
MenuScreen = me.ScreenObject.extend(
	{
	init : function(mainplayer)
	{
        this.mainplayer = mainplayer;
        this.parent(true);
        
        this.focusColor = "#f00";
        this.normalTextColor = "#000";

        this.focus = 0;
        this.changeFocus(0);

       

        // Render text to buffer canvas.
        this.canvas = document.createElement("canvas");

	},
   onResetEvent: function()
	{	
      // stuff to reset on state change
        me.input.bindKey(me.input.KEY.LEFT,  "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.UP,  "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.game.viewport.fadeOut("black", 2000);
        this.y = 0;
          
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
    onDestroyEvent: function()
    { 
    	me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
	
    },
   
    "update" : function update() {
        if (me.input.isKeyPressed("action") ) {
            this.menuItemArray.doAction(this.focus);

        } else if (me.input.isKeyPressed("left") || me.input.isKeyPressed("up") ) {
        	if (!this.isfocusActiv){
                this.focus--;
                this.changeFocus(this.focus);
            }
        } else if (me.input.isKeyPressed("right") || me.input.isKeyPressed("down") ) {
     		if (!this.isfocusActiv){
                this.focus++;
                this.changeFocus(this.focus);
            }
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

 		
 		for (var i = 0; i <= this.menuItemArray.array.length - 1; i++ ) {
 			this.drawWords(this.menuItemArray.getName(i), 70, (i * this.menuItemArray.getPosition()) + 60, this.menuItemArray.getFont(i));
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

    	for (var i = 0; i <= this.menuItemArray.array.length - 1; i++ ) {
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
    "sendPostRequest" : function sendPostRequest(){
        var now = new Date();
        game.playtime = game.playtime + (Math.round(now.getTime()/1000) - game.startTime);
        game.startTime = Math.round(now.getTime()/1000);
        data = { "stats": {"level": game.level, "duration" : game.playtime, 
        "knowledge_points": game.knowledgePoints, "energy_points": game.energypoints, "score": game.score}};
        jQuery.post( "./elli/update_stats" ,data );

   },



});

 function MenuItemArray(number){
	this.array = [];
    this.number = number;
	this.push = function (value){
		for (var i = 0; i <= value.length - 1; i++ ) {
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

    this.doAction =function (id){
        if (typeof(this.array[id].doAction()) != 'undefined'){
            this.array[id].doAction();
        }
        
    };

    this.getPosition = function(){
        return this.number;
    };



}

function menuItem (name){
	this.name = name;
	this.font = new me.Font("Monaco, Courier New", 16, "#000");

	
	this.setFont = function(font){
		this.font = font;
	};
};


showProfil = new menuItem("Profil");
bag = new menuItem("Schultasche");
save = new menuItem("Spiel speichern");
highscore = new menuItem("Highscore");
options = new menuItem("Einstellungen");
endmenu = new menuItem("Menu verlassen");
showProfil.doAction = function (){
    me.state.change(c.PROFIL);
};

highscore.doAction = function (){
    
            
};

options.doAction = function (){
    me.state.change(c.OPTIONS);
            
};
endmenu.doAction = function (){
    me.state.change(me.state.PLAY);
};

MainMenu = MenuScreen.extend({

    "init" : function init(mainplayer)
    {
        this.menuItemArray = new MenuItemArray(50);
    
        this.menuItemArray.push([showProfil, bag, save, highscore, options, endmenu]);

        // super
        this.parent(mainplayer);
        

    },
  

});

endSubmenu = new menuItem("Zum Hauptmenu");
      
endSubmenu.doAction = function (){
    me.state.change(me.state.MENU);
};

OptionsSubMenu = MenuScreen.extend({

    "init" : function init(mainplayer)
    {
        this.menuItemArray = new MenuItemArray(20);

        allCategories = new menuItem("Alle Kategorien lernen");
        this.myCategoryArray = [];

        allCategories.doAction = function (){
            game.categoryArray.selectedCategory = -1;
            me.state.change(me.state.PLAY);
        };

        for (var i = 0; i <= game.categoryArray.array.length - 1; i++) {
            categoryName = game.categoryArray.getCategory(i);
            this.myCategoryArray.push( new menuItem (categoryName));
            this.myCategoryArray[i].id = game.categoryArray.getSelectionID(categoryName);
            this.myCategoryArray[i].doAction = function () {
                game.categoryArray.selectedCategory = this.id;
                me.state.change(me.state.PLAY);
            };

        };

        this.menuItemArray.push([allCategories]);
        this.menuItemArray.push(this.myCategoryArray);
        this.menuItemArray.push([endSubmenu]);

        // super
        this.parent(mainplayer);
        

    },
  

});

ProfilSubMenu = MainMenu.extend({


    "init": function init(mainplayer) {
        this.mainplayer = mainplayer;
        this.font = new me.Font("Monaco, Courier New", 16, this.normalTextColor);
        this.sendPostRequest();
        this.getTitleRequest();
        this.myEnergyArray = [363,248,531,248,531];
        this.myKnowledgeArray = [363,278,363,278,531];

        this.newWidthLostGain();
      
        // call the constructor
        this.parent(mainplayer);
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
        imageProfilB = game.getImage("profil");
        imageProfil = game.getImage(this.mainplayer.interactionImage);

        context.drawImage(
            imageProfilB,
            0, 0
        );
        context.drawImage(
            imageProfil,
            400, 70
        );

        this.drawWords(game.username , 370, 215,this.font);
        this.drawWords("lv:" + game.level , 420, 183,this.font);
        this.drawWords(game.energypoints + "/" + this.mainplayer.getEnergypoints(), 410, 240,this.font);
        this.drawWords(game.knowledgePoints + "/" + this.mainplayer.getMaxKnowledge(), 410, 271,this.font);
        this.drawWords("Dein Titel: ", 300, 320,this.font);
        this.drawWords(game.title, 300, 350,this.font);
        this.drawWords("Score: " + game.score, 300, 380,this.font);
        this.drawWords("Spielzeit: " + this.getPlaytime(), 300, 410,this.font);

         this.drawLine(this.myEnergyArray[0],this.myEnergyArray[1], 
            this.myEnergyArray[2], this.myEnergyArray[3], '#01DFA5');
        this.drawLine(this.myKnowledgeArray[0],this.myKnowledgeArray[1], 
            this.myKnowledgeArray[2], this.myKnowledgeArray[3],'#0080FF')


        for (var i = 0; i <= this.menuItemArray.array.length - 1; i++ ) {
            this.drawWords(this.menuItemArray.getName(i), 70, (i * this.menuItemArray.getPosition()) + 60, this.menuItemArray.getFont(i));
        };
        
    },    

    "getPlaytime":  function getPlaytime(){
        playtime = "";
        myPlaytime = game.playtime;
        days = 0;
        hours = 0;
        min = 0;
        sec = 0;
        years = 0;

        if(myPlaytime > 31536000){
            years = Math.round((myPlaytime/31536000) - 0.5);
            myPlaytime = myPlaytime%31536000;
        }
        if(myPlaytime > 86400){
            days = Math.round((myPlaytime/86400) - 0.5);
            myPlaytime = myPlaytime%86400;
        }
        if(myPlaytime > 3600){
            hours = Math.round((myPlaytime/3600) - 0.5);
            myPlaytime = myPlaytime%3600;
        }
        if(myPlaytime > 60){
            min = Math.round((myPlaytime/60) - 0.5);
            myPlaytime = myPlaytime%60;
        }
        sec = myPlaytime;
        if(years != 0){
            playtime = playtime + years + "Jahre ";
        }
        if(days != 0){
            playtime = playtime + days + "Tage ";
        }
        if(hours != 0 && years < 10){
            playtime = playtime + hours + "h ";
        }
        if(min != 0 && years == 0){
            playtime = playtime + min + "min ";
        }
        if(sec != 0 && years == 0 && days == 0){
            playtime = playtime + sec + "sec ";
        }
 
        return playtime;
    },
    "getTitleRequest" : function getTitleRequest(){
        jQuery.get( "./elli/getTitle", function(data) {
            game.title = data.title;
        });

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
     "newWidthLostGain" : function newWidthLostGain(){
        var newWidth = (game.energypoints/this.mainplayer.getEnergypoints())* (this.myEnergyArray[4] - this.myEnergyArray[0]);
        this.myEnergyArray[2] = this.myEnergyArray[0] + newWidth;

         var newWidth = (game.knowledgePoints/this.mainplayer.getMaxKnowledge()) * (this.myKnowledgeArray[4] - this.myKnowledgeArray[0]);
        this.myKnowledgeArray[2] = this.myKnowledgeArray[0] + newWidth;
        
   },

   
   
});





