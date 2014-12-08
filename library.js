
function Book(author, title){

	this.author = author;
	this.title = title;
	this.shelf = null;

	this.enshelf = function(theshelf) {
		if ((this.shelf) && (this.shelf != theshelf)) {
			//gotta unshelf before enshelfing to a new shelf. If it's already on a shelf.
			this.unshelf(theshelf);
		};

		if (!this.shelf) {
			// if the book's shelf is null at this point, it means we need to enshelf it
			this.shelf = theshelf;
			theshelf.add_book(this);
		};

		// only remaining case is that the shelf passed in is 
		// the same as the one the book is already on. In which case
		// we would do nothing.
		
	};

	this.unshelf = function() {
		this.shelf.remove_book(this);
		this.shelf = null;
	};

};

function Shelf(){

	this.books = [];

	this.add_book = function(abook) {

		this.books.push(abook);
	};
	this.remove_book = function(abook) {
		var index = this.books.indexOf(abook);
		if (index !== -1) {
			this.books.splice(index, 1);
		}
	};

	this.list_books = function() {
		for (var i =0; i< this.books.length; i++) {
			console.log(this.books[i].author + ": " + "'" + this.books[i].title + "'");
		};
	}

};

function Library(){
	/*
	* A Library contains shelves. shelves contain books.
	* A library can determine how many books it contains.
	* A library can print all books, or return a list of all books.
	* Shelves can be added or removed from a Library.
	*
	*/
	this.shelves = [];


	this.add_shelf = function(ashelf) {
		// check if the shelf is already in the library

		if (this.shelves.indexOf(ashelf) == -1) {
			this.shelves.push(ashelf);
		};
	}
	this.remove_shelf = function(ashelf) {
		if (this.shelves.indexOf(ashelf) != -1) {
			this.shelves.pop(ashelf);
		}
	}
	this.get_num_books = function() {
		var total = 0;
		for (var i = 0; i < this.shelves.length; i++) {
			total += this.shelves[i].books.length;
		};
		return total;
	}

	this.print_all_books = function() {
		for (var i = 0; i < this.shelves.length; i++) {
			this.shelves[i].list_books();
		}
	};
	this.get_all_books = function() {
		// return one list composed of all books
		var booklist = [];
		for (var i = 0; i < this.shelves.length; i++) {
			for (var j = 0; j < this.shelves[i].books.length; j++) {
				booklist.push(this.shelves[i].books[j]);
			};
		};
		return booklist;
	}
};

console.log("hello world");
//instantiate some books, some shelves, and a library
var book1 = new Book('King, Stephen', 'The Dark Tower');
var book2 = new Book('King, Stephen', 'Wizard and Glass');
var book3 = new Book('Asimov, Isaac', 'Foundation');
var book4 = new Book('Herbert, Frank', 'Dune');
var shelf1 = new Shelf();
var shelf2 = new Shelf();
var myLibrary = new Library();


console.log("verify book1 got proper attributes:")
console.log(book1.author + ": " + "'" + book1.title + "'");
console.log("initial shelf should be null:")
console.log(book1.shelf);
//enshelf the books.
console.log('enshelfing 4 books to shelf1')
book1.enshelf(shelf1);
book2.enshelf(shelf1);
book3.enshelf(shelf1);
book4.enshelf(shelf1);
//print out books on shelf1 to verify all 4 got added properly.
console.log("shelf1 books: (expecting 4)");
shelf1.list_books();
//shelf2 should still be empty
console.log("shelf2 books (expecting 0):");
shelf2.list_books();
// test enshelf,unshelf
console.log("unshelfing 'The Dark Tower' and reprinting shelf1:");
book1.unshelf();
shelf1.list_books();

console.log("enshelf 'The Dark Tower' and 'Wizard and Glass' to shelf2.  W&G should be removed from shelf1 in the process:");
book1.enshelf(shelf2);
book2.enshelf(shelf2);
console.log("printing shelf1:");
shelf1.list_books();
console.log("printing shelf2:");
shelf2.list_books();
console.log("");

console.log("doing library stuff now");
console.log("add shelf1 to library");
myLibrary.add_shelf(shelf1);
console.log("there is: " + myLibrary.shelves.length + " shelf in the library");
console.log("the library contains the following books:");
myLibrary.print_all_books();
console.log("the library contains: "+myLibrary.get_num_books() + " books.");
console.log("now add the second shelf to the library");
myLibrary.add_shelf(shelf2);
console.log("there are: " + myLibrary.shelves.length + " shelves in the library");
console.log("the library contains the following books:");
myLibrary.print_all_books();
console.log("the library contains: "+myLibrary.get_num_books() + " books.");
console.log('get all books from the library and return them in an array');
var myBookList = myLibrary.get_all_books();
console.log('print the array');
console.log(myBookList);