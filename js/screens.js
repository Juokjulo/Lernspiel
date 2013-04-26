
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
	
    },
   
    "update" : function update() {
        if (me.input.isKeyPressed("action") ) {
            this.to_x.stop();
            this.to_y.stop();
            me.game.viewport.fadeIn("black", 1000, function () {
                me.state.change(c.STATE_INTRO);
            });
        }
        return this.parent() || (this.fader !== -1);
    },

    "draw" : function draw(context) {
        this.parent(context);

        if (this.fader !== -1) {
            context.save();
            context.fillStyle = this.fadeColor;
            context.globalAlpha = this.fader;
            context.fillRect(0, 0, c.WIDTH, c.HEIGHT);
            context.restore();
        }

        var x = (c.WIDTH - this.logo.width) / 2;
        var y = (c.HEIGHT - this.logo.height - 80) / 2;
        context.drawImage(this.logo, x, y);

        if (this.fader === -1) {
            var message = "Press [Enter] or [Space]";
            var w = Math.min(this.font.measureText(context, message).width, c.WIDTH);

            context.save();
            context.shadowColor = "#000";
            context.shadowBlur = 2;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            this.font.draw(context, message, (c.WIDTH - w) / 2, (c.HEIGHT + this.logo.height) / 2);
            context.restore();
        }
    }

});