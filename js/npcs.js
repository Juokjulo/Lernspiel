
var NPCEntity = me.ObjectEntity.extend({
    
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(1, 1);
        this.isInteracting = false;
        // adjust the bounding box
        this.updateColRect(-4, 40, 0, 40);
        this.playerLevel = 1;
        this.addAnimation ("down", [0]);
        this.addAnimation ("left", [4]);
        this.addAnimation ("right", [7]);
        this.addAnimation ("up", [10]);
        
        this.addAnimation ("walk_down", [0,1,2]);
        this.addAnimation ("walk_left", [3,4,5]);
        this.addAnimation ("walk_right", [6,7,8]);
        this.addAnimation ("walk_up", [9,10,11]);
        
        // make it collidable
        this.collidable = true;
        this.type = me.game.ACTION_OBJECT;

    },
   
    
      onCollision: function(res, obj) {

    },

    getEnergypoints: function(){
        return this.playerLevel * 10;
    }

});

var ClassTeacherEntity = NPCEntity.extend({
    
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        // adjust the bounding box
        this.username = "Klassenlehrerin";
        this.playerLevel = 100;
        this.interactionImage = "class_player";
        
        this.setCurrentAnimation("down");

    },
    interact: function(actor) {
        this.isInteracting = true;
        game.dialog(["Ping uh i u u ju u ju u u ju uv u u u z  uz z z z z  uz u u u  u u u u i u ", "fdsc"]);
            
        game.fight(this, actor);
        
       
    },
    
      onCollision: function(res, obj) {

    },

});

var PutzEntity = NPCEntity.extend({
    
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        // adjust the bounding box
        this.username = "Putzfrau";
        this.playerLevel = 3;
        this.interactionImage = "putz_player";
        
        this.setCurrentAnimation("right");

    },
    interact: function(actor) {
        
        game.fight(this, actor);
        
       
    },
    
      onCollision: function(res, obj) {

    },

});