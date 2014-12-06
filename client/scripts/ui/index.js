var TH = TH || {};

TH.ui = (function() {
    return {
        components: {},

        init : function() {
            this.createComponents();
        },

        createComponents: function() {
            this.components.question = new TH.Question();
            this.components.winDialog = new TH.WinDialog();
        }
    }
}());
