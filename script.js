const libraryContainer = document.querySelector('#library-container')
const formDiv = document.querySelector('#form-div')
const addBookForm = document.querySelector("#add-book-form")
const grayOverlay = document.querySelector("#gray-overlay")

let myLibrary = []

function Book(title, author, year, pages, read, id) {
  this.title = title
  this.author = author
  this.year = year
  this.pages = pages
  this.read = read
  this.id = id

  this.toggleRead = function() {
    this.read = !this.read
  }

  this.setId = function(id) {
    this.id = id
  }
}

function addBookToLibrary(title, author, year, pages, read) {
  let id = generateRandomId()
  let newBook = new Book(title, author, year, pages, read, id)

  myLibrary.push(newBook)

  let newBookCard = createBookCard(newBook)
  libraryContainer.prepend(newBookCard)

  setTimeout(() => newBookCard.classList.add('visible'), 80)
}

function displayLibrary() {
  libraryContainer.textContent = ''
  let bookCards = []
  myLibrary.forEach(book => bookCards.unshift(createBookCard(book)))

  bookCards.forEach(card => {
    libraryContainer.appendChild(card)
    card.classList.add('visible')
  })
}

// Creates card to be added to DOM, with book info
function createBookCard(book) {
  let card = document.createElement('div')
  card.classList.add('book-card')
  card.setAttribute('data-id', book.id)

  let titleBox = document.createElement('div')
  titleBox.classList.add('title-box')
  let titleHeading = `<h3>${book.title}</h3>`
  titleBox.innerHTML = titleHeading

  let infoBox = document.createElement('div')
  infoBox.classList.add('info-box')
  let info = `
    <span class='info-line'><span class="info-tag"><pre>Author: </pre></span> ${book.author}</span>
    <span class='info-line'><span class="info-tag"><pre>Year  : </pre></span> ${book.year}</span>
    <span class='info-line'><span class="info-tag"><pre>Pages : </pre></span> ${book.pages}</span>
    <span class='info-line'><span class="info-tag"><pre>Read? : </pre></span><span class='read-status'> ${book.read ? 'Yes' : 'Not Yet'}</span></span>
  `;
  infoBox.innerHTML = info

  let buttonContainer = document.createElement('div')
  buttonContainer.classList.add('card-btn-container')

  let toggleReadButton = document.createElement('button')
  toggleReadButton.classList.add('read-toggle-btn')
  toggleReadButton.textContent = `Toggle 'Read'`
  toggleReadButton.addEventListener('click', event => {toggleRead(event)})

  let deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-btn')
  deleteButton.addEventListener('click', event => {removeBook(event)})

  buttonContainer.appendChild(toggleReadButton)
  buttonContainer.appendChild(deleteButton)
  
  card.appendChild(titleBox)
  card.appendChild(infoBox)
  card.appendChild(buttonContainer)

  return card
}

// Generate random ID for book / DOM card
function generateRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Form handling

function showForm() {
  formDiv.style.display = 'block'
  formDiv.style.opacity = '1'
  grayOverlay.style.display = 'block'
  grayOverlay.style.opacity = '1'
}

function hideForm() {
  addBookForm.reset()
  formDiv.style.display = 'none'
  formDiv.style.opacity = '0'
  grayOverlay.style.display = 'none'
  grayOverlay.style.opacity = '0'
}

addBookForm.addEventListener('submit', event => {
  event.preventDefault()
  bookFormSubmit()
})

function bookFormSubmit() {
  let title = addBookForm.title.value
  let author = addBookForm.author.value
  let year = addBookForm.year.value
  let pages = addBookForm.pages.value
  let read = addBookForm.read.checked

  hideForm()

  addBookToLibrary(title, author, year, pages, read)
}

// Card button functions

function findParentCard(node) {
  return node.closest('.book-card')
}

function removeBook(event) {
  let parentCard = findParentCard(event.target)
  let id = parentCard.dataset.id
  
  libraryContainer.removeChild(parentCard)

  myLibrary.splice(myLibrary.findIndex(book => book.id === id),1)
}

function toggleRead(event) {
  let parentCard = findParentCard(event.target)
  let id = parentCard.dataset.id

  let book = myLibrary.find(book => book.id === id)
  book.toggleRead()
  console.log(book.read)

  let readSpan = parentCard.querySelector('.read-status')
  let readStatus = book.read ? 'Yes' : 'Not Yet'
  
  readSpan.textContent = readStatus
}