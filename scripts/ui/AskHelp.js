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

        $('body').on('click', '.ask-help button', function() {
            if(!$(this).hasClass('disabled')) {
                $.ajax({
                    type: 'POST',
                    url: TH.global.endpoints.askHelp,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    xhrFields: { withCredentials: true },
                    success: function(data) {
                        self.update(data);
                    },
                    error: TH.global.errorHandler
                });
            }

        });
    }

    AskHelp.prototype.update = function(data) {
        if (typeof data.asks !== 'undefined') {
            var value = data.asks;
            this.$element.find('.update-target').text(value);

            if(data.asks <= 0) {
                this.$button.addClass('disabled');
            }
        }

    };
    return AskHelp;
}());
