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
                {   images: [TH.global.queue.getResult('island1').src],
                    frames: {width:345, height:192},
                    animations: {
                        be: [0, 1, true]
                    }
                },
                {   x: 0,
                    y: 0
                }
            );

            this.zones.zone2 = this.createZone(
                {   images: [TH.global.queue.getResult('island2').src],
                    frames: {width:375, height:195},
                    animations: {
                        be: [0, 1, true]
                    }
                },
                {   x: 345,
                    y: 0
                }
            );

            this.zones.zone3 = this.createZone(
                {   images: [TH.global.queue.getResult('island3').src],
                    frames: {width:345, height:195},
                    animations: {
                        be: [0, 1, true]
                    }
                },
                {   x: 0,
                    y: 195
                }
            );

            this.zones.zone4 = this.createZone(
                {   images: [TH.global.queue.getResult('island4').src],
                    frames: {width:375, height:195},
                    animations: {
                        be: [0, 1, true]
                    }
                },
                {   x: 345,
                    y: 195
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
