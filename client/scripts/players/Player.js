TH = TH || {};
TH.Player = (function() {


    function Player(image, params) {
        var self = this;
        this.shape = new createjs.Bitmap(image.src);
        TH.global.extend.call(this.shape, params);

        this.country = null;
    }

    Player.prototype.assignCountry = function(country) {
        this.country = country;
        country.assignPlayer(this);
    };

    Player.prototype.zoneClickAction = function() {
        return false;
    };

    Player.prototype.fallDown = function(callback) {

        return createjs.Tween.get(this.shape)
            .to({y: this.shape.y + 400}, 300, createjs.Ease.bounceOut);

    };


    return Player;
}());