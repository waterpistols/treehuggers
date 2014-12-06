TH = TH || {};
TH.Zone = (function() {
    function Zone(shape, params) {
        _extend.call(shape, params);
        this.shape = shape;
    }

    Zone.prototype.addToCountry = function(country) {
        country.addZone(this);
    };
    function _extend(params) {
        var key;

        for(key in params) {
            if (params.hasOwnProperty(key) === true) {
                this[key] = params[key];
            }
        }
    }

    return Zone;
}());