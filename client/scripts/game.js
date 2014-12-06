var TH = TH || {};

TH.world = (function() {
    var stage,
        queue;
    return {
        init : function() {
            stage = new createjs.Stage('world');
            queue = new createjs.LoadQueue(false);
            queue.installPlugin(createjs.Sound);
            queue.addEventListener('complete', this.handleComplete);

            queue.loadManifest([
                /* IMAGES */
                {id: 'flower', src: 'assets/images/ocean.png'},
                /* SOUNDS */
                {id: 'sound', src: 'assets/sounds/snd_0160.mp3'}
            ]);
        },
        _handleComplete : function() {
            debugger;
        }
    }
}());
