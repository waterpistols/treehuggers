var TH = TH || {};
TH.world = (function() {
    return {
        init : function() {
            this._installPlugins();
            this._createStage();
            this._loadFiles(this._postInit);
        },

        _installPlugins: function() {
            createjs.CSSPlugin.install();
        },

        _createStage: function() {
            TH.global.stage = new createjs.Stage('world');
            createjs.Ticker.addEventListener('tick', this.tick);
        },

        _loadFiles: function(callback) {
            self = this;
            TH.global.queue = new createjs.LoadQueue(false);
            TH.global.queue.installPlugin(createjs.Sound);
            TH.global.queue.addEventListener('progress', function() {
                $('.preloader').show();
            });
            TH.global.queue.addEventListener('complete', function() {
                $('.preloader').hide();
                callback.call(self);
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
                {id: 'diamond', src: 'assets/images/test.png'},
                {id: 'thief', src: 'assets/images/thief.png'},
                {id: 'avatar', src: 'assets/images/avatar.png'},
                {id: 'ocean', src: 'assets/images/index/ocean.png'},
                {id: 'flag', src: 'assets/images/flag.png'},
                {id: 'island', src: 'assets/images/index/island.jpg'},
                {id: 'bird', src: 'assets/images/bird.png'},
                {id: 'smoke', src: 'assets/images/smoke.gif'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            TH.ui.init();
            TH.map.init();
            TH.players.init();
        },

        tick: function() {
            TH.global.stage.update();
        }

    }
}());
