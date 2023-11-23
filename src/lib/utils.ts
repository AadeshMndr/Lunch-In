export const stringify = (value: number | object) => {
  if (typeof value === "number") {
    return value.toString();
  }

  const keys = Object.keys(value);

  const stringedObject = keys
    .map((key) => `${key}:${value[key as keyof typeof value]}`)
    .join("|-|");

  return stringedObject;
};

export const destringify = (stringedObject: string) => {
  const stringedPairs = stringedObject.split("|-|");

  const theObject = new Object();

  stringedPairs.forEach((pair) => {
    const [key, value] = pair.split(":");

    (theObject as any)[key] = Number(value);
  });

  return theObject;
};

export const getUnrepeatedArray = <T = any>(array: T[]) => {
  let arr: T[] = [];

  array.forEach((item) => {
    if (!arr.includes(item)) {
      arr.push(item);
    }
  });

  return arr;
};
