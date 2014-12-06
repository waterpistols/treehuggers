var TH = TH || {};

TH.global = (function() {

    var baseUrl = 'http://local.dev/';
    var api = baseUrl + 'api/';

    return {
        clientUrl: baseUrl + 'client/',
        endpoints: {
            questions: api + 'questions',
            login: api + 'login',
            logout: api + 'logout',
            users: api + 'users'
        },
        properties: {},
        init : function() {
            this.properties.canvasWidth = $('#world').width();
            this.properties.canvasHeight = $('#world').height();

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
