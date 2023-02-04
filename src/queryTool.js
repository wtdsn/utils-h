const handleQuery = {
  getQuery: (url) => {
    const index = url.indexOf('?')
    if (index === -1) return {}
    const hashIndex = url.indexOf('#')
    let queryString
    if (hashIndex !== -1 && hashIndex > index) {
      queryString = url.slice(index + 1, hashIndex)
    } else {
      queryString = url.slice(index + 1)
    }

    if (!queryString) return {}

    const queryObj = {}

    queryString.split('&').map((v) => {
      const [key, value] = v.split('=')
      queryObj[key] = value
    })
    return queryObj
  },
  setQuery(url, query) {
    let queryArr = [];
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        queryArr.push([key] + "=" + query[key]);
      }
    }
    return (url += "?" + queryArr.join("&"));
  },
};

export default handleQuery