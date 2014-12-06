TH = TH || {};
TH.Question = (function() {
    function Question(params) {
        params = params || {};
        params.cls = 'question hidden';
        params.content = 'How are you ?';
        TH.Component.call(this, params);
    }
    Question.prototype = Object.create(TH.Component.prototype);
    Question.prototype.constructor = Question;

    return Question;
}());