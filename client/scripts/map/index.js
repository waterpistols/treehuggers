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

            this.island.birdy();
            this.island.smokey();
        },
        placeMap: function() {
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
            this.zones.country1.addToCountry(this.countries.green);
            this.zones.country2.addToCountry(this.countries.yellow);
            this.zones.country3.addToCountry(this.countries.blue);
            this.zones.zone1.addToCountry(this.countries.red);
            this.zones.zone2.addToCountry(this.countries.red);
            this.zones.zone3.addToCountry(this.countries.red);
            this.zones.zone4.addToCountry(this.countries.red);
            this.zones.zone5.addToCountry(this.countries.red);

        },
        createZones: function() {
            this.zones.zone1 = this.createZone(
                1,
                {   images: [TH.global.queue.getResult('zone1').src],
                    frames: {width:414, height:210},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 0,
                    y: 252
                }
            );

            this.zones.zone2 = this.createZone(
                2,
                {   images: [TH.global.queue.getResult('zone2').src],
                    frames: {width:519, height:235},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 305,
                    y: 265
                }
            );

            this.zones.zone3 = this.createZone(
                3,
                {   images: [TH.global.queue.getResult('zone3').src],
                    frames: {width:355, height:179},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 675,
                    y: 219
                }
            );

            this.zones.zone4 = this.createZone(
                4,
                {   images: [TH.global.queue.getResult('zone4').src],
                    frames: {width:189, height:115},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 554,
                    y: 185
                }
            );

            this.zones.zone5 = this.createZone(
                5,
                {   images: [TH.global.queue.getResult('zone5').src],
                    frames: {width:359, height:149},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 295,
                    y: 148
                }
            );

            this.zones.country1 = this.createZone(
                11,
                {   images: [TH.global.queue.getResult('country1').src],
                    frames: {width:565, height:287},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 0,
                    y: 2
                }
            );

            this.zones.country2 = this.createZone(
                12,
                {   images: [TH.global.queue.getResult('country2').src],
                    frames: {width:421, height:152},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 325,
                    y: 0
                }
            );

            this.zones.country3 = this.createZone(
                13,
                {   images: [TH.global.queue.getResult('country3').src],
                    frames: {width:542, height:303},
                    animations: {
                        be: [0, 3, true]
                    }
                },
                {   x: 566,
                    y: 55
                }
            );
        },

        createZone : function(id, sheetOptions, spriteOptions) {

            var sheet = new createjs.SpriteSheet(sheetOptions),
                sprite = new createjs.Sprite(sheet);

            return new TH.Zone(id, sprite, spriteOptions);
        },
        updateZones: function(data) {
            if (data.zones) {
                for (var i = 0; i < data.zones.length; i++) {

                    this.zones[data.zones[i].title].setHealth(parseInt(data.zones[i].degrading_state));
                }
            }

        }


    }
}());
