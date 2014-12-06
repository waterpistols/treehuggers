TH = TH || {};
TH.Component = (function() {
    
    function Component(params) {
        this.$element = $('<div class="' + params.cls + '"></div>');
        this.content = '';
        $('body').append(this.$element);
    }

    Component.prototype.show = function() {
        this.$element.html(this.content);
        this.$element.show();
    };

    Component.prototype.hide = function() {
        this.$element.hide();
    };

    return Component;
}());
