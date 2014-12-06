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
    Country.prototype.decrementZoneHealth = function() {
        var i;
        for (i = 0; i < this.zones.length; i++) {
            if (this.zones[i].decrementHealth()) {
                return true;
            }
        }
        return false;
    };

    Country.prototype.getNoHealthZones = function() {
        var results = [], i;

        for(i = 0; i < this.zones.length; i++) {
            if (this.zones[i].hasNoHealth()) {
                results.push(this.zones[i]);
            }

        }
        return results;

    };

    return Country;
}());