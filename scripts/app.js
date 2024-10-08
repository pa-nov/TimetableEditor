const buttons = [
  document.getElementById("button-times"),
  document.getElementById("button-lessons"),
  document.getElementById("button-timetable"),
  document.getElementById("button-json")
]
const frames = [
  document.getElementById("frame-times"),
  document.getElementById("frame-lessons"),
  document.getElementById("frame-timetable"),
  document.getElementById("frame-json")
]
let selectedFrame = -1

function openEditor() {
  document.getElementById("view-start").style.display = "none"
  document.getElementById("view-main").style.display = "flex"
}

function openFrame(frameIndex) {
  if (frameIndex != selectedFrame) {
    for (let index = 0; index < frames.length; index++) {
      if (index == frameIndex) {
        buttons[index].className = "selected"
        frames[index].style.display = "flex"
      } else {
        buttons[index].className = "not-selected"
        frames[index].style.display = "none"
      }
    }

    if (selectedFrame == 3) {
      try {
        const jsonObject = JSON.parse(textJson.value)
        setTimes(jsonObject["times"])
        setLessons(jsonObject["lessons"])
        setTimetable(jsonObject["even"], jsonObject["odd"])
      } catch (error) {
        alert(`При чтении JSON произошла ошибка\n(${error})`)
        console.error(error)
      }
    }
    if (frameIndex == 3) {
      resizeTimetable()
      generateJson()
    }
    if (frameIndex == 2) {
      resizeTimetable()
      updateTimetableHead()
      updateTimetableBody()
    }

    selectedFrame = frameIndex
  }
}

document.getElementById("button-create").addEventListener("click", () => {
  openEditor()
  openFrame(0)
})
document.getElementById("button-open").addEventListener("click", () => {
  textJson.value = document.getElementById("input-json").value
  selectedFrame = 3
  openEditor()
  openFrame(2)
})
buttons[0].addEventListener("click", () => { openFrame(0) })
buttons[1].addEventListener("click", () => { openFrame(1) })
buttons[2].addEventListener("click", () => { openFrame(2) })
buttons[3].addEventListener("click", () => { openFrame(3) })
