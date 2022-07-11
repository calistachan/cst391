import React from "react";
import BookList from "../common/BookList";

class Catalog extends React.Component {

    render() {
        return (
            <div>
                <h1>Catalog</h1>
                <BookList/>
            </div>
        )
    }
}
export default Catalog;