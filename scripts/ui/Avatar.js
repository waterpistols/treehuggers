TH = TH || {};
TH.Avatar = (function() {
    function Avatar(params) {
        params = params || {};

        TH.Component.call(this, params);


        this.$element = $('#avatar');

        _attachEvents.call(this);
    }

    Avatar.prototype = Object.create(TH.Component.prototype);
    Avatar.prototype.constructor = Avatar;

    function _attachEvents() {
        var self = this;

    }
    Avatar.prototype.update = function(data) {

        if ((typeof data.first_name !== 'undefined') ||
            (typeof data.last_name  !== 'undefined') ||
            (typeof data.avatar  !== 'undefined')||
            (typeof data.points !== 'undefined')) {
            var value = {
                name : data.first_name + ' ' + data.last_name,
                image: data.avatar,
                points: parseInt(data.points),
                rank: _getRank(data.points)
            };

            if (typeof value.name !== 'undefined') {
                this.$element.find('.name .update-target').text(value.name);
            }
            if (typeof value.image !== 'undefined') {
                this.$element.find('.points .update-target').text(value.points);
            }
            if (typeof value.image !== 'undefined') {
                this.$element.find('.image .update-target').attr('src', value.image);
            }
            if (typeof value.rank !== 'undefined') {
                this.$element.find('.rank')[0].className = 'rank fill-' + value.rank;
            }
        }
    };
    function _getRank(points) {
        return Math.ceil(points / TH.global.pointsThreshold / 0.2);
    }
    return Avatar;
}());
