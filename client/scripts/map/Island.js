TH = TH || {};
TH.Island = (function() {
    function Island(container, params) {
        TH.global.extend.call(container, params);
        this.container = new createjs.Container();
        this.countries = [];

    }
    Island.prototype.addCountry = function(country) {
        this.countries.push(country);
        this.container.addChild(country.container);
    };
    Island.prototype.popIn = function() {

        var containerBounds = this.container.getBounds();
        var centerX = TH.global.properties.canvasWidth / 2 - containerBounds.width / 2; // 0.02 scale = 10px
        var centerY = TH.global.properties.canvasHeight / 2 - containerBounds.height / 2; // 0.02 scale = 10px

        var firstLogin = true;
        if(typeof firstLogin !== 'undefined') {
            this.container.x = TH.global.properties.canvasWidth / 2.2;
            this.container.y = TH.global.properties.canvasHeight / 2.2;

            this.container.scaleX = .1;
            this.container.scaleY = .1;

            createjs.Tween.get(this.container)
                .to({x:-40, y: -40, scaleX: 1.5, scaleY: 1.5}, 500, createjs.Ease.linear)
                .to({x: centerX, y: centerY, scaleX: 1, scaleY: 1}, 800, createjs.Ease.bounceOut).call(TH.players.placePlayers.bind(TH.players));

            // Regular user
        } else {
            this.container.x = centerX;
            this.container.y = centerY;

            createjs.Tween.get(this.container)
                .to({x: centerX + 10, scaleX: 0.98, scaleY: 0.98}, 100, createjs.Ease.linear)
                .to({x: centerX, scaleX: 1, scaleY: 1}, 100, createjs.Ease.linear).call(TH.players.placePlayers.bind(TH.players));
        }
    };


    return Island;
}());
