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
            if(counter === 3) {
                counter = 1;
            } else {
                counter++;
            }

            $('#tutorial').html(self.template(steps[counter]));
            return false;
        });

        $('body').on('click', '#closeTutorial', function() {
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
            title: 'Treehuggers explained',
            content: 'Hello'
        },
        1: {
            id: 1,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut1-1.jpg" alt="tutorial" />',
            title: 'Your activity zone on the island',
            content: 'You own a quarter of the island. You and your friends need to get together and save the island. Your quarter is splitted in 5 zones on which you can plant trees.'
        },
        2: {
            id: 2,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut2-1.jpg" alt="tutorial" />',
            title: '2',
            content: '2'
        },
        3: {
            id: 3,
            first: '',
            heading: 'TUTORIAL',
            img: '<img src="assets/images/tut3-1.jpg" alt="tutorial" />',
            title: '3',
            content: '3'
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
