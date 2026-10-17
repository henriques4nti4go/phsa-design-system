import type { HTMLAttributes, DetailedHTMLProps } from "react";
import type { LitElement } from "lit";

// Tipos de JSX das tags <phsa-*>, derivados do HTMLElementTagNameMap que cada componente
// declara: importar um componente já tipa a tag no React, sem lista manual.

type Fn = (...args: never[]) => unknown;

/** Propriedades públicas do componente (sem métodos e sem o que vem de HTMLElement/LitElement). */
type ElementProps<E> = {
  [K in keyof E as K extends keyof LitElement ? never : E[K] extends Fn ? never : K]?: E[K];
};

type PhsaProps<E> = ElementProps<E> &
  Omit<DetailedHTMLProps<HTMLAttributes<E>, E>, keyof ElementProps<E>> & { class?: string };

type PhsaTags = {
  [K in keyof HTMLElementTagNameMap as K extends `phsa-${string}` ? K : never]: PhsaProps<HTMLElementTagNameMap[K]>;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends PhsaTags {}
  }
}

export {};
