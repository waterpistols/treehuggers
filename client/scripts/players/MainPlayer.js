TH = TH || {};
TH.MainPlayer = (function() {


    function MainPlayer(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);
        TH.global.extend.call(this.shape, params);

        this.country = null;

        this.fetchData(function(response) {

            if (response) {
                self.trees = response.trees;
                TH.ui.updateComponents(response);
                TH.map.updateZones(response);
            }
            TH.global.stateSubscribe(self.stateUpdateHandler, self);
            self.updateState();
        });


    }

    MainPlayer.prototype = Object.create(TH.Player.prototype);
    MainPlayer.prototype.constructor = MainPlayer;

    MainPlayer.prototype.checkHasWon = function() {
        var zones = this.country.getNoHealthZones();

        if (!zones.length) {
            TH.ui.components.winDialog.show();
            return true;
        }

        return false;
    };

    MainPlayer.prototype.zoneClickAction = function() {

        if (TH.global.isState('PLANTING_TREES') === true) {
            this.decrementTrees(TH.global.minTrees);

            return true;
        }

        TH.ui.components.plantNow.flashButton();

        return false;
    };
    MainPlayer.prototype.zoneHoverAction = function() {
        if (TH.global.isState('PLANTING_TREES') === true) {
            return true;
        }

        return false;
    };

    MainPlayer.prototype.updateState =  function() {
        if (this.trees < TH.global.minTrees) {
            TH.global.setState('IDLE');
        } else {
            TH.global.setState('CAN_PLANT_TREES');
        }
    };

    MainPlayer.prototype.decrementTrees = function(value) {
        if (value) {
            this.trees -= value;
        } else {
            this.trees--;
        }
        this.updateState();
    };

    MainPlayer.prototype.incrementTrees = function() {
        this.trees++;
        this.updateState();
    };

    MainPlayer.prototype.updateZones = function() {
    };

    MainPlayer.prototype.stateUpdateHandler = function() {
        if (TH.global.isState('PLANTING_TREES') === true) {
            $('body').addClass('enable-dynamic-cursor');
        } else {
            $('body').removeClass('enable-dynamic-cursor');
        }
        TH.ui.updateComponents({trees: this.trees});
    };
    MainPlayer.prototype.fetchData = function(successCallback) {
        $.ajax({
            type: 'GET',
            url: TH.global.endpoints.user,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: successCallback,
            error: function(error) {
                alert('Well ..' + error);
            }
        });
    };

    return MainPlayer;
}());
