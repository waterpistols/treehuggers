TH = TH || {};
TH.Notifier = (function() {
    function Notifier(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    Notifier.prototype.setText = function(text, font, color) {
        var font = font || '20px Arial';
        this.label = new createjs.Text(text, font, color);
        this.label.x = this.posX;
        this.label.y = this.posY;
        TH.global.stage.addChild(this.label);
    };

    Notifier.prototype.incrementedHealth = function(health) {
        this.setText('+' + health, null, '#33ff88');
        return createjs.Tween.get(this.label).to({y: this.label.y - 200, alpha: 0}, 1000);
    };
    Notifier.prototype.decrementedHealth = function(health) {
        this.setText('-' + health, null, '#ff3388');
        return createjs.Tween.get(this.label).to({y: this.label.y - 200, alpha: 0}, 1000);
    };


    return Notifier;
}());
