export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital?: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}
