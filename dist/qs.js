


/**
 * 传入 url , 将 url parse 出各个结构
 * 
 * @param {any} url 
 * @return {object}
 * object = {
 *  url:url
 *  scheme:协议
 *  domain:域名
 *  port:端口,
 *  path:路径
 *  query:参数
 *  hash:哈希值
 * }
 */
function parse(url) {
  url = url.trim()

  let reg = /^(.+?):\/\/([A-z0-9\.]+)(?:\:([0-9]{0,5}))?([^\?\#\:]+)*(?:\?([^#]*))?(?:\#(.*))?$/i

  let res
  try {
    let matchRes = url.match(reg)
    res = {
      url,
      scheme: matchRes[1],
      domain: matchRes[2],
      port: matchRes[3],
      path: matchRes[4],
      query: matchRes[5],
      hash: matchRes[6],
    }
    return res
  } catch (err) {
    console.log(`fail to parse ${url}\n`, err);
    return {}
  }
}


/**
 * 传入url 获取 query 参数
 * query 参数位于 path（?） 和 hash (#) 之间
 * @param {any} url 
 * @returns 
 */
function getQuery(url) {
  let queryString

  try {
    queryString = url.match(/(?:\?([^#]*))/i)[1]
  } catch (err) {
    console.log(`fail to getQuery ${url}\n`, err);
  }

  if (!queryString) return {}

  const queryObj = {}
  queryString = decodeURI(queryString)
  queryString.split('&').forEach((v) => {
    const [key, value] = v.split('=')
    queryObj[key] = value
  })
  return queryObj
}


function setQuery(url = '', query) {
  let queryArr = [];
  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      queryArr.push([key] + "=" + query[key]);
    }
  }
  return (`${url}?${encodeURI(queryArr.join("&"))}`);
}



let qs = {
  parse,
  getQuery,
  setQuery
}

export default qs