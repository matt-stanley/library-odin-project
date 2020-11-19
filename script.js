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

function addBooktoLibrary(title, author, year, pages, read) {
  newBook = new Book(title, author, year, pages, read)
  myLibrary.push(newBook)
}