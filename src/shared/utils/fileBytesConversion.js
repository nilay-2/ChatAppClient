export const byteConversion = (bytes) => {
  const kb = bytes / 1024;
  const mb = bytes / (1024 * 1024);
  const gb = bytes / (1024 * 1024 * 1024);

  let size;
  let unit;

  if (kb > mb && kb > gb) {
    size = kb;
    unit = "KB";
  } else if (mb > kb && mb > gb) {
    size = mb;
    unit = "MB";
  } else if (gb > kb && gb > mb) {
    size = gb;
    unit = "GB";
  }
  return `${size.toFixed(2)} ${unit}`;
};
