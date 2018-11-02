import {isArrayIndex, parseArrayIndex, parseArrayName} from "./regexp";
import {copy, isArray, isDate, isObject} from "./utils";

export const Lens = object => new Lenses(object);

const getObjectByFieldName = (fieldName, object) => {
  if (isArrayIndex(fieldName)) {
    const arrayName = parseArrayName(fieldName);
    const array = object[arrayName];
    if (Array.isArray(array)) {
      const index = parseArrayIndex(fieldName);
      return array[index]
    } else {
      throw new LensError.expectedArray(path, this.object);
    }
  } else {
    return object[fieldName];
  }
};

class Lenses {

  constructor(object) {
    if (object === null) {
      throw LensError.expectedObject("null");
    } if (object === undefined) {
      throw LensError.expectedObject("undefined");
    } else if (isArray(object)) {
      throw LensError.expectedObject("array");
    } else if (isDate(object)) {
      throw LensError.expectedObject("date");
    } else if (!isObject(object)) {
      throw LensError.expectedObject(typeof object);
    } else {
      this.object = copy(object);
    }
  };

  get = path => {
    const loop = (object, paths) => {
      const [pathHead, ...pathTail] = paths;
      const objectByFieldName = getObjectByFieldName(pathHead, object);

      if (pathTail.length > 0 && !isObject(objectByFieldName)) {
        throw LensError.wrongPath(path, this.object);
      } else if (pathTail.length > 0 && isObject(object)) {
        return loop(objectByFieldName, pathTail);
      } else {
        return objectByFieldName;
      }
    };

    return loop(this.object, path.split("."));
  };

  set = (path, value) => {
    const loop = (object, paths) => {
      const [pathHead, ...pathTail] = paths;
      const objectByFieldName = getObjectByFieldName(pathHead, object);

      if (pathTail.length > 1 && !isObject(objectByFieldName)) {
        throw LensError.wrongPath(path, this.object);
      } else if (pathTail.length > 1 && isObject(object)) {
        return {...object, [pathHead]: loop(objectByFieldName, pathTail)};
      } else {
        const keyToSet = pathTail[0];
        const objectToSet = objectByFieldName[keyToSet];
        const valueToSet = isArray(objectToSet) ? objectToSet.concat(value) : value;
        return {...object, [pathHead]: {...objectByFieldName, [keyToSet]: valueToSet}};
      }
    };

    return Lens(loop(this.object, path.split(".")));
  };

  value = () => {
    return this.object;
  };

}

class LensError extends Error {

  static EXPECTED_OBJECT_ERROR_CODE = 1;
  static expectedObject = actualType => new LensError(
    `Expected an object, actual type: ${actualType}.`,
    LensError.EXPECTED_OBJECT_ERROR_CODE
  );

  static EXPECTED_ARRAY_ERROR_CODE = 2;
  static expectedArray = (path, object) => new LensError(
    `Expected an array for path ${path} of object ${JSON.stringify(object)}.`,
    LensError.EXPECTED_ARRAY_ERROR_CODE
  );

  static WRONG_PATH_ERROR_CODE = 3;
  static wrongPath = (path, object) => new LensError(
    `Path "${path}" does not exist for object: ${JSON.stringify(object)}.`,
    LensError.WRONG_PATH_ERROR_CODE
  );


  constructor(message, code) {
    super(message);
    this.code = code
  }
}
