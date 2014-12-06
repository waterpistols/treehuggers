TH = TH || {};
TH.Country = (function() {
    function Country(container, params) {
        _extend.call(container, params);
        this.container = new createjs.Container();
        this.zones = [];
    }
    Country.prototype.addZone = function(zone) {
        this.zones.push(zone);
        this.container.addChild(zone.shape);
    };
    Country.prototype.addToIsland = function(island) {
        island.addCountry(this);
    };
    function _extend(params) {
        var key;

        for(key in params) {
            if (params.hasOwnProperty(key) === true) {
                this[key] = params[key];
            }
        }
    }

    return Country;
}());