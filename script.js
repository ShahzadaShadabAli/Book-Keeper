const modal = document.getElementById('modal-container')
const bookmarkContainerEl = document.getElementById('bookmarks')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('modal-form')
const webTitle = document.getElementById('title')
const webUrl = document.getElementById('url')
const bookmarksContainer = document.getElementById('modal-container')
const activateBtn = document.getElementById('activate-modal')
const submitBtn = document.getElementById('submit')

let bookmarks = []

//To Create Items
function createItem() {
    //Emptying the bookmark container
    bookmarkContainerEl.textContent = ''
    //Adding Item
    bookmarks.forEach(function (bookmark) {
        const { title, url } = bookmark
        //item
        const item = document.createElement('div')
        item.classList.add('item')
        //Close Icon
        const deleteBtn = document.createElement('span')
        deleteBtn.textContent = 'X'
        deleteBtn.classList.add('delete-bookmark')
        deleteBtn.setAttribute('onclick', `deleteBookmark('${url}')`)
        //Link Items
        const linkItem = document.createElement('div')
        //Name And Favicon
        const img = document.createElement('img')
        img.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        img.classList.add('img')
        const a = document.createElement('a')
        a.setAttribute('href', `${url}`)
        a.setAttribute('target', '_blank')
        a.textContent = title
        //Appending The Variables
        linkItem.append(img, a)
        item.append(deleteBtn, linkItem)
        bookmarkContainerEl.appendChild(item)

        //     bookmarkContainerEl.innerHTML += 
        // `<div class="item">
        //         <span id="delete-bookmark" onclick="removeItem()">X</span>
        //         <img src="" alt="favicon">
        //         <a href="${url}" target="_blank">${title}</a>
        // </div>`
    })
}



//Validation Using Regular Expression
function validate(title, URL) {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    // if(!title && !URL){
    //     alert("Kindly Enter Both The Credentials!");  
    //     return false
    // }
    if (!URL.match(regex)) {
        alert("Invalid Web Address!");
        return
    }
    else if (!title || !URL) {
        alert("Kindly Enter The Credential!");
        return
    }

    return true

}


// To fetch data from localStorage
function fetchData() {
    if (localStorage.getItem('Bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('Bookmarks'))
    } else {
        bookmarks = [{
            title: 'Shadab',
            url: 'Shadab.com',
        }]
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarks))
    }
    createItem()

}

//Delete Item
function deleteBookmark(url) {
    bookmarks.forEach(function (bookmark, i) {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1)
        }
    })
    //Update The Local Storage
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarks))
    fetchData()
}



//show the modal
function showModal() {
    modal.classList.add('show-modal')
    //Making so that the cursor is directed towards the title input
    webTitle.focus()
}

//Hide The Modal
function hideModal() {
    modal.classList.remove('show-modal')
}

//To close the modal without clicking on X
function windowEvents(event) {
    // ternary condition
    (event.target === modal ? hideModal() : false)
}


function extractInputData(event) {
    event.preventDefault()
    const title = event.srcElement[0].value
    let URL = event.srcElement[1].value
    if (!URL.includes('http://') && !URL.includes('https://')) {
        URL = `https://${URL}`
    }
    validate(title, URL)
    if (!validate(title, URL)) {
        return false
    }

    const bookmark = {
        title: title,
        url: URL,
    }


    bookmarks.push(bookmark)
    bookmarkForm.reset()
    webTitle.focus()
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarks))
    hideModal()
    createItem()

}

//Event Listeners
activateBtn.addEventListener('click', showModal)
modalClose.addEventListener('click', hideModal)
//This Event Listener is to determine the position at which the user has clicked
window.addEventListener('click', windowEvents)
bookmarkForm.addEventListener('submit', extractInputData)
//On load
fetchData()