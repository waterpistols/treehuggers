var TH = TH || {};

TH.global = (function() {

    var api = 'http://local.dev/api/';

    return {
        endpoints: {
            users: api + 'users'
        },
        properties: {},
        init : function() {
            this.properties.canvasWidth = 960;
            this.properties.canvasHeight = 533;
        },
        extend: function(params) {

            var key;

            for(key in params) {
                if (params.hasOwnProperty(key) === true) {
                    this[key] = params[key];
                }
            }

        }
    }
}());
