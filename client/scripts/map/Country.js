TH = TH || {};
TH.Country = (function() {
    function Country(params) {

        this.container = new createjs.Container();
        TH.global.extend.call(this.container, params);

        this.zones     = [];
        this.player    = null;
    }
    Country.prototype.addZone = function(zone) {
        this.zones.push(zone);
        this.container.addChild(zone.shape);
    };
    Country.prototype.assignPlayer = function(player) {
        this.player = player;
    };
    Country.prototype.addToIsland = function(island) {
        island.addCountry(this);
    };

    return Country;
}());