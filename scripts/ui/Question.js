TH = TH || {};
TH.Question = (function() {
    function Question(params) {
        params = params || {};
        params.cls = 'question hidden';

        var self = this;
        dbQuestion = this.getQuestion(function(dbQuestion) {
            self.template = _.template($('#question-' + dbQuestion['type'] + '-Html').html());
            TH.Component.call(self, params);

            TH.global.stateSubscribe(self.stateUpdateHandler, self);

            _attachEvents.call(self);
        });
    }
    Question.prototype = Object.create(TH.Component.prototype);
    Question.prototype.constructor = Question;

    function _attachEvents() {
        var self = this;
        $('body').on('click', '#close', function() {
            self.hide();

            TH.players.players.red.updateState();
        });

        $('body').on('click', '#next', function() {
            dbQuestion['info'] = false;
            self.content = self.template({question: dbQuestion});
            TH.Component.prototype.show.call(self);
            $('#nextQuestion').hide();
            $('#sendResponse').show();
        });

        $('body').on('click', '#nextQuestion', function() {
            self.hide();
            self.show();
        });

        $('body').on('click', '#sendResponse', function() {
            var payload = {
                'questionId': dbQuestion['id']
            };

            // Validate Answer
            switch(dbQuestion['type']) {
                case 'Dropdown':
                    var value = $('#response').val();
                    payload['answerId'] = value;
                    break;

                case 'Radio':
                    var value = $('.response:checked').val();
                    payload['answerId'] = value;
                    break;

                case 'Input':
                    var value = $('#response').val();
                    payload['answerId'] = 0;
                    payload['answerText'] = value;
                    break;
            }

            if(dbQuestion['type'] === 'Input' && !value) {
                $('.error-input').show();
            } else {
                $('.error-input').hide();
                $.ajax({
                    type: 'POST',
                    url: TH.global.endpoints.questions,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(payload),
                    dataType: 'json',
                    xhrFields: { withCredentials: true },
                    success: function(data) {
                        if(data['correct']) {
                            TH.players.players.red.incrementTrees();
                            TH.ui.updateComponents({points: parseInt(data.points)});
                            $('.success-message').show();
                            $('#nextQuestion').show();
                            $('#sendResponse').hide();
                        } else {
                            if (data.zones[0]) {
                                TH.players.players.red.country.decrementZoneHealth(data.zones[0].zone_id);
                            }
                            $('.error-message').show();
                            $('#response').attr('disabled', 'disabled');
                            $('#sendResponse').hide();
                            $('#nextQuestion').show();
                        }
                    },
                    error: TH.global.errorHandler
                });
            }
        });
    }

    Question.prototype.getQuestion = function(callback) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: TH.global.endpoints.questions,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function(data) {
                dbQuestion = data;
                dbQuestion['info'] = self.parseInfografic(dbQuestion['info']);
                if(callback) {
                    callback(dbQuestion);
                }
            },
            error: TH.global.errorHandler
        });
    };

    Question.prototype.parseInfografic = function(info) {

        if(!info) {
            return false;
        } else if (info.indexOf('http://') === 0) {
            return '<img src="' + info + '" alt="info"/>';
        } else {
            return false;
            return info;
        }
    };

    Question.prototype.changeQuestion = function(callback) {
        var self = this;
        dbQuestion = this.getQuestion(function(dbQuestion) {
            self.template = _.template($('#question-' + dbQuestion['type'] + '-Html').html());
            self.content = self.template({ question: dbQuestion});
            callback();
        });
    };

    Question.prototype.show = function() {
        self = this;

        this.changeQuestion(function() {
            TH.global.setState('QUIZ');
            TH.Component.prototype.show.call(self);
            $('.next-question').hide();
        });

    };


    Question.prototype.stateUpdateHandler = function() {
        if(TH.global.isState('QUIZ') === true) {
            this.show();
        } else {
            this.hide();
        }

    };
    return Question;
}());
