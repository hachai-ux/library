// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUJlN3l4B7wCRRE7zvv7EhJSwctMCKjJY",
  authDomain: "library-e07dc.firebaseapp.com",
  projectId: "library-e07dc",
  storageBucket: "library-e07dc.appspot.com",
  messagingSenderId: "988865219011",
  appId: "1:988865219011:web:c5b982d83431c12ac1d576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//specified firestore app
const db = getFirestore(app);


// Loads books history and listens for upcoming ones.
function loadBooks() {
  // Create the query to load the last books and listen for new ones.
  const recentBooksQuery = query(collection(getFirestore(), 'books'), orderBy('timestamp', 'asc'));
  
  // Start listening to the query.
    onSnapshot(recentBooksQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
        console.log('Change fired');
      if (change.type === 'removed') {
        deleteBook(change.doc.id);
      } else {
          //check if local or server
          const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source);
          var book = change.doc.data();
          if (source === "Server") {
                displayBook(change.doc.id, book.title,
                      book.author, book.pages, book.read);
          }
      }
    });
  });
}


// Saves a new message to Cloud Firestore.
async function saveBook(title, author, pages, read) {
  // Add a new book entry to the Firebase database.
    try {
    await addDoc(collection(getFirestore(), 'books'), {
      title: title,
      author: author,
      pages: pages,
      read: read,
      timestamp: serverTimestamp()
    });
  }
  catch(error) {
    console.error('Error writing new book to Firebase Database', error);
  }
}


function displayBook(id, title, author, pages, read){

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
    tr.setAttribute('id', id);


    tdTitle.textContent = title;
    tdAuthor.textContent = author;
    tdPages.textContent = pages;
    if(read === true){
        tdRead.textContent = 'Has been read'
    }
    else if (read === false){
        tdRead.textContent = 'Has not been read'
    }
 


    bookTable.appendChild(tr);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    tr.appendChild(readButton);
    tr.appendChild(removeButton);
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
    saveBook(title, author, pages, read);
    document.getElementById("popup-form").style.display = "none";
    
  
    
});

const bookTable = document.querySelector('#book-table');
bookTable.addEventListener('click', (e) => {
    //only remove if remove button is clicked/not when bookTable is clicked
    //listener für remove button - event bubbling
    if (e.target.getAttribute('class') === 'remove-button') {
        const id = e.target.parentNode.getAttribute('id');
        deleteBookOnDatabase(id);
    }

    //async function
    toggleReadStatus(e);

   
});

async function toggleReadStatus(e) {

     //listener for isRead Toggle
    if (e.target.getAttribute('class') === 'read-button') {
        const id = e.target.parentNode.getAttribute('id');
        const readStatus = await getBookReadData(id);
        await updateBookReadDataOnDatabase(id, readStatus);
        changeReadStatus(id);
        //fetching data back and forth probably not optimal
    }
};



async function getBookReadData(id) {
    //removes from firestore when removed with button

    const docSnap = await getDoc(doc(db, "books", id));

    if (docSnap.exists()) {
        return docSnap.data().read;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
  
    }
};
   

async function updateBookReadDataOnDatabase(id, readStatus) {
    console.log(readStatus);
    if (readStatus === true) {
        await updateDoc(doc(db, "books", id), {
            read: false
        });
            
    }
    else if (readStatus === false) {
        await updateDoc(doc(db, "books", id), {
            read: true
        });
  
    }
        
}
    
async function changeReadStatus(id){

    //queryselector doesn't work with number ids, not valid in css
    //or use document.querySelector("[id='number']")
    const parentNode = document.getElementById(id);
    console.log(id);
    console.log(parentNode);
    const tdRead = parentNode.querySelector('.read-status');
    const readStatus = await getBookReadData(id);

    if(readStatus === true){
        tdRead.textContent = 'Has been read'
    }
    else if (readStatus === false){
        tdRead.textContent = 'Has not been read'
    }
 
};
   



    function deleteBook(id) {
        //removes from UI after snapshot change is remove
    
        var book = document.getElementById(id);
        console.log(book);
        // If an element for that message exists we delete it.
        if (book) {
            book.parentNode.removeChild(book);
        }
    }

    async function deleteBookOnDatabase(id) {
        //removes from firestore when removed with button

        await deleteDoc(doc(db, "books", id));
    
  
    }








  
    loadBooks();
