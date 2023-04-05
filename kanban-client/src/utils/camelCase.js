import capitalizeFirstLetter from "./capitalizeFirstLetter.js";

function isCamelCase(str) {
  return /^[a-z]\w*([A-Z][\w]*)*$/.test(str);
}

function addCamelCase(target, str) {
  const lowercaseStr = str.toLowerCase();

  if (target === "") return lowercaseStr;
  else return target + capitalizeFirstLetter(lowercaseStr);
}

function toCamelCase(str) {
  if (isCamelCase(str)) return str;

  return str.split(" ").reduce(addCamelCase, "");
}

export { isCamelCase, toCamelCase };
