const libraryContainer = document.querySelector('#library-container');

let myLibrary = []

function Book(title, author, year, pages, read) {
  this.title = title
  this.author = author
  this.year = year
  this.pages = pages
  this.read = read

  this.toggleRead = function() {
    this.read = !this.read
  }
}

function addBookToLibrary(title, author, year, pages, read) {
  newBook = new Book(title, author, year, pages, read)
  myLibrary.push(newBook)
  displayLibrary()
}

function displayLibrary() {
  libraryContainer.textContent = ''
  bookCards = []
  myLibrary.forEach(book => bookCards.unshift(createBookCard(book)))

  bookCards.forEach(card => {
    libraryContainer.appendChild(card)
  })
}

// Creates card to be added to DOM, with book info
function createBookCard(book) {
  const card = document.createElement('div')
  card.classList.add('book-card')

  const titleBox = document.createElement('div')
  const titleHeading = `<h3>${book.title}</h3>`
  titleBox.innerHTML = titleHeading

  const infoBox = document.createElement('div')
  const info = `
    <span><span class="info-tag">Author: </span> ${book.author}</span>
    <span><span class="info-tag">Year  : </span> ${book.year}</span>
    <span><span class="info-tag">Pages : </span> ${book.pages}</span>
    <span><span class="info-tag">Read? : </span> ${book.read}</span>
  `;
  infoBox.innerHTML = info
  
  card.appendChild(titleBox)
  card.appendChild(infoBox)

  return card
}