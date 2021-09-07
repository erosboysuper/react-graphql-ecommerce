export const dateDiffInDays = (fromDate, toDate) => {
  const utc1 = Date.UTC(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  )
  const utc2 = Date.UTC(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate()
  )

  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export const queryParams = (searchStr = '') => {
  let queryAry = {}
  searchStr
    .split('&')
    .filter(x => x)
    .forEach(x => {
      let ary = x.split('=')
      ary = ary.map(y => decodeURI(y))
      queryAry[ary[0]] = ary[1] || ''
    })
  return queryAry
}

export const obj2QryStr = (params = {}) => {
  return Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')
}

export const dateFormat = date => {
  const dd = new Date(date)

  const _year = dd.getUTCFullYear()
  const _month = dd.getUTCMonth() + 1
  const _date = dd.getUTCDate()

  return `${_date < 10 ? '0' + _date : _date}.${
    _month < 10 ? '0' + _month : _month
  }.${_year}`
}

export const html2Text = text => {
  let html = `${text}`

  // REMOVE \n //
  // html = `${html}`.replace(/\n/ig, '')

  // REMOVE HTML TAGS FOR SECURITY PURPOSE //
  html = `${html}`.replace(/<[^>]*>/g, '')

  return html
}

export const subStr = (text, limit) => {
  text = html2Text(text)
  const length = text.length
  text = text.slice(0, limit)
  text = length > limit ? `${text}...` : ``

  return text
}

export const formatedHtml = text => {
  let html = `${text}`

  // REMOVE HTML TAGS FOR SECURITY PURPOSE //
  html = `${html}`.replace(/<[^>]*>/g, '')

  // NEW LINE TO BR //
  html = `${html}`.replace(/(?:\r\n|\r|\n)/g, '<br />')

  // MENTION `@` USERS //
  html = formatedAtMention(`${html}`)

  // MENTION `/` ROOMS //
  html = formatedRoomMention(`${html}`)

  // LINKIFY THE CONTENT //
  html = linkify(`${html}`)

  return html
}

export const formatedAtMention = text => {
  let html = `${text}`
  html = html.replace(/@\[(.*?)\]\(.*?\)/gi, str => {
    let ary = str.split('](')
    return `<a href="javascript:;" class="show-profile" user_id="${ary[1].replace(
      ')',
      ''
    )}">@${ary[0].replace('@[', '')}</a>`
  })
  return html
}

export const formatedRoomMention = text => {
  let html = `${text}`
  html = html.replace(/\/\[(.*?)\]\(room:.*?\)/gi, str => {
    let ary = str.split('](room:')
    return `<a href="javascript:;" class="show-room" room_id="${ary[1].replace(
      ')',
      ''
    )}">${ary[0].replace('/[', '')}</a>`
  })
  return html
}

export const linkify = inputText => {
  var replacedText, replacePattern1, replacePattern2, replacePattern3

  //URLs starting with http://, https://, or ftp://
  replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  )

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  )

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  )

  return replacedText
}

export const importScript = (url, id, cb = null) => {
  const alreadyExists = document.getElementById(id)
  if (url && !alreadyExists) {
    let tag = document.createElement('script')
    tag.defer = !0
    tag.src = url
    tag.id = id
    if (cb) {
      tag.onload = cb()
    }

    let t = document.getElementsByTagName('body')[0]
    t.appendChild(tag)
  }
}

export const importStyle = (url, id) => {
  const alreadyExists = document.getElementById(id)
  if (url && !alreadyExists) {
    let tag = document.createElement('link')
    tag.defer = !0
    tag.href = url
    tag.id = id
    tag.rel = 'stylesheet'
    tag.type = 'text/css'

    let t = document.getElementsByTagName('head')[0]
    t.appendChild(tag)
  }
}

export const zendeskWidget = () => {
  importScript(
    `https://static.zdassets.com/ekr/snippet.js?key=6464d9ac-9286-461d-8980-4e2b12ba112f`,
    `ze-snippet`
  )
  window['zESettings'] = {
    webWidget: {
      zIndex: 5,
      offset: {
        horizontal: '0px',
        vertical: '70px',
        mobile: {
          horizontal: '0px',
          vertical: '80px',
        },
      },
    },
  }
}

export const gtagLibrary = () => {
  window['dataLayer'] = window['dataLayer'] || []
  if (window['dataLayer'].length > 0) return
  window['dataLayer'].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })
  window['dataLayer'].push({ event: 'optimize.activate' })
  window['gtag'] = (...args) => {
    window['dataLayer'].push(args)
  }
  importScript(
    `https://metrics.tbo.clothing/gtm.js?id=${process.env.GTAG_ID}`,
    `rg-gtag-lib`
  )
}

export const optimalImage = imageSet => {
  let image = null
  let image_large = null
  if (imageSet) {
    if (imageSet.formats) {
      image = imageSet.formats.thumbnail.url
      image_large = imageSet.formats.medium
        ? imageSet.formats.medium.url
        : imageSet.formats.small
        ? imageSet.formats.small.url
        : imageSet.url
    } else {
      image = imageSet.url
      image_large = imageSet.url
    }
  }
  return {
    image,
    image_large,
  }
}

export const getBrowserDetail = () => {
  let nAgt = navigator.userAgent
  let browserName = navigator.appName
  let fullVersion = '' + parseFloat(navigator.appVersion)
  let majorVersion = parseInt(navigator.appVersion, 10)
  let nameOffset, verOffset, ix
  let OSName = 'Unknown OS'

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browserName = 'Opera'
    fullVersion = nAgt.substring(verOffset + 6)
    if ((verOffset = nAgt.indexOf('Version')) != -1)
      fullVersion = nAgt.substring(verOffset + 8)
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browserName = 'Microsoft Internet Explorer'
    fullVersion = nAgt.substring(verOffset + 5)
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browserName = 'Chrome'
    fullVersion = nAgt.substring(verOffset + 7)
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browserName = 'Safari'
    fullVersion = nAgt.substring(verOffset + 7)
    if ((verOffset = nAgt.indexOf('Version')) != -1)
      fullVersion = nAgt.substring(verOffset + 8)
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browserName = 'Firefox'
    fullVersion = nAgt.substring(verOffset + 8)
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if (
    (nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset)
    fullVersion = nAgt.substring(verOffset + 1)
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName
    }
  }

  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(';')) != -1)
    fullVersion = fullVersion.substring(0, ix)
  if ((ix = fullVersion.indexOf(' ')) != -1)
    fullVersion = fullVersion.substring(0, ix)

  majorVersion = parseInt('' + fullVersion, 10)
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion)
    majorVersion = parseInt(navigator.appVersion, 10)
  }

  if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows'
  if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS'
  if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX'
  if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux'

  return {
    operating_system: `${OSName}`,
    appName: `${navigator.appName}`,
    userAgent: `${navigator.userAgent}`,
    deviceMemory: `${navigator.deviceMemory}GB`,
    language: `${navigator.language}`,
    outerHeight: `${window.outerHeight}`,
    outerWidth: `${window.outerWidth}`,
    browserName,
    fullVersion,
    majorVersion,
  }
}
