var TH = TH || {};

TH.ui = (function() {



    return {
        components: {},

        init : function() {
            this.createQuestionComponent();
        },
        createQuestionComponent: function() {
            this.components.question = new TH.Question();
        }
    }
}());
