var TH = TH || {};

TH.players = (function() {
    return {
        players: {},

        init : function() {
            this.createMainPlayer();
            this.startPlayerPolling();
        },
        createMainPlayer: function() {

            this.players.red = new TH.MainPlayer();
//            this.players.green = new TH.Player(
//                TH.global.queue.getResult('avatar'),
//                {   x : 120,
//                    y : -320
//                }
//            );
//            this.players.yellow = new TH.Player(
//                TH.global.queue.getResult('avatar'),
//                {   x : 480,
//                    y : -450
//                }
//            );
//            this.players.blue = new TH.Player(
//                TH.global.queue.getResult('avatar'),
//                {   x : 980,
//                    y : -300
//                }
//            );


//            TH.global.stage.addChild(this.players.green.shape);
//            TH.global.stage.addChild(this.players.yellow.shape);
//            TH.global.stage.addChild(this.players.blue.shape);

            this.players.red.assignCountry(TH.map.countries.red);
//            this.players.green.assignCountry(TH.map.countries.green);
//            this.players.yellow.assignCountry(TH.map.countries.yellow);
//            this.players.blue.assignCountry(TH.map.countries.blue);

        },

        startPlayerPolling: function(successCallback) {
            var self = this,
                firstRequest = true,
                ajaxRequest = true;

            function request() {
                return $.ajax({
                    type: 'GET',
                    url: TH.global.endpoints.islands,
                    contentType: "application/json; charset=utf-8",

                    dataType: 'json',
                    xhrFields: { withCredentials: true },
                    success: function(response) {
                        self.ajaxRequest = null;

                        if(firstRequest) {
                            self.firstPollHandler(response);
                            firstRequest = false;
                        } else if (successCallback) {
                            self.pollHandler(response);
                        }

                    },
                    error: function(error) {
                        self.ajaxRequest = null;
                        alert('Well ..' + error);
                    }
                });
            }

            setInterval(function() {
                if (!self.ajaxRequest) {
                    self.ajaxRequest = request();
                }
            }, 1000);

        },
        countryMap: {
            'west': 'green',
            'north': 'yellow',
            'east': 'blue'
        },
        firstPollHandler: function(data) {

            var initData = {
                'green' : {
                    x : 320,
                    y : 120
                },
                'yellow' : {
                    x : 550,
                    y : 150
                },
                'blue' : {
                    x : 980,
                    y : 300
                }
            };

            for (var i = 0; i < data.length; i++) {

                var pos = this.countryMap[data[i].position];
                this.players[pos] = new TH.Player(
                    data[i].avatar,
                    initData[pos]
                );
                TH.global.stage.addChild(this.players[pos].container);
                this.players[pos].assignCountry(TH.map.countries[pos]);
            }
            TH.ui.components.preloader.setLoadedStep('otherPlayers');

        },
        pollHandler: function(data) {
            console.log(data);
        },
        placePlayers: function() {
            var self = this;


//            var tw = createjs.Tween.get().wait(300);
//            tw.call(function(){
//                var tw = self.players.green.fallDown();
//                tw.call(function(){
//                    var tw = self.players.yellow.fallDown();
//                    tw.call(function(){
//                        var tw = self.players.blue.fallDown();
//                    });
//                });
//            });

            TH.global.stage.update();
        }
    }
}());
