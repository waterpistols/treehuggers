TH = TH || {};
TH.Zone = (function() {
    function Zone(shape, params) {
        var self = this;
        _extend.call(shape, params);
        this.shape = shape;
        var count = 0;
        this.shape.addEventListener('click', function() {
            self.shape.gotoAndStop(++count);
        });
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