TH = TH || {};
TH.Zone = (function() {
    function Zone(shape, params) {
        var self = this;
        TH.global.extend.call(shape, params);
        this.shape = shape;
        var count = 0;

        this.shape.addEventListener('click', function() {
            var player = self.country.player;

            if (player.zoneClickAction()) {
                self.shape.gotoAndStop(++count);
            }
        });
    }

    Zone.prototype.addToCountry = function(country) {
        this.country = country;
        country.addZone(this);
    };

    return Zone;
}());