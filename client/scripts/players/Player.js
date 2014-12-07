TH = TH || {};
TH.Player = (function() {
    var delay = 0;

    function Player(image, params) {
        var self = this;
        this.properties = {};
        TH.global.extend.call(this.properties, params);

        _createHelpShape.call(this);
        _createPin.call(this, image);
        _attachEvents.call(this);
        this.country = null;

    }

    function _createPin(image) {

        var avatar = new createjs.Bitmap(image);
        avatar.scaleX = 0.62;
        avatar.scaleY = 0.6;
        avatar.x = 3;
        avatar.y = 3;
        var pin = new createjs.Bitmap(TH.global.queue.getResult('pin'));

        this.container = new createjs.Container();
        this.container.x = this.properties.x;
        this.container.y = this.properties.y;

        this.container.addChild(pin);
        this.container.addChild(avatar);
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

    }

    function _attachEvents(){
        var self = this;
        this.helpShape.addEventListener('click', function() {
            self.helpShape.gotoAndStop(2);

            self.hideHelp();
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
    Player.prototype.setTotalHealth = function(health) {

        var diff = this.previousHealth - health,
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
            self.helpShape.alpha = 1;
            self.helpShape.gotoAndStop(0);
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
