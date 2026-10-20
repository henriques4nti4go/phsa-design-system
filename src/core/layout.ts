// Escalas compartilhadas pelos primitivos de layout (stack, grid). Classes inteiras, para o
// Tailwind achar: o CSS de cada componente faz `@source` deste arquivo.

export const gaps = {
  none: "ds:gap-0",
  xs: "ds:gap-1",
  sm: "ds:gap-2",
  md: "ds:gap-4",
  lg: "ds:gap-6",
  xl: "ds:gap-8",
  "2xl": "ds:gap-12",
};

export const paddings = {
  none: "ds:p-0",
  xs: "ds:p-1",
  sm: "ds:p-2",
  md: "ds:p-4",
  lg: "ds:p-6",
  xl: "ds:p-8",
  "2xl": "ds:p-12",
};

export type Space = keyof typeof gaps;
export const SPACES = Object.keys(gaps) as Space[];

/** Abaixo do breakpoint: some (`hide-below`) ou vira uma coluna (`stack-below`). */
export const hideBelow = {
  sm: "ds:max-sm:hidden",
  md: "ds:max-md:hidden",
  lg: "ds:max-lg:hidden",
};

export type Breakpoint = keyof typeof hideBelow;
export const BREAKPOINTS = Object.keys(hideBelow) as Breakpoint[];

export const minHeights = {
  none: "",
  full: "ds:min-h-full",
  screen: "ds:min-h-dvh",
};

export type MinHeight = keyof typeof minHeights;
export const MIN_HEIGHTS = Object.keys(minHeights) as MinHeight[];
