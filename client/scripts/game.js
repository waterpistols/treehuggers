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
            TH.global.queue = new createjs.LoadQueue(false);
            TH.global.queue.installPlugin(createjs.Sound);
            TH.global.queue.addEventListener('complete', callback.bind(this));
            TH.global.queue.loadManifest([
                /* IMAGES */
                {id: 'diamonds', src: 'assets/images/test-sprite.png'},
                {id: 'ocean',   src: 'assets/images/index/ocean.png'},
                {id: 'island',  src: 'assets/images/index/island.jpg'},
                {id: 'island1',  src: 'assets/images/index/island/island_01.png'},
                {id: 'island2',  src: 'assets/images/index/island/island_02.png'},
                {id: 'island3',  src: 'assets/images/index/island/island_03.png'},
                {id: 'island4',  src: 'assets/images/index/island/island_04.png'},
                {id: 'diamond', src: 'assets/images/test.png'},
                {id: 'thief', src: 'assets/images/thief.png'},
                {id: 'avatar', src: 'assets/images/avatar.png'},
                {id: 'ocean', src: 'assets/images/index/ocean.png'},
                {id: 'flag', src: 'assets/images/flag.png'},
                {id: 'island', src: 'assets/images/index/island.jpg'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            this._setupUI();
            TH.ui.init();
            TH.map.init();
            TH.players.init();
        },

        _setupUI: function() {
            var ocean = TH.global.queue.getResult('ocean');
            var background = new createjs.Shape();

            // Repeat background pattern
            background.graphics.beginBitmapFill(ocean, "repeat").rect(0, 0, 960, 533);

            TH.global.stage.addChild(background);
            TH.global.stage.update();
        },

        tick: function() {
            TH.global.stage.update();
        }

    }
}());
