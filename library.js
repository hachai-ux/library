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

//add function to book prototype instance
Book.prototype.changeReadStatus = function() {
    if(this.read === true){
        this.read = false;
    }
    else if(this.read === false){
        this.read = true;
    }


  }
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
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
    tdRead.setAttribute('class', 'read-status');
    const bookTable = document.querySelector('#book-table');

     //read-toggle-button

     const readButton = document.createElement('button');
     readButton.textContent = 'Change Read Status';
     readButton.setAttribute('class', 'read-button');

    //remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('class', 'remove-button');
    tr.setAttribute('data-index', myLibrary.indexOf(book));

   


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
    if(book.read === true){
        tdRead.textContent = 'Has been read'
    }
    else if (book.read === false){
        tdRead.textContent = 'Has not been read'
    }
 


    bookTable.appendChild(tr);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    tr.appendChild(readButton);
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
        tdRead.setAttribute('class', 'read-status');
        const bookTable = document.querySelector('#book-table');


        const readButton = document.createElement('button');
        readButton.textContent = 'Change Read Status';
        readButton.setAttribute('class', 'read-button');


        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('class', 'remove-button');
        tr.setAttribute('data-index', myLibrary.indexOf(lastBook));

       

        tdTitle.textContent = lastBook.title;
        tdAuthor.textContent = lastBook.author;
        tdPages.textContent = lastBook.pages;
        if(lastBook.read === true){
            tdRead.textContent = 'Has been read'
        }
        else if (lastBook.read === false){
            tdRead.textContent = 'Has not been read'
        }


        
       
    
        bookTable.appendChild(tr);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(readButton);
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
    let read = (submitForm.elements['read'].value === 'true'); //convert to boolean
    addBookToLibrary(title, author, pages, read);
    document.getElementById("popup-form").style.display = "none";
    addLastToTable();
  
    
});


const bookTable = document.querySelector('#book-table');
bookTable.addEventListener('click', (e)=>{
    console.log(e.target);
    console.log(e.target.parentNode.getAttribute('data-index'));
    //only remove if remove button is clicked/not when bookTable is clicked
    //listener für remove button - event bubbling
    if(e.target.getAttribute('class') === 'remove-button'){
    myLibrary.splice(myLibrary.indexOf(parseInt(e.target.parentNode.getAttribute('data-index')),1));
    bookTable.removeChild(e.target.parentNode);
    }
    console.log(myLibrary);

    //re-assign data-indexes for dom elements
    removeButtonsNodeList = document.querySelectorAll('.remove-button');
    removeButtonsArray = Array.from(removeButtonsNodeList);
    removeButtonsArray.forEach(button => {
        button.parentNode.setAttribute('data-index', removeButtonsArray.indexOf(button));
    });

    //listener for isRead Toggle
    if(e.target.getAttribute('class') === 'read-button'){
            index = e.target.parentNode.getAttribute('data-index');
            console.log(myLibrary[index].read);
            myLibrary[index].changeReadStatus();
            console.log(myLibrary[index].read);
            tdRead = e.target.parentNode.querySelector('.read-status');
            if(myLibrary[index].read === true){
                tdRead.textContent = 'Has been read'
            }
            else if (myLibrary[index].read === false){
                tdRead.textContent = 'Has not been read'
            }
        }
});
   
       




  

displayTable();
