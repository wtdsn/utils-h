export function debounce(wait: number, fun: Function, immediate?: boolean): Function
export function throttle(dur: number, fun: Function, endCall?: boolean): Function

export class LazyLoad {
  constructor(root?: string);
  observe(): void
  disconnect(): void
}


interface parseResInter {
  url: string,
  scheme: string,
  domain: string,
  port: string,
  path: string,
  query: string,
  hash: string,
}


interface parseResInter {
  url: string,
  scheme: string,
  domain: string,
  port: string,
  path: string,
  query: string,
  hash: string,
}

interface queryInter {
  [k: string]: string | number
}


export namespace qs {
  function parse(url: string): parseResInter | {}
  function getQuery(url: string): queryInter
  function setQuery(url: string, query: queryInter): string
}