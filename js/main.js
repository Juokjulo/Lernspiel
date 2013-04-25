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
			  
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,  "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.ENTER, "action");
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

    // Simple quests make the game interesting!
    "quests" : function quests() {
        var all = [];
        var subscribed = [];

        /**
         * Update quest progress.
         *
         * @param {String} event
         *      Process all quests listening for `event`.
         */
        function progress(event, quantity) {
            // Iterate over all active quests on the queue.
            all.forEach(function forEach(quest, key) {
                // When the quest is waiting for this event...
                if (quest.list.hasOwnProperty(event)) {
                    // Update the quantity...
                    quest.list[event] -= +quantity;

                    // If the quota has been fulfilled...
                    if (quest.list[event] <= 0) {
                        // Remove the event...
                        delete quest.list[event];

                        // Notify...
                        if (typeof(quest.callback) === "function") {
                            quest.callback();
                        }

                        // And if all events have fulfilled their quota...
                        if (!Object.keys(quest.list).length) {
                            // Remove the quest from this listener...
                            all.splice(key, 1);
                        }
                    }
                }
            });
        }

        return {
            /**
             * Add a new quest.
             *
             * @param {Array} list
             *      Array of quest events to subscribe to.
             * @param {Function}
             *      callback Called when all events have been received.
             */
            "add" : function add_quest(list, callback) {
                // Add this quest to the queue.
                all.push({
                    "list"      : list,
                    "callback"  : callback
                });

                // Check for new subscriptions.
                Object.keys(list).forEach(function eachKey(item) {
                    if (subscribed.indexOf(item) === -1) {
                        subscribed.push(item);

                        subscribe(item, (function subscribeFactory(event) {
                            return function onPublish() {
                                progress.apply(progress, [ event ].concat(
                                    Array.prototype.slice.call(arguments))
                                );
                            };
                        })(item));
                    }
                });
            },

            /**
             * Get all active quests
             * @return {Array}
             *      Complete list of active quests.
             */
            "getAll" : function get_quests() {
                // Return a copy; don't let callers modify internal state.
                return all.slice(0);
            }
        };
    }

};  // game

/* the in game stuff*/

game.PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
          me.levelDirector.loadLevel("klassenzimmerStart");      
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	game.onload();
});


