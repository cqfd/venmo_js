describe("functions are first-class values", function() {

    it("you can store them in variables", function() {
        var funk = function() {
            return 1337;
        };
        expect(funk()).toBe(undefined);
    });

    it("you can even store them in arrays", function() {
        var arrayOfFunks = [
            function() { 
                return 1337; 
            },
            function() { 
                return "heyo"; 
            },
            function() { 
                return function() {
                    return "whoa meta"; 
                };
            }
        ];

        expect(undefined).toBe(1337);
        expect(undefined).toBe("heyo");
        expect(undefined).toBe("whoa meta");
    });

    it("or objects for that matter", function() {
        var objOfFunks = {
            'iqram' : function() { return "making money" },
            'kortina' : function() { return "taste like honey!" }
        };

        expect(undefined).toBe("making money");
        expect(undefined).toBe("taste like honey!");
    });

    it("and you can pass them as arguments to other functions!", function() {
        var funk = function(x) {
            return x + 1;
        };
        var justDoIt = function(f, x) {
            return f(x);
        };
        expect(justDoIt(undefined)).toBe(100);
    });

});

describe("functions create their own scope", function() {

    it("you can reuse variable names without clobbering anything", function() {
        var x = "foo";
        var funk = function() {
            var x = "bar";
            return x;
        };
        expect(funk()).toBe(undefined);
        expect(x).toBe(undefined);
    });

});

describe("functions are the *only* way to create scope", function() {

    it("for loops don't get their own scope :(", function() {
        var i = "super important message!";
        for (var i = 0; i < 6; i++) {
            "do nothing";
        };
        expect(i).toBe(undefined);
    });

    it("variables declarations get hoisted to the top of the nearest enclosing scope :(", function() {
        var x = "another super important message!";
        var funk = function() {
            return x;
        };
        expect(funk()).toBe(undefined);

        for (var x = 0; x < 36; x++) {
            "talk amongst yourselves";
        }
    });

    it("which means you may need to resort to goofy stuff like this", function() {
        // yes, this is pretty convoluted
        // the (function() { ... }()) part is to induce a new scope

        var x = "yet another super important message!";
        (function() {
            var funk = function() {
                return x;
            }
            expect(funk()).toBe("yet another super important message!");

            // TODO: add a line here...
            for (var x = 0; x < 36; x++) {
                "talk amongst yourselves";
            }
        }());
        // TODO: and another line here to make the test pass
    });

});

describe("functions are lexically scoped", function() {

    it("functions can refer to lexically-scoped variables", function() {
        var x = 1337;
        var funk = function() {
            return x;
        };
        expect(undefined).toBe(1337);
    });

    it("functions can *only* refer to lexically scoped variables", function() {
        var x = "poop";
        var funk = function() {
            return x + "!";
        };
        var hmm = function() {
            var x = "not poop";
            expect(funk()).toBe(undefined);
        };
        hmm();
    });

});

describe("functions have dynamic context", function() {

    it("functions invoked with a receiver have `this` bound to the receiver", function() {
        var funk = function() {
            return "Hi! My name is " + this.name + "!";
        };

        var iqram = { name: "Iqram", sayHowdy: funk };
        var kortina = { name: "Kortina", sayHi: funk };

        expect(undefined).toBe("Hi! My name is Iqram!");
        expect(undefined).toBe("Hi! My name is Kortina!");
    });

    it("functions invoked without a receiver have `this` bound to the global object", function() {
        var funk = function() {
            return this;
        };
        var obj = { funk: funk };
        expect(funk()).toBe(undefined);
        expect(undefined).toBe(obj);
    });

    it("you can dynamically control a function's `this` value", function() {
        var funk = function() {
            return this;
        };
        var iqram = {};
        var kortina = {};
        expect(funk.call(iqram)).toBe(undefined);
        expect(funk.apply(kortina)).toBe(undefined);
    });

});
