TH = TH || {};
TH.Zone = (function() {
    var maxHealth = 2;
    function Zone(shape, params) {
        var self = this;
        TH.global.extend.call(shape, params);
        this.shape = shape;
        this.health = 0;

        this.shape.addEventListener('click', function() {
            var player;

            if (!self.hasNoHealth()) {
                return;
            }

            player = self.country.player;
            if (player.zoneClickAction()) {
                self.fullHealth();
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
    Zone.prototype.fullHealth = function() {
        this.health = maxHealth;
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