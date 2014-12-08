TH = TH || {};
TH.AirPollution = (function() {
    function AirPollution(params) {
        params = params || {};

        TH.Component.call(this, params);


        this.$element = $('#airPollution');
        this.$button = this.$element.find('.button');

        _attachEvents.call(this);
    }

    AirPollution.prototype = Object.create(TH.Component.prototype);
    AirPollution.prototype.constructor = AirPollution;

    function _attachEvents() {
        var self = this;

    }
    AirPollution.prototype.update = function(data) {
        if (typeof data.pollution !== 'undefined') {
            var value = data.pollution;
            this.$element.find('.update-target').text(value);
        }
    };
    return AirPollution;
}());
