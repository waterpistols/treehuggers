TH = TH || {};
TH.Question = (function() {
    function Question(params) {
        params = params || {};
        params.cls = 'question hidden';
        this.template = _.template($('#questionHtml').html());
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
            self.hide();
            self.show();
        });
    }
    var questions = [
        'Is it 1 ?',
        '<i>Is it 2 ?</i>',
        'Is it 3 ?',
        'Is it 4 ?'
    ];
    Question.prototype.changeQuestion = function() {

        this.content = this.template({
            question: questions[Math.floor(Math.random() * 4)]
        });
    };
    Question.prototype.show = function() {
        this.changeQuestion();
        TH.Component.prototype.show.call(this);
    };
    return Question;
}());