export function debounce(wait: number, fun: Function, immediate?: boolean): Function
export function throttle(dur: number, fun: Function, endCall?: boolean): Function

export class LazyLoad {
  constructor(root?: string);
  observe(): void
  disconnect(): void
}

export class Validator {
  constructor();
  checkEmpty(text: string): boolean
  checkEqual(text1: string, text2: string): boolean
  checkObjEqual(obj1: any, obj2: any, keys?: string[]): boolean
  checkLen(text: string, minL = -Infinity, maxL = Infinity): boolean
  checkRange(num: number | string, min = -Infinity, max = Infinity, loose = false): boolean
  checkIsNum(num: number, loose = false, canbeNaN = false): boolean
  addRule(rule: function): number
  deleteRule(id: number): boolean
  clear(): void
  checkByRule(rule: number | string, obj: any, options?: any): boolean
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

export function getTime(format: string): string