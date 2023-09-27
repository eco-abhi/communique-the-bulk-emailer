export function truncateStringBeforeDot(inputString, maxLength) {
  const dotIndex = inputString.lastIndexOf(".");

  if (dotIndex === -1) {
    return inputString.length > maxLength
      ? inputString.slice(0, maxLength) + "..."
      : inputString;
  }

  const fileName = inputString.slice(0, dotIndex);
  const extension = inputString.slice(dotIndex);

  if (fileName.length > maxLength) {
    return fileName.slice(0, maxLength) + "..." + extension;
  }

  return inputString;
}
