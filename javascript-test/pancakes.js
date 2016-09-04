function Pancake() {
    this.flipped = false;
    this.roasted = false;
};

function Pan() {
    this.pancake = null;
}

Pan.prototype.addPancake = function (pancake) {
    this.pancake = pancake;
};

Pan.prototype.isEmpty = function () {
    return this.pancake === null;
};

Pan.prototype.flip = function () {
    this.pancake = null;
}

var PancakeRoaster = function () {
    var pans = [],
        pancakes = [];

    return {
        addPan: function () {
            pans.push(new Pan());
        },
        addPancake: function () {
            pancakes.push(new Pancake());
        },
        roast: function () {
            var roasted = pancakes.length,
                iterations = 0;

            while (roasted > 0) {
                pans.forEach(function (pan) {
                    if (pan.isEmpty()) {
                        if (pancakes.length > 0) {
                            pan.addPancake(pancakes.shift());
                        }
                    } else {
                        pan.flip();
                        roasted--;
                    }
                });

                iterations++;
            }

            return iterations;
        }
    };
};
