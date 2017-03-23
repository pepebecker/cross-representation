var lang = new Lang()
lang.dynamic('de', '/js/langpack/de.json')
lang.dynamic('es', '/js/langpack/es.json')
lang.init({defaultLang: 'en'})

if (getparam('lang') != null) {
  // console.log('Has param: ' + getparam('lang'))
  setLanguage(getparam('lang'))
} else {
  if (localStorage.getItem('lang') != null) {
    // console.log('Has localStorage:' + localStorage.getItem('lang'))
    setLanguage(localStorage.getItem('lang'))
  } else {
    lang.init({defaultLang: 'en'})
  }
}

function getparam (param) {
  var vars = {}
  window.location.href.replace(location.hash, '').replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) { // callback
      vars[key] = value !== undefined ? value : ''
    })
  if (param) {
    return vars[param] ? vars[param] : null
  }
  return vars
}

function setLanguage (lang) {
  // console.log('set lang to: ' + lang)
  localStorage.setItem('lang', lang)
  window.lang.change(lang)
}

// function insertParam (key, value) {
//     key = encodeURI(key); value = encodeURI(value)
//     var kvp = document.location.search.substr(1).split('&')
//     var i = kvp.length
//     var x
//     while(i--) {
//         x = kvp[i].split('=')
//         if (x[0] == key) {
//             x[1] = value
//             kvp[i] = x.join('=')
//             break
//         }
//     }
//     if (i < 0) {
//         kvp[kvp.length] = [key, value].join('=')
//     }
//     // this will reload the page, it's likely better to store this until finished
//     document.location.search = kvp.join('&')
// }

// if (getparam('lang') == 'es') {
//   window.lang.change('es')
// }
//
// if (getparam('lang') == 'de') {
//   window.lang.change('de')
// }
//
// if (getparam('lang') == 'en') {
//   window.lang.change('en')
// }
