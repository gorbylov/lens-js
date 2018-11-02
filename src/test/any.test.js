const randomString = () => Math.random().toString(36).substring(7);

const randomNumber = () => Math.floor(Math.random() * 1000);

const randomBoolean = () => Math.random() >= 0.5;

const randomDate = () => new Date();

export default {
  string: () => randomString(),
  number: () => randomNumber(),
  boolean: () => randomBoolean(),
  date: () => randomDate(),
  object: () => ({
    string: randomString(),
    number: randomNumber(),
    boolean: randomBoolean(),
    date: randomDate()
  })
};
