export function debounce(wait: number, fun: Function, immediate?: boolean): Function
export function throttle(dur: number, fun: Function, endCall?: boolean): Function

export interface LazyLoad {
  root: string,
  observe: () => void,
  disconnect: () => void,
  private _init: () => void,
  private imgList: Element[],
  private _cb: () => void
  private rootEle: Element
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
  [k: string]: string
}



export interface qs {
  parse(url: string): parseResInter | {},
  getQuery(url: string): queryInter,
  setQuery(url?: string, query: queryInter): string
}