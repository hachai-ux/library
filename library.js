let myLibrary = [];
console.log(myLibrary);

function Book(title, author, pages, read){ 
    //the constructor
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
        }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
//console.log(theHobbit.info())


myLibrary.push(theHobbit); //push a book to library array
console.log(myLibrary);


function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(title);
};


function displayTable(){

myLibrary.forEach(book => {
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
    }); 
};

const newBook = document.querySelector('#new-book');
newBook.addEventListener('click', () => {
    document.getElementById("popup-form").style.display = "block";
});


const closeButton = document.querySelector('#close-button');
closeButton.addEventListener('click', () => {
    document.getElementById("popup-form").style.display = "none";
});
  
const submitForm = document.querySelector('#popup-form');

submitForm.addEventListener('submit', () => {
    
    let title = submitForm.elements['title'].value;
    let author = submitForm.elements['author'].value;
    let pages = submitForm.elements['pages'].value;
    let read = submitForm.elements['read'].value;
    addBookToLibrary(title, author, pages, author);
    
});
  

displayTable();
