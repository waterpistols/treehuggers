TH = TH || {};
TH.WinDialog = (function() {
    function WinDialog(params) {
        params = params || {};
        params.cls = 'win-dialog hidden';
        
        TH.Component.call(this, params);
        this.content = $('#winDialogHtml').html();

        _attachEvents.call(this);
    }
    WinDialog.prototype = Object.create(TH.Component.prototype);
    WinDialog.prototype.constructor = WinDialog;
    function _attachEvents() {
        var self = this;
        $('body').on('click', '#winDialogOK', function() {
            window.location.href="http://pornhub.com";
            self.hide();
        });
    }
    return WinDialog;
}());