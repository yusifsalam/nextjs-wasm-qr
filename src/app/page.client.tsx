"use client";

import init, { ECL, generate, Mask, Mode, QrOptions, Version } from "fuqr";
import { params, renderSVG } from "./lib";
import { useEffect, useState } from "react";
type InputQr = {
  text: string;
  minVersion: number;
  strictVersion: boolean;
  minEcl: ECL;
  strictEcl: boolean;
  mode: Mode | null;
  mask: Mask | null;
};
const generateOutputQr = (inputQr: InputQr) => {
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

const Client = ({ text }: { text: string }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const initialized = async () => {
      await init();
      const outputQr = generateOutputQr(inputQr);
      const outputSvg = renderSVG(outputQr, params);
      setSvg(outputSvg);
    };
    initialized();
    const inputQr: InputQr = {
      text,
      minVersion: 1,
      strictVersion: false,
      minEcl: ECL.Low,
      strictEcl: false,
      mode: null,
      mask: null,
    };
  }, [setSvg, text]);

  return (
    <>
      {svg && (
        <div className="h-80 w-80" dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </>
  );
};

export default Client;
