import crypto from "crypto";
import { v4 } from "uuid";

export const ENCODING_TYPES = {
  ENCODE_URI: "URI",
  ENCODE_BASE64: "Base64",
  ENCODE_HEX: "Hex",
  ENCODE_BINARY: "Binary",
  ENCODE_AES: "AES",
  HASH_SHA256: "SHA-256",
  HASH_MD5: "MD5",
  ENCODE_ASCII: "ASCII",
  ENCODE_HEX_CODE: "HexCode",
  ENCODE_HTML_ENTITY: "HtmlEntity",
};

export const processURI = (text: string, isEncoding: boolean) => {
  return isEncoding ? encodeURI(text) : decodeURI(text);
};

export const processBase64 = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    const utf8Bytes = new TextEncoder().encode(text);
    const base64String = btoa(String.fromCharCode(...utf8Bytes));
    return base64String;
  } else {
    const binaryString = atob(text);
    const utf8Bytes = Uint8Array.from(binaryString, (char) =>
      char.charCodeAt(0)
    );
    const decodedString = new TextDecoder().decode(utf8Bytes);
    return decodedString;
  }
};

export const processHex = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    return Buffer.from(text, "utf8").toString("hex");
  } else {
    return Buffer.from(text, "hex").toString("utf8");
  }
};

export const processBinary = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  } else {
    return text
      .split(" ")
      .map((bin) => String.fromCharCode(parseInt(bin, 2)))
      .join("");
  }
};

export const processAES = (text: string, isEncoding: boolean) => {
  const key = v4(); // 적절한 키를 사용하세요
  const iv = crypto.randomBytes(16).toString("hex"); // 16바이트 길이의 IV를 랜덤으로 생성
  const cipherKey = crypto.createHash("sha256").update(key).digest();
  const ivBuffer = Buffer.from(iv, "hex");

  if (isEncoding) {
    const cipher = crypto.createCipheriv("aes-256-cbc", cipherKey, ivBuffer);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } else {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      cipherKey,
      ivBuffer
    );
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
};

export const processSHA256 = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const processMD5 = (text: string) => {
  return crypto.createHash("md5").update(text).digest("hex");
};

export const processASCII = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString())
      .join(" ");
  } else {
    return text
      .split(" ")
      .map((ascii) => String.fromCharCode(parseInt(ascii, 10)))
      .join("");
  }
};

export const processHexCode = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } else {
    return text
      .split(" ")
      .map((hex) => String.fromCharCode(parseInt(hex, 16)))
      .join("");
  }
};

export const processHtmlEntity = (text: string, isEncoding: boolean) => {
  if (isEncoding) {
    return text.replace(
      /[\u00A0-\u9999<>\&]/gim,
      (char) => `&#${char.charCodeAt(0)};`
    );
  } else {
    return text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
  }
};
