TH = TH || {};
TH.Component = (function() {
    function Component(params) {

        this.$element = $('<div class="' + params.cls + '">' + params.content + '</div>');
        $('body').append(this.$element);
    }
    Component.prototype.show = function() {
        this.$element.show();
    };
    Component.prototype.hide = function() {
        this.$element.hide();
    };

    return Component;
}());