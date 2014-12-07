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
                    TH.players.placePlayers();
                }
            });
        },

        _installPlugins: function() {
            createjs.CSSPlugin.install();
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
            });
            TH.global.queue.loadManifest([
                /* IMAGES */
                {id: 'diamonds', src: 'assets/images/test-sprite.png'},
                {id: 'ocean',   src: 'assets/images/index/ocean.png'},
                {id: 'island',  src: 'assets/images/index/island.jpg'},
                {id: 'country1',  src: 'assets/images/island1/country1.png'},
                {id: 'country2',  src: 'assets/images/island1/country2.png'},
                {id: 'country3',  src: 'assets/images/island1/country3.png'},
                {id: 'zone1',  src: 'assets/images/island1/zone1.png'},
                {id: 'zone2',  src: 'assets/images/island1/zone2.png'},
                {id: 'zone3',  src: 'assets/images/island1/zone3.png'},
                {id: 'zone4',  src: 'assets/images/island1/zone4.png'},
                {id: 'zone5',  src: 'assets/images/island1/zone5.png'},
                {id: 'thief', src: 'assets/images/thief.png'},
                {id: 'avatar', src: 'assets/images/pin.png'},
                {id: 'ocean', src: 'assets/images/index/ocean.png'},
                {id: 'flag', src: 'assets/images/flag.png'},
                {id: 'island', src: 'assets/images/index/island.jpg'},
                {id: 'bird', src: 'assets/images/bird.png'},
                {id: 'smoke', src: 'assets/images/smoke.png'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            TH.map.init();

        },

        tick: function() {
            TH.global.stage.update();
        }

    }
}());
