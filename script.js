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
  newBookCard = createBookCard(newBook)
  libraryContainer.prepend(newBookCard)
  setTimeout(() => newBookCard.classList.add('visible'), 100)
  
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
  const card = document.createElement('div')
  card.classList.add('book-card')

  const titleBox = document.createElement('div')
  titleBox.classList.add('title-box')
  const titleHeading = `<h3>${book.title}</h3>`
  titleBox.innerHTML = titleHeading

  const infoBox = document.createElement('div')
  infoBox.classList.add('info-box')
  const info = `
    <span class='info-line'><span class="info-tag"><pre>Author: </pre></span> ${book.author}</span>
    <span class='info-line'><span class="info-tag"><pre>Year  : </pre></span> ${book.year}</span>
    <span class='info-line'><span class="info-tag"><pre>Pages : </pre></span> ${book.pages}</span>
    <span class='info-line'><span class="info-tag"><pre>Read? : </pre></span> ${book.read}</span>
  `;
  infoBox.innerHTML = info
  
  card.appendChild(titleBox)
  card.appendChild(infoBox)

  return card
}