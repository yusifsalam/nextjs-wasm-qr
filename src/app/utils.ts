import { generate, QrOptions, Version } from "fuqr";
import { InputQr } from "./types";

export const Module = Object.freeze({
  ON: 1 << 0,
  DATA: 1 << 1,
  FINDER: 1 << 2,
  ALIGNMENT: 1 << 3,
  TIMING: 1 << 4,
  FORMAT: 1 << 5,
  VERSION: 1 << 6,
  MODIFIER: 1 << 7,
});

function splitmix32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}
export { splitmix32 as getSeededRand };

export const generateOutputQr = (inputQr: InputQr) => {
  const qrOptions = new QrOptions()
    .min_version(new Version(inputQr.minVersion))
    .strict_version(inputQr.strictVersion)
    .min_ecl(inputQr.minEcl)
    .strict_ecl(inputQr.strictEcl)
    .mask(inputQr.mask!) // null instead of undefined (wasm-pack type)
    .mode(inputQr.mode!); // null instead of undefined (wasm-pack type)
  return {
    text: inputQr.text,
    ...generate(inputQr.text, qrOptions),
  };
};
