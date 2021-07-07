/*
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
        }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
console.log(theHobbit.info())
*/

let myLibrary = [];

function Book(){
    //the constructor...
}

function addBookToLibrary(){
    let title = window.prompt('What is the title?');
    let author = window.prompt('Who is the author?');
    let pages = parseInt(window.prompt('How many pages does it have?'));
    let read = window.prompt('Did you read it yet?', 'not read yet');
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

/*
function testBook(){
    const tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdPages = document.createElement('td');
    const tdRead = document.createElement('td');
    const bookTable = document.querySelector('#book-table');

    tdTitle.textContent = 'The Hobbit';
    tdAuthor.textContent = 'J.R.R. Tolkien';
    tdPages.textContent = (295).toString();
    tdRead.textContent = 'not read yet';

    bookTable.appendChild(tr);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
}
*/

for (let book in myLibrary){
    //loop through myLibrary and display books in table
    const tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdPages = document.createElement('td');
    const tdRead = document.createElement('td');
    const bookTable = document.querySelector('#book-table');

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdRead.textContent = book.read;

    bookTable.appendChild(tr);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    
}

testBook();
