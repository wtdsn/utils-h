export function debounce(wait: number, fun: Function, immediate?: boolean): Function
export function throttle(dur: number, fun: Function, endCall?: boolean): Function

export class LazyLoad {
  constructor(root?: string);
  observe(): void
  disconnect(): void
}

type ruleT = number | 'phone' | 'mail' | 'nameCh' | 'noEmpty' | 'equal' | 'objEqual' | 'len' | 'range' | 'isNum'

interface ruleInter {
  errText?: string
  rule: ruleT
  args: any[]
}

export class Validator {
  constructor();
  noEmpty(text: string): boolean
  equal(text1: string, text2: string): boolean
  objEqual(obj1: any, obj2: any, keys?: string[]): boolean
  len(text: string, minL: number, maxL: number): boolean
  range(num: number | string, min: number, max: number, loose: boolean): boolean
  isNum(num: number, loose: boolean, canbeNaN: boolean): boolean
  addRule(rule: Function): number
  // deleteRule(id: number): boolean
  clear(): void
  checkByRule(rule: ruleT, ...args: any): boolean
  checkByRules(rules: ruleInter[]): Promise
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