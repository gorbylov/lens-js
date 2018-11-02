export const isArrayIndex = str => str.search(/\w+[\[]\d+[\]]$/) >= 0;

export const parseArrayName = str => str.replace(/\[(.*)/, "");

export const parseArrayIndex = str => {
  const idx = +str.replace(/[^\[]*[\[]/, "").replace(/\](.*)/, "");
  return isNaN(idx) ? -1 : idx;
};
