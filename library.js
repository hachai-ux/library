let myLibrary = [];


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



function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
   
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


    //remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('class', 'remove-button');
    removeButton.setAttribute('data-index', myLibrary.indexOf(book));

/*
    //eventlistener for remove button
       
    removeButton.addEventListener('click', () => {
        bookTable.removeChild(tr);
        myLibrary.splice(myLibrary.indexOf(book))
    });
*/

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdRead.textContent = book.read;


    bookTable.appendChild(tr);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    tr.appendChild(removeButton);
    }); 
};

function addLastToTable(){

    let lastBook = myLibrary.slice(-1)[0];
      
    
        //loop through myLibrary and display books in table
        const tr = document.createElement('tr');
        const tdTitle = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdPages = document.createElement('td');
        const tdRead = document.createElement('td');
        const bookTable = document.querySelector('#book-table');


        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('class', 'remove-button');
        removeButton.setAttribute('data-index', myLibrary.indexOf(lastBook));


        tdTitle.textContent = lastBook.title;
        tdAuthor.textContent = lastBook.author;
        tdPages.textContent = lastBook.pages;
        tdRead.textContent = lastBook.read;


        
       
    
        bookTable.appendChild(tr);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(removeButton);
       
        //only append newly created book

        
        
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
    addBookToLibrary(title, author, pages, read);
    document.getElementById("popup-form").style.display = "none";
    addLastToTable();
  
    
});

//listener für remove button - event bubbling
const bookTable = document.querySelector('#book-table');
bookTable.addEventListener('click', (e)=>{
    console.log(e.target);
    console.log(e.target.getAttribute('data-index'));
    //only remove if remove button is clicked/not when bookTable is clicked
    if(e.target.getAttribute('class') === 'remove-button'){
    myLibrary.splice(myLibrary.indexOf(parseInt(e.target.getAttribute('data-index')),1));
    bookTable.removeChild(e.target.parentNode);
    }
    console.log(myLibrary);

    //re-assign data-indexes for dom elements
    removeButtonsNodeList = document.querySelectorAll('.remove-button');
    removeButtonsArray = Array.from(removeButtonsNodeList);
    removeButtonsArray.forEach(button => {
        button.setAttribute('data-index', removeButtonsArray.indexOf(button));
    });


    console.log(removeButtonsArray);
       
});



  

displayTable();
y