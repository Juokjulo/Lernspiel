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
        this.setVelocity(1, 1);
	me.debug.renderHitBox = true;
	
	// adjust the bounding box
	this.updateColRect(2, 28, 22, 8);
    
	this.addAnimation ("down", [0,1,2]);
	this.addAnimation ("left", [3,4,5]);
	this.addAnimation ("right", [6,7,8]);
	this.addAnimation ("up", [9,10,11]);
	
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
         
	// check for collision
        var res = me.game.collide(this);
	  
	  if (res) {
        // if we collide with an enemy
        if (res.obj.type == me.game.ACTION_OBJECT &&  me.input.isKeyPressed('action') && !res.obj.isInteracting) {
            
              res.obj.interact(this);
	      res.obj.isInteracting = false;
      
        }
    }

	 
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
    
            
 
});

var KayEntity = me.ObjectEntity.extend({
    
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 1);
	me.debug.renderHitBox = true;
	this.isInteracting = false;
    
	this.addAnimation ("down", [0]);
	this.addAnimation ("left", [3,4,5]);
	this.addAnimation ("right", [6,7,8]);
	this.addAnimation ("up", [9,10,11]);
	
	this.setCurrentAnimation("down");
	
	// make it collidable
        this.collidable = true;
	this.type = me.game.ACTION_OBJECT;
 
    },
    "interact" : function interact(actor) {
	this.isInteracting = true;
            game.dialog([
                "Hi! ndfkdjdsnkhnkhnj njnhn kjnikjsdfdsgvfdcv dscx"," dscxy hdjfetgfd vgrf gtfdv crtfg gfdv trgfd regf grf "
            ],null);
	
    },
    
      onCollision: function(res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
        }
    },

});