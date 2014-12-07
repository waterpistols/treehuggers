TH = TH || {};
TH.AskHelp = (function() {
    function AskHelp(params) {
        params = params || {};

        TH.Component.call(this, params);


        this.$element = $('#askHelp');
        this.$button = this.$element.find('.button');

        _attachEvents.call(this);
    }

    AskHelp.prototype = Object.create(TH.Component.prototype);
    AskHelp.prototype.constructor = AskHelp;

    function _attachEvents() {
        var self = this;

    }

    return AskHelp;
}());
