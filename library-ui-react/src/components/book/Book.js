import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function Book() {

    let { id } = useParams();

    console.log(id)
    const [book, setBook] = useState({
        loading: true,
        book: {
            author: ""
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch('http://localhost:5041/api/book?id=' + id);
            // convert the data to json
            const json = await data.json();

            // set state with the result
            setBook({
                loading: false,
                book: json
            });
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [])

    const bookDisplay = function () {
        const data = book.book
        return (
            <div>
                <img src={data.imgUrl} className="selectedBook" alt="Selected Book" />
                <h2>{data.title}</h2>
                <h4>Author: {data.author}</h4>
                <h4>ISBN: {data.isbnThirteen}</h4>
                <h4>Status: {data.checkedOut ? "Checked Out by " + data.checkedOutBy : "Available"}</h4>
                <h4>Book ID: {data.bookId}</h4>
                <button onClick={() => {
                    const tempBook = book.book;
                    tempBook.checkedOut = !tempBook.checkedOut
                    tempBook.checkedOutBy = tempBook.checkedOut ? "1" : ""
                    console.log("book")
                    setBook({
                        loading: false,
                        book: tempBook
                    })
                }}>Check {data.checkedOut ? "In" : "Out"}</button>
            </div>
        )
    }

    const display = book.loading ? (<p>Loading...</p>) : bookDisplay();

    return (
        <div>
            {display}
        </div>
    )
}
export default Book;