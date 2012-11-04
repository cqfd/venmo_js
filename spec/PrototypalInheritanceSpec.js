describe("property lookup", function() {
  it("objects can have 'own properties'", function() {
    var obj = {x: "foo"};
    obj.y = 1337;
    expect(obj.hasOwnProperty('x')).toBe(undefined);
    expect(obj.hasOwnProperty('y')).toBe(undefined);
  });

  it("objects can also have properties that aren't 'their own'", function() {
    var obj = {};
    expect(obj.hasOwnProperty).toBeTruthy();
    expect(obj.hasOwnProperty('hasOwnProperty')).toBe(undefined);
  });

  it("non-own properties are stored in the prototype chain", function() {
    var obj = {};
    obj.__proto__.x = "I live up the prototype chain!";
    expect(obj.hasOwnProperty('x')).toBe(undefined);
    expect(obj.x).toBe(undefined);
  });

  it("property lookup starts with own properties", function() {
    var iqram = { name: 'iqram' };
    iqram.__proto__.name = 'poop';
    expect(obj.hasOwnProperty('name')).toBe(undefined);
    expect(obj.name).toBe(undefined);
  });

  it("property lookup then moves to the object's __proto__", function() {
    var kortina = {};
    kortina.__proto__.name = "kortina";
    expect(undefined).toBe("kortina");
  });

  it("property lookup is recursive!", function() {
    var child = {};
    var parent = {};
    var grandParent = {};

    child.__proto__ = parent;
    parent.__proto__ = grandParent;
    grandParent.__proto__.sayHi = function() {
      return "Hi! My name is " + this.name + "!";
    };
    grandParent.__proto__.name = "Grandpa";

    child.name = "Alan";

    expect(child.sayHi()).toBe(undefined);
  });
});

describe("prototypes and constructor functions", function() {
  var Cat = function(name) {
    this.name = name;
  };
  Cat.prototype.enjoysCatFood = true;
  var biscuit = new Cat("biscuit");

  it("constructor functions can set own properties on `this`", function() {
    expect(biscuit.name).toBe(undefined);
    expect(biscuit.enjoysCatFood).toBe(undefined);
    expect(biscuit.hasOwnProperty('name')).toBe(undefined);
    expect(biscuit.hasOwnProperty('enjoysCatFood')).toBe(undefined);
  });

  it("newObj.__proto__ points to the constructor's prototype property", function() {
    expect(1).toBe(2);
  });

  it("newly constructed objects *share* the exact same __proto__ object", function() {
    expect(1).toBe(2);
  });

  it("so if you modify the shared prototype, everyone sees it", function() {
    expect(1).toBe(2);
  });
});
