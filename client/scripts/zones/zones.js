var TH = TH || {};

TH.zones = (function() {



    return {
        countries: {},
        zones: {},
        stage: null,
        queue: null,
        init : function(stage, queue) {
            this.stage = stage;
            this.queue = queue;

            this.createCountries();
            this.createZones();


            this.assignZones();


        },
        createCountries: function() {

            this.countries.red = new TH.Country(new createjs.Container());
            this.countries.green = new TH.Country(new createjs.Container());
            this.countries.yellow = new TH.Country(new createjs.Container());
            this.countries.blue = new TH.Country(new createjs.Container());

        },
        assignZones: function() {
              
        },
        createZones: function() {
            this.zones.zone1 = this.createZone(
                {   images: [this.queue.getResult('diamonds').src],
                    frames: {width:298, height:298},
                    animations: {
                        run: [0, 3, true]
                    }
                },
                {   x: 100,
                    y: 100
                }
            );

            this.zones.zone2 = this.createZone(
                {   images: [this.queue.getResult('diamonds').src],
                    frames: {width:298, height:298},
                    animations: {
                        run: [0, 3, true]
                    }
                },
                {   x: 200,
                    y: 100
                }
            );

            this.zones.zone3 = this.createZone(
                {   images: [this.queue.getResult('diamonds').src],
                    frames: {width:298, height:298},
                    animations: {
                        run: [0, 3, true]
                    }
                },
                {   x: 300,
                    y: 100
                }
            );

            this.zones.zone4 = this.createZone(
                {   images: [this.queue.getResult('diamonds').src],
                    frames: {width:298, height:298},
                    animations: {
                        run: [0, 3, true]
                    }
                },
                {   x: 400,
                    y: 100
                }
            );
        },

        createZone : function(sheetOptions, spriteOptions) {

            var sheet = new createjs.SpriteSheet(sheetOptions),
                sprite = new createjs.Sprite(sheet);

            return new TH.Zone(sprite, spriteOptions);
        }


    }
}());
