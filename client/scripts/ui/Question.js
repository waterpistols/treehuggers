TH = TH || {};
TH.Question = (function() {
    function Question(params) {
        params = params || {};
        params.cls = 'question hidden';
        params.content = $('#questionHtml').html();
        TH.Component.call(this, params);

        _attachEvents.call(this);
    }
    Question.prototype = Object.create(TH.Component.prototype);
    Question.prototype.constructor = Question;
    function _attachEvents() {
        var self = this;
        $('body').on('click', '#questionYes', function() {
            TH.players.players.red.incrementTrees();
            self.hide();
        });
        $('body').on('click', '#questionNo', function() {


            TH.players.players.red.country.decrementZoneHealth();

        });
    }
    return Question;
}());