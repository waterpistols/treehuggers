TH = TH || {};
TH.Zone = (function() {
    var maxHealth = 2;
    function Notifier(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    Notifier.prototype.setText = function(text, font, color) {
        var font = font || 'Arial 14px bold';
        this.label = new createjs.Text(text, font, color);
    };

    Notifier.prototype.incrementedHealth = function(health) {
        this.setText('+' + health, null, '#33ff88');
        debugger;
        var tw = createjs.Tween.get(this.label);
    };

    function Zone(shape, params) {
        var self = this;
        TH.global.extend.call(shape, params);
        this.shape = shape;
        this.health = 0;

//        this.notifier =  new Notifier(this.shape.x, this.shape.y);

        this.shape.addEventListener('click', function() {
            var player;

            if (!self.hasNoHealth()) {
                return;
            }

            player = self.country.player;
            if (player.zoneClickAction()) {
                self.setFullHealth();
                player.checkHasWon();
            }
        });
    }

    Zone.prototype.addToCountry = function(country) {
        this.country = country;
        country.addZone(this);
    };
    Zone.prototype.update = function() {
        this.shape.gotoAndStop(this.health);
    };
    Zone.prototype.setFullHealth = function() {
        this.health = maxHealth;
//        this.notifier.incrementedHealth(this.health);
        this.update();
    };
    Zone.prototype.hasFullHealth = function() {
        if (this.health === maxHealth) {
            return true;
        }
        return false;
    };
    Zone.prototype.hasNoHealth = function() {
        if (this.health === 0) {
            return true;
        }
        return false;
    };
    Zone.prototype.incrementHealth = function() {
        if (this.health < maxHealth) {
            this.health++;
            this.update();
//            this.notifier.incrementedHealth(this.health);
            return true;
        }
        return false;
    };
    Zone.prototype.decrementHealth = function() {
        if (this.health) {
            this.health--;
            this.update();
            return true;
        }
        return false;

    };

    return Zone;
}());