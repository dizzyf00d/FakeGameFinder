(function(){
let genreTabs = Array.from(document.querySelectorAll('.partnersaledisplay_SaleTabLabel_1mvCC'))

// looks through Steam's sale preview.
// (local function) findFakeGame(): false | Element
function findFakeGame () {
    let capsulecontainer = Array.from(document.querySelectorAll('.salepreviewwidgets_CapsuleContainer_1-sO3 a.Focusable')).filter(capsulecontainer => capsulecontainer.href == '')
    if (capsulecontainer.length == 1) {
        return capsulecontainer[0]
    } else {
        return false
    }
}

// wait function
// (local function) wait(ms: any): Promise<any>
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done Waiting");
      resolve(ms)
    }, ms )
  })
} 

// Search in current tab.
// If found the game display it to the end-user.
// (local function) searchInTabs(genreTabs: any, currentID: any): any
async function searchInTabs (genreTabs, currentID) {
    if (currentID >= genreTabs.length) {
        alert('Not found. Please refresh page')
        return false
    }

    genreTabs[currentID].click()
    console.log("Loading Tab...")
    await wait(5000);

    let fakeGame = findFakeGame()
    if (fakeGame === false) {
        return searchInTabs(genreTabs, currentID + 1)
    } else {
        fakeGame.focus() // go to fake Steam Game.
        return true
    }
}

console.log(searchInTabs(genreTabs, 0))
})()