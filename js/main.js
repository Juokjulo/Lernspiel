// für debug: open /Applications/Google\ Chrome.app  --args --allow-file-access-from-files


var game	= 
{
    
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', c.WIDTH,c.HEIGHT, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		//me.loader.preload(g_resources);
		this.loadResources();
		game.loadFromDatabase();
 
 		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new game.PlayScreen(20));

		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);
		me.entityPool.add("kay", KayEntity);
		me.entityPool.add("me.LevelEntity", me.LevelEntity);
			  
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,  "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.ENTER, "action", true);
		me.input.bindKey(me.input.KEY.SPACE, "menu", true);
		me.sys.gravity=0;
		
	
		// start the game
		me.state.change(me.state.PLAY);
	},
	
	"loadResources" : function loadResources() {
        // Set all resources to be loaded.
        var g_resources = [];

        // Graphics.
        this.g_resources["charas"].forEach(function forEach(value) {
            g_resources.push({
                "name"  : value,
                "type"  : "image",
                "src"   : "data/charas/" + value + ".png"
            })
        });
	
	this.g_resources["img"].forEach(function forEach(value) {
            g_resources.push({
                "name"  : value,
                "type"  : "image",
                "src"   : "data/img/" + value + ".png"
            })
        });
	
	this.g_resources["tileset"].forEach(function forEach(value) {
            g_resources.push({
                "name"  : value,
                "type"  : "image",
                "src"   : "data/tileset/" + value + ".png"
            })
        });


        // Maps.
        this.g_resources["map"].forEach(function forEach(value) {
            g_resources.push({
                "name"  : value,
                "type"  : "tmx",
                "src"   : "data/map/" + value + ".tmx"
            })
        });

	me.loader.preload(g_resources);
      }  ,  
    
      
        
    // Helper function to determine if a variable is an Object.
    "isObject" : function isObject(object) {
        try {
            return (!Array.isArray(object) && Object.keys(object));
        }
        catch (e) {
            return false;
        }
    },

    // Helper function to sort objects by `z` property, then `y` property.
    "sort" : function sort(a, b) {
        var result = (b.z - a.z);
        return (result ? result : ((b.pos && b.pos.y) - (a.pos && a.pos.y)) || 0);
    },

    // Helper function to get an image with error checking.
    "getImage" : function getImage(name) {
        var result = me.loader.getImage(name);
        if (!result) {
            throw "Error: No image named `" + name + "` (Did you forget to include the resource?)";
        }
        return result;
    },


};  // game




//bootstrap :)
window.onReady(function() 
{
	game.onload();
});


