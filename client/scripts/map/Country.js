TH = TH || {};
TH.Country = (function() {
    function Country(params) {

        this.container = new createjs.Container();
        TH.global.extend.call(this.container, params);
        _setupNotifier.call(this);
        this.zones     = [];
        this.player    = null;

    }

    function _setupNotifier() {
        var bounds = this.container.getBounds() || {},
            posX = Math.floor(this.container.x + ( bounds.width || 0) / 2),
            posY = Math.floor(this.container.y + ( bounds.height || 0) / 2);

        this.notifier =  new TH.Notifier(posX, posY);
    }

    Country.prototype.addZone = function(zone) {
        this.zones.push(zone);
        this.container.addChild(zone.shape);
        _setupNotifier.call(this);
    };

    Country.prototype.assignPlayer = function(player) {
        this.player = player;
    };

    Country.prototype.addToIsland = function(island) {
        island.addCountry(this);
    };

    Country.prototype.decrementZoneHealth = function(zoneId) {
        var i;
        for (i = 0; i < this.zones.length; i++) {
            if (this.zones[i].id === parseInt(zoneId)) {
                this.zones[i].decrementHealth();
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

    Country.prototype.updatePlayer = function() {
        if (this.player) {
            this.player.updateZones();
        }
    };

    return Country;
}());
