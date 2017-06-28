const root = document.querySelector('#interactive-svg')
const textPopup = document.querySelector('.text-popup')
const textPopupName = textPopup.querySelector('.name')
const textPopupDescription = textPopup.querySelector('.description')
let mouseHover = false

fetch('svg-model/locales.json')
.then(res => res.json())
.then(locales => {
  fetch('svg-model/data.json')
  .then(res => res.json())
  .then(data => {
    const model = new SVGModel(root, data)

    model.onEnterNode = (node) => {
      let description = node.description.toLowerCase()
      description = locales[lang.currentLang][description]
      textPopupName.innerHTML = node.name
      textPopupDescription.innerHTML = description
      textPopup.classList.add('active')
      textPopupName.classList.add('name-active')
      textPopupDescription.classList.add('name-active')
      mouseHover = true
    }

    model.onLeaveNode = (node) => {
      textPopup.classList.remove('active')
      mouseHover = false
    }

    model.onClickNode = (node) => {
      console.log('onClickNode', node)
    }

    model.onEnterLine = (line) => {
      textPopupName.innerHTML = ''
      const description = `${line.from.name} ⟶ ${line.to.name} &emsp; ${line.correlation}`
      textPopupDescription.innerHTML = description
      textPopup.classList.add('active')
      textPopupName.classList.remove('name-active')
      textPopupDescription.classList.remove('name-active')
      mouseHover = true
    }

    model.onLeaveLine = (line) => {
      textPopup.classList.remove('active')
      mouseHover = false
    }

    model.onClickLine = (line) => {
      console.log('onClickLine', line)
      if (line.video) {
        showPopup(line.video)
      }
    }
  })
  .catch(console.error)
})
.catch(console.error)

root.addEventListener('mousemove', function (event) {
  if (mouseHover) {
    let mouseX = event.clientX + window.pageXOffset
    let mouseY = event.clientY + window.pageYOffset
    textPopup.style.top = mouseY + 'px'
    textPopup.style.left = mouseX + 'px'
  }
})

function showPopup (link) {
  const popup = document.querySelector('.video-popup')
  const video = popup.querySelector('video')
  video.src = './videos/' + link
  popup.classList.add('active')
  video.play()
}

function closePopup () {
  const popup = document.querySelector('.video-popup')
  const video = popup.querySelector('video')
  video.pause()
  video.currentTime = 0
  video.src = '#'
  popup.classList.remove('active')
}