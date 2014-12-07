var TH = TH || {};

TH.players = (function() {
    return {
        players: {},

        init : function() {
            this.createPlayers();
            this.startPlayerPolling(this.polllHandler);
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
        ajaxRequest : true,
        startPlayerPolling: function(successCallback) {
            var payload = {},
                self = this;

            if (!this.ajaxRequest) {
                this.ajaxRequest = $.ajax({
                    type: 'POST',
                    url: TH.global.endpoints.plant,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(payload),
                    dataType: 'json',
                    xhrFields: { withCredentials: true },
                    success: function(response) {
                        self.ajaxRequest = null;
                        if (successCallback) {
                            successCallback(response);
                        }
                    },
                    error: function(error) {
                        self.ajaxRequest = null;
                        alert('Well ..' + error);
                    }
                });
            }
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
