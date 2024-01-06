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

export const personNamer = (name: string | undefined) => {
  if (name === undefined || name.trim().length === 0) {
    return "Anonymous";
  } else if (name.trim() === "Anonymous") {
    return `"Anonymous"`;
  } else {
    return name;
  }
};

export const isWithinOpeningHours = () => {
  const timeZone = "Asia/Kathmandu";

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false, // Use 24-hour format
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const currentDateInTimeZone = formatter.format(new Date());

  const currentDate = new Date(currentDateInTimeZone);

  if (currentDate.getDay() === 6) {
    return false;
  } else {
    return (
      (currentDate.getHours() === 19 && currentDate.getMinutes() <= 30) ||
      (currentDate.getHours() < 19 && currentDate.getHours() > 6)
    );
  }
};
