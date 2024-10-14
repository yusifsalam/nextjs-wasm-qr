import { ECL, type Mask, type Mode } from "fuqr";

export type InputQr = {
  text: string;
  minVersion: number;
  strictVersion: boolean;
  minEcl: ECL;
  strictEcl: boolean;
  mode: Mode | null;
  mask: Mask | null;
};

export type OutputQr = Readonly<{
  text: string;
  version: number;
  ecl: ECL;
  mode: Mode;
  mask: Mask;
  matrix: Uint8Array;
}>;

type PARAM_VALUE_TYPES = {
  boolean: boolean;
  number: number;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select: any;
  file: File | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: any[];
};

export type Params = {
  [key: string]: PARAM_VALUE_TYPES[keyof PARAM_VALUE_TYPES];
};
