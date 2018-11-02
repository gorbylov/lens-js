import {isArrayIndex, parseArrayIndex, parseArrayName} from "./regexp";
import {copy, isArray, isDate, isObject} from "./utils";

export const Lens = object => new Lenses(object);

class Lenses {

  constructor(object) {
    if (object === null) {
      throw LensError.EXPECTED_OBJECT_ERROR("null");
    } if (object === undefined) {
      throw LensError.EXPECTED_OBJECT_ERROR("undefined");
    } else if (isArray(object)) {
      throw LensError.EXPECTED_OBJECT_ERROR("array");
    } else if (isDate(object)) {
      throw LensError.EXPECTED_OBJECT_ERROR("date");
    } else if (!isObject(object)) {
      throw LensError.EXPECTED_OBJECT_ERROR(typeof object);
    } else {
      this.object = copy(object);
    }
  };

  get = path => {

    const loop = (object, paths) => {
      const [pathHead, ...pathTail] = paths;

      const objectByFieldName = getObjectByFieldName(pathHead, object);

      if (pathTail.length > 0 && !isObject(objectByFieldName)) {
        throw LensError.WRONG_PATH_ERROR(path, this.object);
      } else if (pathTail.length > 0 && isObject(object)) {
        return loop(objectByFieldName, pathTail);
      } else {
        return objectByFieldName;
      }
    };

    const getObjectByFieldName = (fieldName, object) => {
      if (isArrayIndex(fieldName)) {
        const arrayName = parseArrayName(fieldName);
        const array = object[arrayName];
        if (Array.isArray(array)) {
          const index = parseArrayIndex(fieldName);
          return array[index]
        } else {
          throw new LensError.EXPECTED_ARRAY_ERROR(path, this.object);
        }
      } else {
        return object[fieldName];
      }
    };

    return loop(this.object, path.split("."));
  };

  value = () => {
    return this.object;
  };

}

class LensError extends Error {

  static EXPECTED_OBJECT_ERROR_CODE = 1;
  static EXPECTED_OBJECT_ERROR = actualType => new LensError(
    `Expected an object, actual type: ${actualType}.`,
    LensError.EXPECTED_OBJECT_ERROR_CODE
  );
  static EXPECTED_ARRAY_ERROR_CODE = 2;
  static EXPECTED_ARRAY_ERROR = (path, object) => new LensError(
    `Expected an array for path ${path} of object ${JSON.stringify(object)}.`,
    LensError.EXPECTED_ARRAY_ERROR_CODE
  );
  static WRONG_PATH_ERROR_CODE = 3;
  static WRONG_PATH_ERROR = (path, object) => new LensError(
    `Path "${path}" does not exist for object: ${JSON.stringify(object)}.`,
    LensError.WRONG_PATH_ERROR_CODE
  );


  constructor(message, code) {
    super(message);
    this.code = code
  }
}
