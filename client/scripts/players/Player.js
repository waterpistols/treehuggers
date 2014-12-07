TH = TH || {};
TH.Player = (function() {


    function Player(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);

        TH.global.extend.call(this.shape, params);

        _createHelpShape.call(this);
        _attachEvents.call(this);
        this.country = null;
        setInterval(function() {
            if (self.country.zones[0]) {
                self.country.zones[0].incrementHealth();
            }
        }, 5000);
    }

    Player.prototype.assignCountry = function(country) {
        var self = this;
        this.country = country;
        country.assignPlayer(this);

    };
    function _createHelpShape() {
        var sheetOptions = {
            images: [TH.global.queue.getResult('help').src],
            frames: {width:38, height:38},
            animations: {
                be: {
                    frames: [0, 2]
                }
            }
        };
        var sheet = new createjs.SpriteSheet(sheetOptions);
        this.helpShape = new createjs.Sprite(sheet);

        this.helpShape.x = this.shape.x - 45;
        this.helpShape.y = this.shape.y + 600;
        this.helpShape.alpha = 0;

        this.helpShape.gotoAndStop(0);
        TH.global.stage.addChild(this.helpShape);

    }

    function _attachEvents(){
        var self = this;
        this.helpShape.addEventListener('click', function() {
            self.helpShape.gotoAndStop(2);

            self.hideHelp();
        });
        this.helpShape.addEventListener('mouseover', function() {
            self.helpShape.gotoAndStop(1);
        });
        this.helpShape.addEventListener('mouseout', function() {
            if (self.helpShape.currentFrame == 1) {
                self.helpShape.gotoAndStop(0);
            }

        });
    }

    Player.prototype.showHelp = function() {
        var tw = createjs.Tween.get(this.helpShape).to({alpha: 1}, 100);
    };
    Player.prototype.hideHelp = function() {
        var tw = createjs.Tween.get(this.helpShape).wait(300).to({alpha: 0}, 100);
    };
    Player.prototype.zoneClickAction = function() {
        return false;
    };

    Player.prototype.zoneHoverAction = function() {
        return false;
    };

    Player.prototype.fallDown = function(callback) {
        return createjs.Tween.get(this.shape)
            .to({y: this.shape.y + 600}, 300, createjs.Ease.bounceOut);
    };

    Player.prototype.updateZones = function() {
    };


    return Player;
}());
