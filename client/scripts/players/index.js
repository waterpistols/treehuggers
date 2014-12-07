var TH = TH || {};

TH.players = (function() {
    return {
        players: {},

        init : function() {
            this.createPlayers();
        },
        createPlayers: function() {

            this.players.red = new TH.MainPlayer(
                TH.global.queue.getResult('flag'),
                {   x : 620,
                    y : -50
                }
            );
            this.players.green = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : 120,
                    y : -320
                }
            );
            this.players.yellow = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : 480,
                    y : -450
                }
            );
            this.players.blue = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : 980,
                    y : -300
                }
            );

            TH.global.stage.addChild(this.players.red.shape);
            TH.global.stage.addChild(this.players.green.shape);
            TH.global.stage.addChild(this.players.yellow.shape);
            TH.global.stage.addChild(this.players.blue.shape);

            this.players.red.assignCountry(TH.map.countries.red);
            this.players.green.assignCountry(TH.map.countries.green);
            this.players.yellow.assignCountry(TH.map.countries.yellow);
            this.players.blue.assignCountry(TH.map.countries.blue);


        },

        placePlayers: function() {
            var self = this;

            var tw = createjs.Tween.get().wait(300);
            tw.call(function(){
                var tw = self.players.green.fallDown();
                tw.call(function(){
                    var tw = self.players.yellow.fallDown();
                    tw.call(function(){
                        var tw = self.players.blue.fallDown();
                    });
                });
            });

            TH.global.stage.update();
        }
    }
}());
