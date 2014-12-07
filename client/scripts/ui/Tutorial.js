TH = TH || {};
TH.Tutorial = (function() {
    function Tutorial(params) {
        params = params || {};

        this.$element = $('#tutorial');
        this.template = _.template($('#tutorialTemplate').html());
        this.$element.html(this.template(steps[1]));

        TH.Component.call(this, params);

        _attachEvents.call(this);
    }

    Tutorial.prototype = Object.create(TH.Component.prototype);
    Tutorial.prototype.constructor = Tutorial;

    function _attachEvents() {
        var self = this;
        $('body').on('click', '.next-tip', function() {
            if(counter === 3) {
                counter = 1;
            } else {
                counter++;
            }

            $('#tutorial').html(self.template(steps[counter]));
            return false;
        });

        $('body').on('click', '.close-tutorial', function() {
            $('.overlay').fadeOut(1000);
            $('#tutorial').fadeOut(1000).html('');
        });
    }

    var counter = 1;

    var steps = {
        1: {
            id: 1,
            img: 'assets/images/tut1-1.jpg',
            title: 'Your activity zone on the island',
            content: 'You own a quarter of the island. You and your friends need to get together and save the island. Your quarter is splitted in 5 zones on which you can plant trees.'
        },
        2: {
            id: 2,
            img: 'assets/images/tut2-1.jpg',
            title: '2',
            content: '2'
        },
        3: {
            id: 3,
            img: 'assets/images/tut3-1.jpg',
            title: '3',
            content: '3'
        }
    };
    return Tutorial;
}());
