TH = TH || {};
TH.YouHave = (function() {
    function YouHave(params) {
        params = params || {};

        TH.Component.call(this, params);

        this.$element = $('#plantNow');
        this.$button = this.$element.find('.button');
        TH.global.stateSubscribe(this.stateUpdateHandler, this);

        _attachEvents.call(this);
    }

    YouHave.prototype = Object.create(TH.Component.prototype);
    YouHave.prototype.constructor = YouHave;

    function _attachEvents() {
        var self = this;

    }

    return YouHave;
}());
