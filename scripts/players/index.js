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
            this.players.red.assignCountry(TH.map.countries.red);
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

                        self.pollHandler(response);
                        if (firstRequest) {
                            firstRequest = false;
                            TH.ui.components.preloader.setLoadedStep('otherPlayers');
                        }
                    },
                    error: function(error) {
                        self.ajaxRequest = null;
                        TH.global.errorHandler(error);
                    }
                });
            }

            setInterval(function() {
                if (!self.ajaxRequest) {
                    self.ajaxRequest = request();
                }
            }, 5000);

        },
        countryMap: {
            'west': 'green',
            'north': 'yellow',
            'east': 'blue'
        },
        initData : {
            'green' : {
                x : 120,
                y : 280
            },
            'yellow' : {
                x : 550,
                y : 130
            },
            'blue' : {
                x : 980,
                y : 300
            }
        },
        pollHandler: function(data) {
            var i, user;
            TH.players.players.red.setTrees(parseInt(data.trees), true);

            for (i = 0; user = data.users[i], i < data.users.length; i++) {
                var pos = this.countryMap[user.position];

                if (!this.players[pos]) {
                    this.players[pos] = new TH.Player(
                        parseInt(user.id),
                        user.avatar,
                        this.initData[pos]
                    );
                    this.players[pos].assignCountry(TH.map.countries[pos]);
                    TH.global.stage.addChild(this.players[pos].container);
                } else {

                }

                this.players[pos].setTotalHealth(parseInt(user.degrading_sum));

                if (user.askForHelp) {
                    this.players[pos].showHelp();
                } else {
                    this.players[pos].hideHelp();
                }
            }
        }
    }
}());
