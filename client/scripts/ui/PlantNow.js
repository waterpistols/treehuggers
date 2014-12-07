TH = TH || {};
TH.PlantNow = (function() {
    function PlantNow(params) {
        params = params || {};

        TH.Component.call(this, params);

        this.$element = $('#plantNow');
        this.$button = $('#plantNowButton');
        TH.global.stateSubscribe(this.stateUpdateHandler, this);

        _attachEvents.call(this);
    }

    PlantNow.prototype = Object.create(TH.Component.prototype);
    PlantNow.prototype.constructor = PlantNow;
    
    function _attachEvents() {
        var self = this;
        this.$button.on('click', function() {
            if (self.$button.hasClass('disabled')) {
                return false;
            }
            TH.global.setState('PLANTING_TREES');
        });
    }
    PlantNow.prototype.stateUpdateHandler = function() {
        if (TH.global.isState('CAN_PLANT_TREES') === true) {
            this.$button.removeClass('disabled');
        } else {
            this.$button.addClass('disabled');
        }

        if (TH.global.isState('PLANTING_TREES') === true) {
            this.$button.removeClass('disabled');
            this.$button.addClass('active');
        } else {
            this.$button.removeClass('active');
        }

    };
    PlantNow.prototype.setTreeNeedText = function() {
        this.$element.find('')
    };
    return PlantNow;
}());
