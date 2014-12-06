TH = TH || {};
TH.Country = (function() {
    function Country(container, params) {
        _extend.call(container, params);
        this.container = container;
    }

    function _extend(params) {
        var key;

        for(key in params) {
            if (params.hasOwnProperty(key) === true) {
                this[key] = params[key];
            }
        }
    }

    return Country;
}());