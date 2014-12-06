TH = TH || {};
TH.Player = (function() {


    function Player(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);
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

    Player.prototype.zoneClickAction = function() {
        return false;
    };

    Player.prototype.fallDown = function(callback) {

        return createjs.Tween.get(this.shape)
            .to({y: this.shape.y + 400}, 300, createjs.Ease.bounceOut);

    };

    Player.prototype.updateZones = function() {
        console.log('Player.prototype.updateZones');
    };


    return Player;
}());