"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import init, { ECL } from "fuqr";
import { params, renderSVG } from "./lib";
import { InputQr } from "./types";
import { generateOutputQr } from "./utils";

const Client = () => {
  const [svg, setSvg] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const text = searchParams.get("text") || "";
    setInputText(text);
  }, [searchParams]);

  const updateURL = useCallback(
    (text: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (text) {
        newSearchParams.set("text", text);
      } else {
        newSearchParams.delete("text");
      }
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    const generateQR = async () => {
      if (!inputText) {
        setSvg(null);
        return;
      }

      await init();

      const inputQr: InputQr = {
        text: inputText,
        minVersion: 1,
        strictVersion: false,
        minEcl: ECL.Low,
        strictEcl: false,
        mode: null,
        mask: null,
      };

      const outputQr = generateOutputQr(inputQr);
      const outputSvg = renderSVG(outputQr, params);
      setSvg(outputSvg);
    };

    generateQR();
    updateURL(inputText);
  }, [inputText, updateURL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  return (
    <div>
      <div>
        {inputText === ""
          ? "Start typing to generate QR"
          : `QR content: ${inputText}`}
      </div>
      <input
        type="text"
        autoComplete="off"
        value={inputText}
        maxLength={50}
        onChange={handleInputChange}
        placeholder="Enter text for QR code"
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      {svg ? (
        <div className="h-80 w-80" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <>
          <div className="relative h-80 w-80 bg-slate-300/50 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </>
      )}
    </div>
  );
};

export default Client;
