var TH = TH || {};

TH.players = (function() {



    return {
        players: {},

        init : function() {



        },
        createPlayers: function() {

            this.players.red = new TH.MainPlayer(
                TH.global.queue.getResult('flag'),
                {   x : TH.global.properties.canvasWidth / 2 + 25,
                    y : -100
                }
            );
            this.players.green = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : TH.global.properties.canvasWidth / 2 + 25,
                    y : -250
                }
            );
            this.players.yellow = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : TH.global.properties.canvasWidth / 2 - 200,
                    y : -200
                }
            );
            this.players.blue = new TH.Player(
                TH.global.queue.getResult('avatar'),
                {   x : TH.global.properties.canvasWidth / 2 + 200,
                    y : -200
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
            this.createPlayers();
            var self = this;

            var tw = self.players.red.fallDown();
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
