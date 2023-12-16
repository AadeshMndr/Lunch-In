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
    if (typeof item === "string") {
      if (!arr.includes(item.trim().toLocaleLowerCase() as T)) {
        arr.push(item.trim().toLocaleLowerCase() as T);
      }
    } else {
      if (!arr.includes(item)) {
        arr.push(item);
      }
    }
  });

  return arr;
};

export const readAsDataURLAsync = (file: File) => {
  return new Promise<string | ArrayBuffer | null | undefined>(
    (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target?.result);
      };

      reader.onerror = (event) => {
        reject(event.target?.error);
      };

      reader.readAsDataURL(file);
    }
  );
};

export const convertToNumberObject = (obj: string | object) => {
  if (typeof obj === "string") {
    return Number(obj);
  }

  let newObj = new Object();

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    if ((obj as any)[key] == undefined) {
      return;
    }

    (newObj as any)[key] = convertToNumberObject(obj[key as keyof typeof obj]);
  });

  return newObj;
};

export const convertToStringObject = (obj: number | object) => {
  if (typeof obj === "number") {
    return obj.toString();
  }

  let newObj = new Object();

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    if ((obj as any)[key] === undefined) {
      return;
    }

    (newObj as any)[key] = convertToStringObject(obj[key as keyof typeof obj]);
  });

  return newObj;
};

export const imageFileValidator = (value: any) => {
  if (value instanceof FileList) {
    if (value.length >= 1) {
      const file = value[0];

      const fileType = file.type.split("/")[0];

      return fileType === "image";
    }
  }

  return false;
};
