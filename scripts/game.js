var TH = TH || {};
TH.world = (function() {
    return {
        init : function() {
            var self = this;
            this._installPlugins();
            createjs.Ticker.addEventListener('tick', this.tick);
            this._loadFiles();
            TH.ui.init();
            TH.ui.components.preloader.setCallbacks({
                'assets': function() {
                    TH.map.init();
                    TH.players.init();
                },
                'all': function() {
                    TH.map.placeMap();
                    self._attachEvents();
                }
            });
        },

        _installPlugins: function() {
            createjs.CSSPlugin.install();
        },

        _attachEvents: function(){
            $('body').on('click', '#logout', function(){
                $.ajax({
                    type: 'POST',
                    url: TH.global.endpoints.logout,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    xhrFields: { withCredentials: true },
                    success: function(data) {
                        window.location.href = TH.global.clientUrl + 'index.html';
                    },
                    error: TH.global.errorHandler
                });
            });

            $('body').on('click', '.mute', function(){
                $('.volume').show();
                $('.mute').hide();

                createjs.Sound.setMute(false);
            });

            $('body').on('click', '.volume', function(){
                $('.volume').hide();
                $('.mute').show();

                createjs.Sound.setMute(true);
            });

        },

        _loadFiles: function() {
            self = this;
            TH.global.queue = new createjs.LoadQueue(false);
            TH.global.queue.installPlugin(createjs.Sound);
            TH.global.queue.addEventListener('progress', function() {
                $('.preloader').show();
            });
            TH.global.queue.addEventListener('complete', function() {
                TH.ui.components.preloader.setLoadedStep('assets');
                createjs.Sound.play("ocean", { loop: -1, volume: 0.2});
                createjs.Sound.play("seaqull", { loop: -1, volume: 0.4});
            });

            TH.global.queue.loadManifest([
                /* IMAGES */
                {id: 'country1',  src: 'assets/images/island1/country1.png'},
                {id: 'country2',  src: 'assets/images/island1/country2.png'},
                {id: 'country3',  src: 'assets/images/island1/country3.png'},
                {id: 'zone1',  src: 'assets/images/island1/zone1.png'},
                {id: 'zone2',  src: 'assets/images/island1/zone2.png'},
                {id: 'zone3',  src: 'assets/images/island1/zone3.png'},
                {id: 'zone4',  src: 'assets/images/island1/zone4.png'},
                {id: 'zone5',  src: 'assets/images/island1/zone5.png'},
                {id: 'help', src: 'assets/images/help.png'},
                {id: 'pin', src: 'assets/images/pin.png'},
                {id: 'bird', src: 'assets/images/bird.png'},
                {id: 'smoke', src: 'assets/images/smoke.png'},

                /* SOUNDS */
                {id: 'ocean', src: 'assets/sounds/ocean.wav'},
                {id: 'seaqull', src: 'assets/sounds/seaqull.wav'}
            ]);
        },

        tick: function() {
            TH.global.stage.update();
        }

    }
}());
