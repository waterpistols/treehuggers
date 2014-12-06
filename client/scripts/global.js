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
        }
    }
}());
