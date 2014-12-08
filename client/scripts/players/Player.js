TH = TH || {};
TH.Player = (function() {
    var delay = 0;

    function Player(id, image, params) {
        var self = this;
        this.id = id;
        this.properties = {};
        TH.global.extend.call(this.properties, params);

        _createHelpShape.call(this);
        _createPin.call(this, image);
        _attachEvents.call(this);
        this.country = null;
    }

    function _createPin(image) {

        var pin = new createjs.Bitmap(TH.global.queue.getResult('pin'));
        var circle = new createjs.Shape();

        var img = new Image();
        img.src = image;
        img.style.width = '13px';

        img.onload = function() {
            circle.graphics.beginBitmapFill(img, "no-repeat").drawCircle(19,19,14);
        };


        this.container = new createjs.Container();
        this.container.x = this.properties.x;
        this.container.y = this.properties.y;

        this.container.addChild(pin);
        this.container.addChild(circle);
        this.fallDown();

    }
    Player.prototype.assignCountry = function(country) {
        var self = this;
        this.country = country;
        country.assignPlayer(this);

    };
    function _createHelpShape() {
        var sheetOptions = {
            images: [TH.global.queue.getResult('help').src],
            frames: {width:38, height:38},
            animations: {
                be: {
                    frames: [0, 2]
                }
            }
        };
        var sheet = new createjs.SpriteSheet(sheetOptions);
        this.helpShape = new createjs.Sprite(sheet);

        this.helpShape.x = this.properties.x - 45;
        this.helpShape.y = this.properties.y;
        this.helpShape.alpha = 0;

        this.helpShape.gotoAndStop(0);
        TH.global.stage.addChild(this.helpShape);
        this.previousHealth = 0;
        this.showHelpLock = false;

    }

    function _attachEvents() {
        var self = this;
        this.helpShape.addEventListener('click', function() {
            if (TH.players.players.red.trees <= 0) {
                return false;
            }
            self.helpShape.gotoAndStop(2);
            self.helpPlayer();

        });
        this.helpShape.addEventListener('mouseover', function() {
            self.helpShape.gotoAndStop(1);
        });
        this.helpShape.addEventListener('mouseout', function() {
            if (self.helpShape.currentFrame == 1) {
                self.helpShape.gotoAndStop(0);
            }

        });
    }
    Player.prototype.helpPlayer = function() {
        var self = this;
        var payload = {
            user_id: this.id
        };

        this.showHelpLock = true;

        $.ajax({
            type: 'post',
            url: TH.global.endpoints.help,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(payload),
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: function(response) {

                if (response) {
                    TH.players.players.red.setTrees(parseInt(response.trees));
                }

                setTimeout(function(){
                    self.showHelpLock = false;
                }, 1000);

            },
            error: function(error) {
                self.ajaxRequest = null;
                setTimeout(function(){
                    self.showHelpLock = false;
                }, 1000);
                TH.global.errorHandler(error);
            }
        });
    };
    Player.prototype.setTotalHealth = function(health) {

        var diff = health - this.previousHealth,
            self = this;

        if (health < 5) {
            setZoneHealth(0);
            return;
        }
        if (health < 8) {
            setZoneHealth(1);
            return;
        }
        if (health < 11) {
            setZoneHealth(2);
            return;
        }

        setZoneHealth(3);
        return;

        function setZoneHealth(value) {
            if (diff > 0) {
                self.country.zones[0].notifier.incrementedHealth(Math.abs(diff));
            } else if (diff < 0) {
                self.country.zones[0].notifier.decrementedHealth(Math.abs(diff));
            }
            self.previousHealth = health;
            self.country.zones[0].setHealth(value);
        }

    };

    Player.prototype.showHelp = function() {
        var self = this;

        setTimeout(function() {
            if (!self.showHelpLock) {
                self.helpShape.alpha = 1;
                self.helpShape.gotoAndStop(0);
            }
        }, 1000);
    };

    Player.prototype.hideHelp = function() {
        this.helpShape.alpha = 0;

    };
    Player.prototype.zoneClickAction = function() {
        return false;
    };

    Player.prototype.zoneHoverAction = function() {
        return false;
    };

    Player.prototype.fallDown = function(callback) {
        this.container.y -= 600;
        return createjs.Tween.get(this.container)
            .wait((++delay) * 300)
            .to({y: this.container.y + 600}, 300, createjs.Ease.bounceOut);
    };

    Player.prototype.updateZones = function() {
    };


    return Player;
}());
