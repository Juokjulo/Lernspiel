
function ScrollMenuItemArray(number){
    this.array = [];
    this.number = number;
    this.push = function (value){
        for (var i = 0; i <= value.length - 1; i++ ) {
            this.array.push(value[i]);
        };
        
    };

    this.setFont = function (font, id, focusleft){
        this.array[id].setFont(font, focusleft);
    };

    this.getName = function (id){
        return this.array[id].name;
    };

    this.getFont = function (id){
        return this.array[id].font;
    };

    this.doAction =function (id, focusleft){
        if (typeof(this.array[id].doAction()) != 'undefined'){
            this.array[id].doAction(focusleft);
        }
        
    };

    this.getPosition = function(){
        return this.number;
    };

    this.drawWords = function(screen, i){
        this.array[i].drawWords(screen,i);   
    }


}

function scrollMenuItem (name, leftaction, rightaction){
    this.name = name;
    this.font = new me.Font("Monaco, Courier New", 16, "#000");
    this.fontleft = new me.Font("Monaco, Courier New", 16, "#000");
    this.fontright = new me.Font("Monaco, Courier New", 16, "#000");
    this.leftaction =leftaction;
    this.rightaction = rightaction;

    
    this.setFont = function(font, focusleft){
        normalfont = new me.Font("Monaco, Courier New", 16, "#000");
        if (typeof(focusleft) != 'undefined') {
            this.font = font;
            this.fontleft = font;
            this.fontright = font;
        }
        if (focusleft) {
            this.font = normalfont;
            this.fontleft = font;
            this.fontright = normalfont;
        }
        if (!focusleft) {
            this.font = normalfont;
            this.fontleft = normalfont;
            this.fontright = font;
        }
    };

    this.drawWords = function(screen, i){
        screen.drawWords(this.name, 70, (i * screen.menuItemArray.getPosition()) + 60, this.font);
        if (this.leftaction != ""){
            screen.drawWords(this.leftaction, 350, (i * screen.menuItemArray.getPosition()) + 60, this.fontleft);
        }
        if (this.rightaction != ""){
            screen.drawWords(this.rightaction, 470, (i * screen.menuItemArray.getPosition()) + 60, this.fontright);
        }
    }
};


endscrollSubmenu = new scrollMenuItem("Zum Hauptmenü", "", "");
      
endscrollSubmenu.doAction = function (focusleft){
    me.state.change(me.state.MENU);
};

testsrollobj = new scrollMenuItem("test", "benutzen", "Infos");
      
endscrollSubmenu.doAction = function (focusleft){
    me.state.change(me.state.MENU);
};

testsrollobj2 = new scrollMenuItem("test", "kaufen", "verkeufen");
      
endscrollSubmenu.doAction = function (focusleft){
    me.state.change(me.state.MENU);
};
testsrollobj3 = new scrollMenuItem("zurück", "", "weiter");
      
endscrollSubmenu.doAction = function (focusleft){
    me.state.change(me.state.MENU);
};






ScrollMenuScreen = me.ScreenObject.extend(
    {
    init : function(mainplayer)
    {
        this.mainplayer = mainplayer;
        this.parent(true);

        this.focusColor = "#f00";
        this.normalTextColor = "#000";

        this.focus = 0;
        this.focusleft = null;
        this.changeFocus(this.focus, this.focusleft);

       

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
        
        --- */
    onDestroyEvent: function()
    { 
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
    
    },
   
    "update" : function update() {
        if (me.input.isKeyPressed("action") ) {
            this.menuItemArray.doAction(this.focus, this.focusleft);

        } else if (me.input.isKeyPressed("left") ) {
           this.focusleft = true;
           this.changeFocus(this.focus, this.focusleft);
            
        } else if (me.input.isKeyPressed("up") ) {
            this.focus--;
            this.changeFocus(this.focus, this.focusleft);
            
        }else if (me.input.isKeyPressed("right") ) {
            this.focusleft = false;
            this.changeFocus(this.focus, this.focusleft);
            
        }else if ( me.input.isKeyPressed("down") ) {
            this.focus++;
            this.changeFocus(this.focus, this.focusleft);
            
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
            this.menuItemArray.drawWords(this, i);
            //this.drawWords(this.menuItemArray.getName(i), 70, (i * this.menuItemArray.getPosition()) + 60, this.menuItemArray.getFont(i));
        };
        
    },
   
    "changeFocus" : function changeFocus(number, focusleft){
        if (number < 0){
            this.focus = 0;
            number = 0;
        } 
        if (number > this.menuItemArray.array.length - 1 ) {
            this.focus = this.menuItemArray.array.length - 1 ;
            number = this.focus;
        };

        for (var i = 0; i <= this.menuItemArray.array.length - 1; i++ ) {
             this.menuItemArray.setFont(new me.Font("Monaco, Courier New", 16, this.normalTextColor),i, null);
        };
        font = new me.Font("Monaco, Courier New", 16, this.focusColor);
        this.menuItemArray.setFont(font, number, focusleft);
            
    },


    "drawWords" : function drawWords(message, width, height, font) {
        
        var w = Math.min(font.measureText(this.context, message).width, c.WIDTH);    
        this.context.save();
        font.draw(this.context, message, width, height);    
        this.context.restore();

    },   

  



});


BagSubMenu = ScrollMenuScreen.extend({


    "init": function init(mainplayer) {
        this.menuItemArray = new ScrollMenuItemArray(40);
        this.menuItemArray.push([testsrollobj, testsrollobj2, testsrollobj3,endscrollSubmenu]);
        
        // call the constructor
        this.parent(mainplayer);
    },

  
   
   
});

ScoreSubMenu = ScrollMenuScreen.extend({


    "init": function init(mainplayer) {
        this.menuItemArray = new ScrollMenuItemArray(40);
        this.menuItemArray.push([endscrollSubmenu]);
        // call the constructor
        this.parent(mainplayer);
    },

  
   
   
});






