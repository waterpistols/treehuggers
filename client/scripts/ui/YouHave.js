TH = TH || {};
TH.YouHave = (function() {
    function YouHave(params) {
        params = params || {};

        TH.Component.call(this, params);

        this.$element = $('#youHave');
        this.$button = this.$element.find('.button');


        _attachEvents.call(this);
    }

    YouHave.prototype = Object.create(TH.Component.prototype);
    YouHave.prototype.constructor = YouHave;

    function _attachEvents() {
        var self = this;

    }
    YouHave.prototype.update = function(data) {
        if (typeof data.trees !== 'undefined') {
            var value = data.trees;
            this.$element.find('.update-target').text(value);
        }
    };

    return YouHave;
}());
