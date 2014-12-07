TH = TH || {};
TH.PlantNow = (function() {
    function PlantNow(params) {
        params = params || {};

        TH.Component.call(this, params);

        this.$element = $('#plantNow');
        this.$button = this.$element.find('.button');
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
    PlantNow.prototype.update = function(data) {
        if (typeof data.trees !== 'undefined') {
            var value = TH.global.minTrees - data.trees,
                $target = this.$element.find('.update-target'),
                $parentTarget = $target.parent();
            if (value > 0) {
                $parentTarget.show();
                $target.text(value);
            } else {
                $parentTarget.hide();
            }
        }
    };
    PlantNow.prototype.flashButton = function() {
        var self = this;
        if (this.$button.hasClass('disabled')) {
            return;
        }
        this.$button.addClass('flash');
        setTimeout(function(){
            self.$button.removeClass('flash');
        }, 100);

    };
    return PlantNow;
}());
