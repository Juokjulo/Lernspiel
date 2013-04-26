
game.fight = function fight(teammate) {
    var background = game.getImage("fight");
    var font = new me.Font("Tahoma", 18, "#000000");
    
     var fight_box = new game.FightObject();
     
    me.game.add(fight_box);
    me.game.sort.defer(game.sort);
}

