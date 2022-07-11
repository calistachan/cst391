import React from "react";
import {Link} from 'react-router-dom'
import './BookCard.css'
class BookCard extends React.Component {

    render() {
        return (
            <Link to={"/book/"+this.props.index}>
            <div className="bookListing">
                <img className="bookListing" alt="Book" src={this.props.imgUrl}/>
                <p className="bookListing" style={{marginLeft: "5px"}}>{this.props.title}, {this.props.author}</p>
            </div>
            </Link>
        )
    }
}
export default BookCard;