export const hexToBase64 = (hex: string): string => {
  return btoa(
    String.fromCharCode.apply(
      null,
      hex
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
};

export const base64ToHex = (base64: string): string => {
  const raw = atob(base64);
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : "0" + hex;
  }
  return result.toUpperCase();
};
