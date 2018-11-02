import {copy} from "../utils";
import any from "./any.test";
import 'chai/register-should';
import 'chai/register-expect';

describe("copy", () => {

  it("should copy a string", () => {
    const expected = any.string();
    const actual = copy(expected);
    actual.should.equal(expected);
    actual.should.be.a("string");
  });

  it("should copy a number", () => {
    const expected = any.number();
    const actual = copy(expected);
    actual.should.equal(expected);
    actual.should.be.a("number");
  });

  it("should copy a boolean", () => {
    const expected = any.boolean();
    const actual = copy(expected);
    actual.should.equal(expected);
    actual.should.be.a("boolean")
  });

  it("should copy a date", () => {
    const expected = any.date();
    const actual = copy(expected);

    actual.valueOf().should.equal(expected.valueOf());
    actual.should.be.a("date");

    expected.setFullYear(2000, 10, 10);
    actual.valueOf().should.not.equal(expected.valueOf())
  });

  it("should copy a function", () => {
    const expected = () => any.string();
    const actual = copy(expected);
    actual.should.equal(expected);
    actual.should.be.a("function");
  });

  it("should copy a null", () => {
    const expected = null;
    const actual = copy(expected);
    should.not.exist(actual)
  });

  it("should copy an undefined", () => {
    const expected = undefined;
    const actual = copy(expected);
    should.not.exist(actual)
  });

  it("should copy an array", () => {
    const expected = [any.string(), any.number(), any.boolean(), any.date()];
    const actual = copy(expected);

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);

    const element = any.string();
    actual.push(element);

    (actual === expected).should.equal(false);
    actual.includes(element).should.equal(true);
    expected.includes(element).should.equal(false);
  });

  it("should copy an object", () => {
    const expected = any.object();
    const actual = copy(expected);

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);

    actual.element = any.string();
    should.exist(actual.element);
    should.not.exist(expected.element);
  });

  it("should copy an array with object", () => {
    const expected = [any.string(), any.number(), any.boolean(), any.date(), any.object()];
    const actual = copy(expected);

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);

    const actualObject = actual[4];
    const expectedObject = expected[4];
    actualObject.element = any.string();

    (actualObject === expectedObject).should.equal(false);
    should.exist(actualObject.element);
    should.not.exist(expectedObject.element);
  });

  it("should copy an object with array", () => {
    const expected = {array: [any.string(), any.number(), any.boolean(), any.date(), any.object()]};
    const actual = copy(expected);

    (actual === expected).should.equal(false);
    actual.should.deep.equal(expected);

    const actualArray = actual.array;
    const expectedArray = expected.array;
    const element = any.string();
    actualArray.push(element);

    (actualArray === expectedArray).should.equal(false);
    actualArray.includes(element).should.equal(true);
    expectedArray.includes(element).should.equal(false);
  });

});
