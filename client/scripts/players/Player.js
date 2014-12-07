TH = TH || {};
TH.Player = (function() {


    function Player(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);
        _createHelpShape.call(this);

        TH.global.extend.call(this.shape, params);
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
            frames: {width:421, height:152},
            animations: {
                be: [0, 3, true]
            }
        };

        var sheet = new createjs.SpriteSheet(sheetOptions),
            sprite = new createjs.Sprite(sheet);

        this.helpShape = new createjs.Bitmap(TH.global.queue.getResult('help'));
    }



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
