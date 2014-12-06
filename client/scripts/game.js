var TH = TH || {};

TH.world = (function() {
    var stage,
        queue;


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
            stage = new createjs.Stage('world');
            createjs.Ticker.addEventListener('tick', this.tick);
        },
        _loadFiles: function(callback) {
            queue = new createjs.LoadQueue(false);
            queue.installPlugin(createjs.Sound);
            queue.addEventListener('complete', callback.bind(this));
            queue.loadManifest([
                /* IMAGES */
                {id: 'flower', src: 'assets/images/ocean.png'},
                {id: 'diamond', src: 'assets/images/test.png'},

                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },

        _postInit: function() {
            this._createTestShape();
        },

        _createTestShape: function() {
            var shape = new createjs.Bitmap(queue.getResult('diamond'));
            shape.x = 100;
            shape.y = 100;

            shape.addEventListener('click', function() {
                console.log('clicked');
            });

            var tw = createjs.Tween.get(shape).to({transform: 'scale(0.3)'}, 3000);
            stage.addChild(shape);
            stage.update();
        },
        tick: function() {
            stage.update();
        }

    }
}());
