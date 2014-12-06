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
                {id: 'diamonds', src: 'assets/images/test-sprite.png'},
                {id: 'ocean',   src: 'assets/images/index/ocean.png'},
                {id: 'island',  src: 'assets/images/index/island.jpg'},
                {id: 'diamond', src: 'assets/images/test.png'},
                {id: 'thief', src: 'assets/images/thief.png'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            this._setupUI();
            this._createIsland();
            TH.zones.init(stage, queue);
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
            var container = new createjs.Container();
            var diamond = new createjs.Bitmap(queue.getResult('diamond'));
            var island = new createjs.Bitmap(queue.getResult('island'));

            container.addChild(island, diamond);

            var containerBounds = container.getBounds();
            var centerX = properties.canvasWidth / 2 - containerBounds.width / 2; // 0.02 scale = 10px
            var centerY = properties.canvasHeight / 2 - containerBounds.height / 2; // 0.02 scale = 10px

            // First Login - Zoom In
            // firstLogin = true;
            if(typeof firstLogin !== 'undefined') {
                container.x = properties.canvasWidth / 2.2;
                container.y = properties.canvasHeight / 2.2;

                container.scaleX = .1;
                container.scaleY = .1;

                createjs.Tween.get(container)
                    .to({x:-40, y: -40, scaleX: 1.5, scaleY: 1.5}, 500, createjs.Ease.linear)
                    .to({x: centerX, y: centerY, scaleX: 1, scaleY: 1}, 800, createjs.Ease.bounceOut);

            // Regular user
            } else {
                container.x = centerX;
                container.y = centerY;

                createjs.Tween.get(container)
                    .to({x: centerX + 10, scaleX: 0.98, scaleY: 0.98}, 100, createjs.Ease.linear)
                    .to({x: centerX, scaleX: 1, scaleY: 1}, 100, createjs.Ease.linear);
            }

            stage.addChild(container);
            stage.update();
        },

        tick: function() {
            stage.update();
        }

    }
}());
