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
            users: api + 'users',
            askHelp: api + 'ask-help',
            user: api + 'user',
            plant: api + 'plant',
            help: api + 'help',
            islands: api + 'islands-polling'
        },
        _state: null,
        states: {
            'CAN_PLANT_TREES': 0,
            'PLANTING_TREES': 1,
            'QUIZ': 2,
            'IDLE': 3,
            'QUIZ': 4
        },
        firstLogin: 1,
        _prevState: null,
        properties: {},
        stateHandlers: [],
        minTrees : 4,
        pointsThreshold : 10000,

        init : function() {
            this.properties.canvasWidth = 1130;
            this.properties.canvasHeight = 827;
            this.stage = new createjs.Stage('world');
            this.stage.enableMouseOver(20);

        },

        extend: function(params) {
            var key;
            for(key in params) {
                if (params.hasOwnProperty(key) === true) {
                    this[key] = params[key];
                }
            }
        },

        stateSubscribe: function(fn, context) {
            var context = context || this;
            if (!fn) {
                console.log('Couldn not assign handler for ', context.constructor.name);
            }
            this.stateHandlers.push(function() {
                fn.apply(context, arguments);
            });
        },

        setState: function(value, forceExec) {

            this._prevState = this._state;
            this._state =  this.states[value];
            if (this._prevState !== this._state || forceExec) {
                this._execStateHandlers();
            }

        },

        isState: function(value) {
            return this._state === this.states[value];
        },

        getState: function() {
            return this._state;
        },

        _execStateHandlers: function() {
            for (var i = 0; i < this.stateHandlers.length; i++) {
                this.stateHandlers[i](this._state);
            }
        },

        errorHandler: function(error) {
            console.log(error);

            // Cookie expired
            if(error.responseText === 'FAIL! You need to login!') {
                window.location.href = TH.global.clientUrl + 'index.html';
            } else {
                console.log(error);
            }
        }
    }
}());
