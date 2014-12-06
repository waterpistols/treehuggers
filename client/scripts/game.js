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
            TH.map.init(TH.global.stage, TH.global.queue);
        },

        _setupUI: function() {
            var ocean = TH.global.queue.getResult('ocean');
            var background = new createjs.Shape();

            // Repeat background pattern
            background.graphics.beginBitmapFill(ocean, "repeat").rect(0, 0, 960, 533);

            TH.global.stage.addChild(background);
            TH.global.stage.update();
        },

        placePlayers: function() {
            var flag = new createjs.Bitmap(TH.global.queue.getResult('flag'));
            var avatarN = new createjs.Bitmap(TH.global.queue.getResult('avatar'));
            var avatarW = new createjs.Bitmap(TH.global.queue.getResult('avatar'));
            var avatarE = new createjs.Bitmap(TH.global.queue.getResult('avatar'));

            TH.global.stage.addChild(flag);
            TH.global.stage.addChild(avatarN);
            TH.global.stage.addChild(avatarW);
            TH.global.stage.addChild(avatarE);

            // Positioning
            flag.x = TH.global.properties.canvasWidth / 2 + 25;
            flag.y = -400;
            flag.newY = 320;

            avatarN.x = TH.global.properties.canvasWidth / 2 + 25;
            avatarN.y = -200;
            avatarN.newY = 40;

            avatarW.x = TH.global.properties.canvasWidth / 2 - 200;
            avatarW.y = -300;
            avatarW.newY = 170;

            avatarE.x = TH.global.properties.canvasWidth / 2 + 200;
            avatarE.y = -300;
            avatarE.newY = 170;

            // Animate Flag
            createjs.Tween.get(flag)
                .to({y: flag.newY}, 300, createjs.Ease.bounceOut).call(function() {

                    // Player W
                    createjs.Tween.get(avatarW)
                        .to({y: avatarW.newY}, 300, createjs.Ease.bounceOut).call(function() {

                            // Player N
                            createjs.Tween.get(avatarN)
                                .to({y: avatarN.newY}, 300, createjs.Ease.bounceOut).call(function() {

                                    // Player E
                                    createjs.Tween.get(avatarE)
                                        .to({y: avatarE.newY}, 300, createjs.Ease.bounceOut);
                            });
                        });

                });

            TH.global.stage.update();
        },

        tick: function() {
            TH.global.stage.update();
        }

    }
}());
