export const ENCODING_TYPES = {
  ENCODE_URI: "URI",
};

export const processURI = (text: string, isEncoding: boolean) => {
  return isEncoding ? encodeURI(text) : decodeURI(text);
};
