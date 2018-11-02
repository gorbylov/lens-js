export const copy = value => {
  switch (typeof value) {
    case "string"   : return copyString(value);
    case "number"   : return copyNumber(value);
    case "boolean"  : return copyBool(value);
    case "object"   : return copyObject(value);
    case "function" : return value;
    case "undefined": return value;
  }
};

const copyObject = object => {
  if (object === null) return object;
  else if (isDate(object)) return copyDate(object);
  else if (isArray(object)) return copyArray(object);
  else return copyObj(object);
};

const copyString = string => String(string);

const copyNumber = number => Number(number);

const copyBool = bool => Boolean(bool);

const copyDate = date => new Date(date.getTime());

const copyObj = object => {
  return Object.entries(object).reduce((acc, next) => {
    const [key, value] = next;
    const copyValue = copy(value);
    return Object.assign({}, acc, {[key]: copyValue});
  }, {})
};

const copyArray = array => array.map(copy);

export const isObject = obj => typeof obj === "object" && obj != null && !Array.isArray(obj);

export const isArray = obj => Array.isArray(obj);

export const isDate = obj => typeof obj.getMonth === 'function';
