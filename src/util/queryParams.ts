export const jesterParamsFilter = (object: any) => {
  let tempArray: Array<string> = [];
  Object.keys(object).forEach((key) => {
    //@ts-ignore
    if (object[key] || object[key] === 0)
      tempArray.push(`${key}=${object[key]}`);
  });
  return tempArray.join("&");
};
