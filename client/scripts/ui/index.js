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
            this.components.plantNow = new TH.PlantNow();
            this.components.takeQuiz = new TH.TakeQuiz();
            this.components.askHelp = new TH.AskHelp();
            this.components.airPollution = new TH.AirPollution();
            this.components.avatar = new TH.Avatar();
            this.components.youHave = new TH.YouHave();
        },
        updateComponents: function(data) {

            for (var key in this.components) {
                if (this.components.hasOwnProperty(key) === true) {
                    this.components[key].update(data);
                }
            }

        }
    }
}());
