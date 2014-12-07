TH = TH || {};
TH.Preloader = (function() {
    function Preloader(params) {
        params = params || {};

        TH.Component.call(this, params);

        this.loadSteps = {
            'assets' : false,
            'mainPlayer' : false,
            'otherPlayers' : false
        };
        this.loadCallbacks = {
            'assets' : null,
            'mainPlayer' : null,
            'otherPlayers' : null,
            'all': null
        };
        this.$element = $('#preloader');

        _attachEvents.call(this);
    }

    Preloader.prototype = Object.create(TH.Component.prototype);
    Preloader.prototype.constructor = Preloader;

    function _attachEvents() {
        var self = this;
    }
    Preloader.prototype.setCallbacks = function(callbacks) {
        for (var key in callbacks) {
            this.loadCallbacks[key] = callbacks[key];
        }
    };
    Preloader.prototype.setLoadedStep = function(stepName, callback) {
        this.loadSteps[stepName] = true;
        if (this.loadCallbacks[stepName]) {
            this.loadCallbacks[stepName]();
        }
        this.checkSteps();
    };
    Preloader.prototype.checkSteps = function() {
        var step;

        for (step in this.loadSteps) {
            if (this.loadSteps.hasOwnProperty(step) === true) {
                if (this.loadSteps[step] === false) {
                    return false;
                }
            }
        }

        if (this.loadCallbacks['all']) {
            this.loadCallbacks['all']();
        }

        this.hide();
        return true;
    };
    Preloader.prototype.hide = function() {
        this.$element.hide();
        $('body').css({'background-image': 'none'});
    };

    return Preloader;
}());
