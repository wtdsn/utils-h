function getFullY(format = 'yyyy') {
  if (format.toLowerCase() === 'yyyy')
    return new Date().getFullYear()
  else
    return (new Date().getFullYear()).toString().slice(2, 4)
}

function getT(t, format, dual) {
  if (format.toLowerCase() === dual) {
    return t < 9 ? '0' + t : t
  }
  return t
}

function getMouth(format = 'mm') {
  let m = new Date().getMonth() + 1
  return getT(m, format, 'mm')
}

function getDate(format = 'dd') {
  let d = new Date().getDate()
  return getT(d, format, 'dd')
}

function getHours(format = 'hh') {
  let h = new Date().getHours()
  return getT(h, format, 'hh')
}

function getMinutes(format = 'mimi') {
  let m = new Date().getMinutes()
  return getT(m, format, 'mimi')
}

function getSeconds(format = 'ss') {
  let s = new Date().getSeconds()
  return getT(s, format, 'ss')
}

/* 
  @desci 输入模式字符串
  @param  yy-mm-dd hh:mimi:ss
*/

function getTime(format) {
  let FY = /y{4}/ig
  let FM = /m{2}/ig
  let FD = /d{2}/ig
  let FH = /h{2}/ig
  let FMI = /(mi){2}/ig
  let FS = /s{2}/ig

  format = format.replace(FY, getFullY())
  format = format.replace(FM, getMouth())
  format = format.replace(FD, getDate())
  format = format.replace(FH, getHours())
  format = format.replace(FMI, getMinutes())
  format = format.replace(FS, getSeconds())


  let Y = /yy/ig
  let M = /m(?!i)/ig
  let D = /d/ig
  let H = /h/ig
  let MI = /(mi)/ig
  let S = /s/ig

  format = format.replace(Y, getFullY('yy'))
  format = format.replace(M, getMouth('m'))
  format = format.replace(D, getDate('d'))
  format = format.replace(H, getHours('h'))
  format = format.replace(MI, getMinutes('mi'))
  format = format.replace(S, getSeconds('s'))

  return format
}

export default getTime