TH = TH || {};
TH.Question = (function() {
    function Question(params) {
        params = params || {};
        params.cls = 'question hidden';

        dbQuestion = this.getQuestion();

        this.template = _.template($('#question-' + dbQuestion['type'] + '-Html').html());
        TH.Component.call(this, params);

        _attachEvents.call(this);
    }

    Question.prototype = Object.create(TH.Component.prototype);
    Question.prototype.constructor = Question;

    function _attachEvents() {
        var self = this;
        $('body').on('click', '#next', function() {
            dbQuestion['info'] = false;

            self.content = self.template({question: dbQuestion});
            TH.Component.prototype.show.call(self);
        });

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

    Question.prototype.getQuestion = function() {
        dbQuestion = {
            'text': 'Are you ok?',
            'info': 'http://www.createjs.com/Docs/PreloadJS/assets/docs-icon-PreloadJS.png',
            'info': 'text',
            'type': 'Input',
            'answers': [
                {
                    'id': 1,
                    'text': 'Yes',
                    'correct': false
                },
                {
                    'id': 2,
                    'text': 'No',
                    'correct': true
                }
            ]
        };

        dbQuestion['info'] = this.parseInfografic(dbQuestion['info']);
        return dbQuestion;
    };

    Question.prototype.parseInfografic = function(info) {
        if(info === '') {
            return false;
        } else if (info.indexOf('http://') === 0) {
            return '<img src="' + info + '" />';
        } else {
            return info;
        }
    };

    Question.prototype.changeQuestion = function() {
        dbQuestion = this.getQuestion();
        this.template = _.template($('#question-' + dbQuestion['type'] + '-Html').html());
        this.content = this.template({ question: dbQuestion});
    };

    Question.prototype.show = function() {
        this.changeQuestion();
        TH.Component.prototype.show.call(this);
    };
    return Question;
}());
