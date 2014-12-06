TH = TH || {};
TH.Island = (function() {
    function Island(container, params) {
        var self = this;
        TH.global.extend.call(container, params);
        this.container = new createjs.Container();
        this.countries = [];

        setInterval(function() {
            self.updateCountries();
        }, 1000);

    }

    Island.prototype.addCountry = function(country) {
        this.countries.push(country);
        this.container.addChild(country.container);
    };

    Island.prototype.popIn = function() {

        var containerBounds = this.container.getBounds();
        var centerX = containerBounds.width / 2; // 0.02 scale = 10px
        var centerY = containerBounds.height / 2; // 0.02 scale = 10px

        var firstLogin = true;
        if(typeof firstLogin !== 'undefined') {
            this.container.x = TH.global.properties.canvasWidth / 2;
            this.container.y = TH.global.properties.canvasHeight / 2;
            this.container.regX = centerX;
            this.container.regY = centerY;

            this.container.scaleX = .1;
            this.container.scaleY = .1;

            createjs.Tween.get(this.container)
                .to({scaleX: 1.2, scaleY: 1.2}, 500, createjs.Ease.linear)
                .to({scaleX: 1, scaleY: 1}, 800, createjs.Ease.bounceOut).call(TH.players.placePlayers.bind(TH.players));

            // Regular user
        } else {
            this.container.x = centerX;
            this.container.y = centerY;

            createjs.Tween.get(this.container)
                .to({x: centerX + 10, scaleX: 0.98, scaleY: 0.98}, 100, createjs.Ease.linear)
                .to({x: centerX, scaleX: 1, scaleY: 1}, 100, createjs.Ease.linear).call(TH.players.placePlayers.bind(TH.players));
        }
    };
    Island.prototype.updateCountries = function() {
        var i;

        for (i = 0; i < this.countries.length; i++) {
            this.countries[i].updatePlayer();

        }
    };


    return Island;
}());
