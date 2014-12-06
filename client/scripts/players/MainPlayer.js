TH = TH || {};
TH.MainPlayer = (function() {
    function MainPlayer(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);
        TH.global.extend.call(this.shape, params);

        this.trees = 1;
        this.country = null;
    }

    MainPlayer.prototype = Object.create(TH.Player.prototype);
    MainPlayer.prototype.constructor = MainPlayer;

    MainPlayer.prototype.checkHasWon = function() {
        var zones = this.country.getNoHealthZones();

        if (!zones.length) {
            TH.ui.components.winDialog.show();
            return true;
        }
        return false;
    };

    MainPlayer.prototype.zoneClickAction = function() {
        if (!this.trees) {
            TH.ui.components.question.show();
            return false;
        }
        this.decrementTrees();
        return true;
    };

    MainPlayer.prototype.decrementTrees = function() {
        this.trees--;
    };

    MainPlayer.prototype.incrementTrees = function() {
        this.trees++;
    };

    return MainPlayer;
}());
