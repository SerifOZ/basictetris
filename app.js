const container = document.querySelector('#container')

const height = 30
const width = 15

for(let i=0; i<height; i++) {
  for(let j=0; j<width; j++) {
    let div = document.createElement("div")
    div.classList.add("grid")
    container.appendChild(div)
  }
}
const grids = document.querySelectorAll(".grid")
const objects = []
const lobject = [
  ["010","010","011"],["000","111","100"],["110","010","010"],["000","001","111"],
]
const oobject = [
  ["110","110","000"],["110","110","000"],["110","110","000"],["110","110","000"],
]
const jobject = [
  ["100","111","000"],["011","010","010"],["111","001","000"],["010","010","110"],
]
const iobject = [
  ["1000","1000","1000","1000"],["1111","0000","0000","0000"],["1000","1000","1000","1000"],["1111","0000","0000","0000"],
]
const sobject = [
  ["011","110","000"],["100","110","010"],["011","110","000"],["100","110","010"]
]
const tobject = [
  ["010", '111', '000'],["100","110","100"],["111","010","000"],["010","110","010"],
]
const zobject = [
  ["110","011","000"],["010","110","100"],["110","011","000"],["010","110","100"]
]
objects.push(lobject)
objects.push(oobject)
objects.push(jobject)
objects.push(iobject)
objects.push(sobject)
objects.push(tobject)
objects.push(zobject)

function objectR(){
  let object = objects[Math.floor(Math.random()*objects.length)]
  object.index = 0
  return object;
}
function addCurrent(tetris,height=6, index=0){
  let temp = height
  for(let i=0; i<tetris[tetris.index].length; i++){
    for(let j=0; j<tetris[tetris.index].length; j++){
      if(tetris[tetris.index][i][j] == 1){
        grids[height].classList.add("current")
      }
      height++
    }
    height =  temp + (i+1)*width
  }
}
function draw() {
  for(let i=0; i<grids.length; i++){
    if(grids[i].classList.contains("current")){
      grids[i].classList.add("tetris")
    }
  }
}
function undraw(){
  for(let i=0; i<grids.length; i++){
    if(grids[i].classList.contains("current")){
      grids[i].classList.remove("tetris")
    }
  }
}
function removeCurrent(){
  let indices = []
  for(let i=0; i<grids.length; i++){
    if(grids[i].classList.contains("current")){
      grids[i].classList.remove("current")
      indices.push(i)
    }
  }
  return Math.min.apply(null,indices)
}
let tetris = objectR()
function moveDown(tetrimito){
  let arrayIndex = []
  let tetrisIndex = []
  let currents = document.querySelectorAll(".current")
  for(let i=0; i<grids.length; i++){
    if(grids[i].classList.contains("current"))
      arrayIndex.push(i)
    if(grids[i].classList.contains("tetris") && !grids[i].classList.contains("current"))
      tetrisIndex.push(i)
  }
  let temp = 0

  if(!arrayIndex.some(checkEvery) && !arrayIndex.some(tetrisIndexCheck)){
    undraw()
    for(let i=0; i<arrayIndex.length; i++){
      grids[arrayIndex[i]].classList.remove("current")
    }
    for(let i=0; i<arrayIndex.length; i++){
      grids[arrayIndex[i]+width].classList.add("current")
    }
    draw()
  }else{
    removeCurrent()
    let countColumnOnGrid = 0
    for(let i=grids.length-1; i>44; i--){
      if(grids[i].classList.contains("tetris")){
        countColumnOnGrid++
      }
      if(countColumnOnGrid == 15 && i % 15 == 0){
        for(let j=i; j<i+15; j++){
          grids[j].classList.remove("tetris")
        }
        for(let j=grids.length-1; j>=0; j--){
          if(grids[j+15]){
            if(grids[j].classList.contains("tetris")){
              grids[j].classList.remove("tetris")
              grids[j+15].classList.add("tetris")
            }
          }
        }
        countColumnOnGrid = 0
      }
      if(i % 15 == 0)
        countColumnOnGrid = 0
    }
    tetris = objectR()
    addCurrent(tetris)
    draw()

  }
  function tetrisIndexCheck(item){
    return tetrisIndex.includes(item+width)
  }
  function checkEvery(item){
    return item > grids.length-width-1
  }
  return tetrimito
}
function moveRight(){
  undraw()
  let indices = []
  for(let i=grids.length-1; i>=0; i--){
    if(grids[i].classList.contains("current")){
      indices.push(i)
    }
  }
  let check = item =>{
    return (item+1)%15 == 0
  }
  let checkTetris = item =>{
    return grids[item + 1].classList.contains("tetris")
  }
  if(!indices.some(check) && !indices.some(checkTetris)){
    for(let i=0; i<indices.length; i++){
      grids[indices[i]].classList.remove("current")
      grids[indices[i]+1].classList.add("current")
    }
  }
  draw()
}
function moveLeft(){
  undraw()
  let indices = []
  for(let i=0; i<grids.length; i++){
    if(grids[i].classList.contains("current")){
      indices.push(i)
    }
  }
  let check = item =>{
    return (item)%15 == 0
  }
  let checkTetris = item =>{
    return grids[item - 1].classList.contains("tetris")
  }
  if(!indices.some(check) && !indices.some(checkTetris)){
    for(let i=0; i<indices.length; i++){
      grids[indices[i]].classList.remove("current")
      grids[indices[i]-1].classList.add("current")
    }
  }
  draw()
}

function addEvent(e){
  if(e.keyCode == 39)
    moveRight()
  if(e.keyCode == 37)
    moveLeft()
  if(e.keyCode == 32)
    changeTransform()
}


addCurrent(tetris)
draw()

setInterval(moveDown, 150, tetris)
window.addEventListener("keydown", addEvent)

function changeTransform(){
  tetris.index++
  if(tetris.index>3)
    tetris.index = 0
  undraw()
  let currentIndex = removeCurrent()
  addCurrent(tetris,currentIndex,tetris.index)
  draw()
}
