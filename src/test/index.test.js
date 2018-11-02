import "../index"
import any from "./any.test";
import {Lens} from "../index";
import 'chai/register-should';
import 'chai/register-expect';

describe("Lens", () => {

  it("wrap an object and return immutable copy", () => {
    const expected = any.object();

    const actual = Lens(expected).value();

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);
  });

  it("throw error if null is wrapping", () => {
    expect(() => Lens(null)).to.throw(Error)
  });

  it("throw error if undefined is wrapping", () => {
    expect(() => Lens(undefined)).to.throw(Error)
  });

  it("throw error if array is wrapping", () => {
    expect(() => Lens([])).to.throw(Error)
  });

  it("throw error if string is wrapping", () => {
    expect(() => Lens(any.string())).to.throw(Error)
  });

  it("throw error if number is wrapping", () => {
    expect(() => Lens(any.number())).to.throw(Error)
  });

  it("throw error if boolean is wrapping", () => {
    expect(() => Lens(any.boolean())).to.throw(Error)
  });

  it("throw error if date is wrapping", () => {
    expect(() => Lens(any.date())).to.throw(Error)
  });

  it("throw error if function is wrapping", () => {
    expect(() => Lens(() => {})).to.throw(Error)
  });
});

describe("Lens#get", () => {

  it("return an object of specified path", () => {
    const expected = {c: "d"};
    const testObject = {a: {b: expected}};

    const actual = Lens(testObject).get("a.b");

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);
  });

  it("throw error if path does not exist", () => {
    const testObject = {a: {b: {c: "d"}}};

    expect(() => Lens(testObject).get("x.y.z")).to.throw(Error);
  });

  it("throw error if path goes throw primitive", () => {
    const testObject = {a: {b: {c: "d"}}};

    expect(() => Lens(testObject).get("a.b.c.d")).to.throw(Error);
  });

  it("return an object of specified path with index", () => {
    const expected = any.object();
    const testObject = {a: {b: {c: [expected]}}};

    const actual = Lens(testObject).get("a.b.c[0]");

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);
  });

  it("return an object's value of specified path with index", () => {
    const expected = {e: any.object()};
    const testObject = {a: {b: {c: [{d: expected}]}}};

    const actual = Lens(testObject).get("a.b.c[0].d");

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);
  });

  it("throw error if path with index doesn't lead to an array", () => {
    const testObject = {a: {b: {c: "d"}}};

    expect(() => Lens(testObject).get("a.b.c[0]")).to.throw(Error)
  });

});

describe("Lens#set", () => {

  it("return an object with a set value on specified path", () => {
    const testObject = {a: {b: {c: "d"}}};
    const expected = {a: {b: {c: "d", e: "f"}}};

    const actual = Lens(testObject).set("a.b.e", "f").value();

    actual.should.deep.equal(expected);
  });

  it("return an object with a set values on specified path", () => {
    const testObject = {a: {b: {c: "d"}}};
    const expected = {a: {b: {c: "d", e: "f", g: "h"}}};

    const actual = Lens(testObject)
      .set("a.b.e", "f")
      .set("a.b.g", "h")
      .value();

    actual.should.deep.equal(expected);
  });

  it("return an object with a replaced value on specified path", () => {
    const testObject = {a: {b: {c: "d"}}};
    const expected = {a: {b: {c: "e"}}};

    const actual = Lens(testObject).set("a.b.c", "e").value();

    actual.should.deep.equal(expected);
  });

  it("return an object with a set array value on specified path", () => {
    const testObject = {a: {b: {c: ["d"]}}};
    const expected = {a: {b: {c: ["d", "e"]}}};

    const actual = Lens(testObject).set("a.b.c", "e").value();

    actual.should.deep.equal(expected);
  });

  it("throw error if path does not exist", () => {
    const testObject = {a: {b: {c: "d"}}};

    expect(() => Lens(testObject).set("x.y.z", "w")).to.throw(Error);
  });

  it("throw error if path goes throw primitive", () => {
    const testObject = {a: {b: {c: "d"}}};

    expect(() => Lens(testObject).set("a.b.c.d.e", "f")).to.throw(Error);
  });

});
