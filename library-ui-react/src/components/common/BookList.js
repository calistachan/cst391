import React from "react";

import BookCard from "./BookCard";
class BookList extends React.Component {
    state = {
        loading: true,
        books: []
    }

    componentDidMount() {
          this.getBooks();
    }

    async getBooks() {
        const data = await fetch('http://localhost:5041/api/book/all')
            .then(o => o.json())
            .then(o => this.setState({
                loading: false,
                books: o
            }));
    }
    

    alertCatalog(i) {
        console.log(i);
        //Route to book and pass i (id later)
    }

    render() {
        const books = this.state.loading ? (<p>Loading...</p>): this.state.books.map(o => (
        <BookCard 
            title={o.title} 
            index={o.bookId}  
            author={o.author}
            imgUrl={o.imgUrl} 
            alertCatalog={this.alertCatalog}   
        />))

        return (
            <div>
               {books}
            </div>
        )
    }
}
export default BookList;