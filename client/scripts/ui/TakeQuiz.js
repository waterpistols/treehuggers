TH = TH || {};
TH.TakeQuiz = (function() {
    function TakeQuiz(params) {
        params = params || {};

        TH.Component.call(this, params);


        this.$element = $('#takeQuiz');
        this.$button = this.$element.find('.button');
        TH.global.stateSubscribe(this.stateUpdateHandler, this);

        _attachEvents.call(this);
    }

    TakeQuiz.prototype = Object.create(TH.Component.prototype);
    TakeQuiz.prototype.constructor = TakeQuiz;
    TakeQuiz.prototype.stateUpdateHandler = function() {

        if (TH.global.isState('QUIZ') === true || TH.global.isState('PLANTING_TREES') === true) {
            this.$button.addClass('disabled');
        } else {
            this.$button.removeClass('disabled');
        }
    };

    function _attachEvents() {
        var self = this;

        this.$button.on('click', function() {
            if (self.$button.hasClass('disabled')) {
                return false;
            }
            TH.global.setState('QUIZ');
        });
    }

    return TakeQuiz;
}());
