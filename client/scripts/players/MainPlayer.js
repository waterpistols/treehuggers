TH = TH || {};
TH.MainPlayer = (function() {

    var minTrees = 4;
    function MainPlayer(image, params) {
        var self = this;

        this.shape = new createjs.Bitmap(image.src);
        TH.global.extend.call(this.shape, params);
        this.trees = 4;
        this.country = null;

//        this.fetchData(function(response) {
//
//            this.updateState();
//        });



    }

    MainPlayer.prototype = Object.create(TH.Player.prototype);
    MainPlayer.prototype.constructor = MainPlayer;

    MainPlayer.prototype.checkHasWon = function() {
        var zones = this.country.getNoHealthZones();

        if (!zones.length) {
            TH.ui.components.winDialog.show();
            return true;
        }
        TH.global.stateSubscribe(this.stateUpdateHandler, this);
        return false;
    };

    MainPlayer.prototype.zoneClickAction = function() {
        if (TH.global.isState('PLANTING_TREES') === true) {
            this.decrementTrees(minTrees);
            return true;
        }

        return false;
    };
    MainPlayer.prototype.zoneHoverAction = function() {
        if (TH.global.isState('PLANTING_TREES') === true) {
            return true;
        }

        return false;
    };

    MainPlayer.prototype.updateState =  function() {
        if (this.trees < minTrees) {
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
        TH.components.plantNow.setTreeNeedText(minTrees - this.trees);
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
