export function hypenateString(string) {
  // Replace spaces with hyphens using the regular expression
  return string.replace(/\s+/g, "-");
}

export function removeDelimiter(string, delimiter) {
  // Split the string at each delimiter and then join with spaces
  return string.split(delimiter).join(" ");
}
