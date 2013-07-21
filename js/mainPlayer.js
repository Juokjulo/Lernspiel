
game.firstInit = true;


/*-------------------
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(2, 2);
	
	// adjust the bounding box
	this.updateColRect(2, 28, 22, 8);
    this.interactionImage = "blue_player";
	this.addAnimation ("down", [0,1,2]);
	this.addAnimation ("left", [3,4,5]);
	this.addAnimation ("right", [6,7,8]);
	this.addAnimation ("up", [9,10,11]);
    if (game.firstInit){
        me.state.set(me.state.MENU, new MainMenu(this));
        me.state.set(c.PROFIL, new ProfilSubMenu(this));
        me.state.set(c.OPTIONS, new OptionsSubMenu(this));
        me.state.set(c.BAG, new BagSubMenu(this));
        game.firstInit = false;
    }

	
	 // Rachel's mass is always 1.
        //this.body.setMass(1);

        // Register Chipmunk collision handlers.
        //this.body.eachShape(function eachShape(shape) {
          //  shape.collision_type = c.COLLIDE_PLAYER;
            //shape.setLayers(c.LAYER_NO_COIN | c.LAYER_NO_NPC | c.LAYER_NO_CHEST | c.LAYER_EXIT | c.LAYER_LIVING);
        //});
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
    
    
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
            // animation
           this.setCurrentAnimation("left");
	
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // animation
            this.setCurrentAnimation("right");
	  
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // animation
            this.setCurrentAnimation("down");
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // animation
            this.setCurrentAnimation("up");
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
	    this.vel.y = 0;
        }
       
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        
    if (me.input.isKeyPressed('menu') ) {  
    
        me.state.change(me.state.MENU);      
    }
	// check for collision
        var res = me.game.collide(this);
	  
	  if (res) {
        // if we collide with an enemy
        //if (res.obj.type == me.game.ACTION_OBJECT &&  me.input.isKeyPressed('action') && !res.obj.isInteracting) {
        if (me.input.isKeyPressed('action') ) {
             
            res.obj.interact(this);      
        }
    }

	 
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
    
    "getMaxKnowledge": function getMaxKnowledge(){
        return game.level * 20;
    }, 

    "getEnergypoints": function getEnergypoints(){
        return game.level * 10;
    }

 
});

