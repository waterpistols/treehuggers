TH = TH || {};
TH.Tutorial = (function() {
    function Tutorial(params) {
        params = params || {};

        this.$element = $('#tutorial');
        this.template = _.template($('#tutorialTemplate').html());
        this.$element.html(this.template(steps[0]));

        TH.Component.call(this, params);

        _attachEvents.call(this);
    }

    Tutorial.prototype = Object.create(TH.Component.prototype);
    Tutorial.prototype.constructor = Tutorial;

    function _attachEvents() {
        var self = this;
        $('body').on('click', '#nextTip', function() {
            TH.global.firstLogin = 0;
            if(counter === 3) {
                counter = 1;
            } else {
                counter++;
            }

            $('#tutorial').html(self.template(steps[counter]));
            return false;
        });

        $('body').on('click', '#closeTutorial', function() {
            TH.global.firstLogin = 0;
            $('.overlay').fadeOut(1000);
            $('#tutorial').fadeOut(1000).html('');
        });
    }

    var counter = 0;

    var steps = {
        0: {
            id: 0,
            first: '-first',
            heading: 'HERE YOU ARE',
            img: '',
            title: 'Welcome, Treehugger!',
            content: 'Air pollution is a global health issue. Take the tour to quickly learn how you can do your part in helping to clear our air'
        },
        1: {
            id: 1,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut1-1.jpg" alt="tutorial" />',
            title: 'Your own quarter of the island',
            content: 'You and your friends need to work together and clear the air on the island. Your quarter is split in five zones on which you can plant trees.'
        },
        2: {
            id: 2,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut2-1.jpg" alt="tutorial" />',
            title: 'The helping hands',
            content: 'Your friends spawn on the other territories. Pay attention, they may need your assistance!'
        },
        3: {
            id: 3,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut3-1.jpg" alt="tutorial" />',
            title: 'The tools of your trade',
            content: 'You start the game with four trees. Plant them anywhere in your quarter. Answer questions to unlock more trees, but beware! Asnwering incorrectly makes the trees degrade.'
        }
    };

    Tutorial.prototype.update = function(data) {
        if(TH.global.firstLogin) {
            $('.overlay').show();
            $('.tutorial-container').show();
        }
    }

    return Tutorial;
}());
