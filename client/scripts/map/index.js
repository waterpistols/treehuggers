var TH = TH || {};

TH.map = (function() {



    return {
        countries: {},
        zones: {},
        island: null,
        init : function() {

            this.createIsland();
            this.createCountries();
            this.createZones();

            this.assignZones();
            debugger;
            this.island.popIn();

        },
        createCountries: function() {

            this.countries.red = new TH.Country();
            this.countries.green = new TH.Country();
            this.countries.yellow = new TH.Country();
            this.countries.blue = new TH.Country();

            this.countries.red.addToIsland(this.island);
            this.countries.green.addToIsland(this.island);
            this.countries.yellow.addToIsland(this.island);
            this.countries.blue.addToIsland(this.island);
        },

        createIsland: function(firstLogin) {
            this.island = new TH.Island();
            TH.global.stage.addChild(this.island.container);

        },
        assignZones: function() {
            this.zones.zone1.addToCountry(this.countries.red);
            this.zones.zone2.addToCountry(this.countries.red);
            this.zones.zone3.addToCountry(this.countries.red);
            this.zones.zone4.addToCountry(this.countries.blue);
        },
        createZones: function() {
            this.zones.zone1 = this.createZone(
                {   images: [TH.global.queue.getResult('diamonds').src],
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
                {   images: [TH.global.queue.getResult('diamonds').src],
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
                {   images: [TH.global.queue.getResult('diamonds').src],
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
                {   images: [TH.global.queue.getResult('diamonds').src],
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
