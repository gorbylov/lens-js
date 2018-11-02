import {isArrayIndex, parseArrayIndex, parseArrayName} from "../regexp";

describe("isArrayIndex", () => {

  it("return true if input string matches the pattern [number]", () => {
    const expected = true;

    const actual1 = isArrayIndex("a[1]");
    const actual2 = isArrayIndex("aaaa[1]");
    const actual3 = isArrayIndex("a[111]");
    const actual4 = isArrayIndex("abcdefghijklmnopqrstuvwxyz[0123456789]");
    const actual5 = isArrayIndex("a-a[0123456789]");
    const actual6 = isArrayIndex("a.a[0123456789]");

    [actual1, actual2, actual3, actual4, actual5, actual6]
      .forEach(actual => actual.should.equal(expected))
  });

  it("return false if input string doesn't match the pattern [number]", () => {
    const expected = false;

    const actual1 = isArrayIndex("a");
    const actual2 = isArrayIndex("1");
    const actual3 = isArrayIndex("[1");
    const actual4 = isArrayIndex("1]");
    const actual5 = isArrayIndex("[a");
    const actual6 = isArrayIndex("a]");
    const actual7 = isArrayIndex("[1a]");
    const actual8 = isArrayIndex("[a1]");
    const actual9 = isArrayIndex("[1]a");
    const actual10 = isArrayIndex("a[1]a");
    const actual11 = isArrayIndex("a[]a");
    const actual12 = isArrayIndex("[]");
    const actual13 = isArrayIndex("a[]");
    const actual14 = isArrayIndex("[]a");
    const actual15 = isArrayIndex("1[]");
    const actual16 = isArrayIndex("[]1");

    [
      actual1, actual2, actual3, actual4, actual5, actual6, actual7, actual8,
      actual9, actual10, actual11, actual12, actual13, actual14, actual15, actual16
    ]
      .forEach(actual => actual.should.equal(expected));
  });

});

describe("parseArrayName", () => {

  it("return an array name", () => {
    const expected = "a.a-a";

    const actual = parseArrayName("a.a-a[1]");

    actual.should.equal(expected)
  });

  it("return -1 if input string is invalid", () => {
    const expected = -1;

    const actual1 = parseArrayIndex("aaa[a]");
    const actual2 = parseArrayIndex("aaa[1a]");
    const actual3 = parseArrayIndex("aaa[a1]");
    const actual4 = parseArrayIndex("aaa[.]");

    [actual1, actual2, actual3, actual4]
      .forEach(actual => actual.should.equal(expected))
  });

});


describe("parseArrayIndex", () => {

  it("return an array index if input string is valid", () => {
    const expected = 1;

    const actual1 = parseArrayIndex("aaa[1]");
    const actual2 = parseArrayIndex("aaa123[1]");
    const actual3 = parseArrayIndex("a-a[1]");
    const actual4 = parseArrayIndex("a.a[1]");
    const actual5 = parseArrayIndex("123aa[1]");

    [actual1, actual2, actual3, actual4, actual5]
      .forEach(actual => actual.should.equal(expected))
  });

  it("return -1 if input string is invalid", () => {
    const expected = -1;

    const actual1 = parseArrayIndex("aaa[a]");
    const actual2 = parseArrayIndex("aaa[1a]");
    const actual3 = parseArrayIndex("aaa[a1]");
    const actual4 = parseArrayIndex("aaa[.]");

    [actual1, actual2, actual3, actual4]
      .forEach(actual => actual.should.equal(expected))
  });

});
