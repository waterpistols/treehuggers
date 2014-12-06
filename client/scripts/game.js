var TH = TH || {};

TH.world = (function() {
    var stage,
        properties = {},
        queue;


    return {
        init : function() {
            this._installPlugins();
            this._createStage();
            this._loadFiles(this._postInit);

            // Set properties
            properties.canvasWidth = 960;
            properties.canvasHeight = 533;

        },
        _installPlugins: function() {
            createjs.CSSPlugin.install();
        },

        _createStage: function() {
            stage = new createjs.Stage('world');
            createjs.Ticker.addEventListener('tick', this.tick);
        },
        _loadFiles: function(callback) {
            queue = new createjs.LoadQueue(false);
            queue.installPlugin(createjs.Sound);
            queue.addEventListener('complete', callback.bind(this));
            queue.loadManifest([
                /* IMAGES */
                {id: 'ocean',   src: 'assets/images/index/ocean.png'},
                {id: 'island',   src: 'assets/images/index/island.jpg'},
                {id: 'diamond', src: 'assets/images/test.png'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            this._setupUI();
            this._createIsland();
        },

        _setupUI: function() {
            var ocean = queue.getResult('ocean');
            var background = new createjs.Shape();

            // Repeat background pattern
            background.graphics.beginBitmapFill(ocean, "repeat").rect(0, 0, 960, 533);

            stage.addChild(background);
            stage.update();
        },

        _createIsland: function(firstLogin) {
            var island = new createjs.Bitmap(queue.getResult('island'));

            // Position island center
            island.x = properties.canvasWidth / 2 - island.image.width / 2;
            island.y = properties.canvasHeight / 2 - island.image.height / 2;

            stage.addChild(island);
            stage.update();
        },

        tick: function() {
            // stage.update();
        }

    }
}());
