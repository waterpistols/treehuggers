TH = TH || {};
TH.Island = (function() {
    function Island(container, params) {
        var self = this;
        TH.global.extend.call(container, params);
        this.container = new createjs.Container();
        this.countries = [];

        this.container.x = TH.global.properties.canvasWidth / 2;
        this.container.y = TH.global.properties.canvasHeight / 2;
        this.container.alpha = 0;

        setInterval(function() {

            self.updateCountries();
        }, 1000);

    }

    Island.prototype.addCountry = function(country) {
        this.countries.push(country);
        this.container.addChild(country.container);
    };

    Island.prototype.popIn = function() {


        var containerBounds = this.container.getBounds();
        var centerX = containerBounds.width / 2; // 0.02 scale = 10px
        var centerY = containerBounds.height / 2; // 0.02 scale = 10px
        this.container.regX = centerX;
        this.container.regY = centerY;




            this.container.scaleX = .1;
            this.container.scaleY = .1;

            createjs.Tween.get(this.container)
                .to({alpha: 1})
                .to({scaleX: 1.03, scaleY: 1.03}, 500, createjs.Ease.linear)
                .to({scaleX: 1, scaleY: 1}, 800, createjs.Ease.bounceOut);

    };

    Island.prototype.birdy = function() {
        var sheetOptions = {
            images: [TH.global.queue.getResult('bird').src],
            frames: {width:40, height:41},
            animations: {
                flap: { frames : [0, 1], speed: 0.5}

            }
        };
        var sheet = new createjs.SpriteSheet(sheetOptions),
            sprite = new createjs.Sprite(sheet);

        sprite.gotoAndPlay('flap');

        TH.global.extend.call(sprite, { x: -10, y: 300});
        TH.global.stage.addChild(sprite);

        createjs.Tween.get(sprite, { loop: true})
            .to({x: 1330, y: 100}, 10000, createjs.Ease.linear)
            .to({x: -400, y: 700}, 1, createjs.Ease.linear)
            .wait(10000)
            .to({x: 1330, y: 400}, 15000, createjs.Ease.linear)
            .to({x: -400, y: 700}, 1, createjs.Ease.linear)
            .wait(10000)
            .to({x: 1330, y: 300}, 5000, createjs.Ease.linear)
            .to({x: -400, y: 700}, 1, createjs.Ease.linear);
    };

    Island.prototype.smokey = function() {
        var sheetOptions = {
            images: [TH.global.queue.getResult('smoke').src],
            frames: {width:34, height:26},
            animations: {
                smoke: {
                    frames: [0, 1, 2, 3 ,4],
                    speed: 0.5
                }
            }
        };
        var sheet = new createjs.SpriteSheet(sheetOptions),
        sprite = new createjs.Sprite(sheet);

        sprite.gotoAndPlay('smoke');

        setTimeout(function() {
            TH.global.extend.call(sprite, { x: 543, y: 197});
            TH.global.stage.addChild(sprite);
        }, 600);
    };

    Island.prototype.updateCountries = function() {
        var i;

        for (i = 0; i < this.countries.length; i++) {
            this.countries[i].updatePlayer();

        }
    };

    return Island;
}());
