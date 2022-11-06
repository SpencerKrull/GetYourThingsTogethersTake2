import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai"
import { Spinner } from "../../loading/Loading";
import "./EntryList.scss"

const EntryList = ({entries, isLoading}) => {
    const shortenText = (text, n) => {
        if (text.lenth > n) {
            const shortText = text.substring(0, n).concat("...")
            return shortText
        }
        return text; // shortens and minimizes text by showing only a portion of the text saved to the database
    }

    return <div className="entry-list">
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>
                        Your Things, Together
                    </h3>
                </span>
                <span>
                    <h3>
                        Search Your Things
                    </h3>
                </span>
            </div>

            {isLoading && <Spinner />}

            <div className="table">
                {!isLoading && entries.length === 0 ? (
                    <p>-- Not found. Please add the item!</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Format</th>
                                <th>Release</th>
                                <th>Edition</th>
                                <th>Barcode</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                entries.map((entry, index) => {
                                    const {_id, title, author, format, release, edition, barcode, quantity} =
                                    entry
                                    
                                    return (
                                        <tr key={_id}>

                                            <td>{index + 1}</td>

                                            <td>{shortenText(title, 20)}</td>
                                           
                                           <td>{author}</td>

                                            <td>{format}</td>

                                            <td>{release}</td>

                                            <td>{edition}</td>

                                            <td>{barcode}</td>

                                            <td>{quantity}</td>

                                            <td className="icons">
                                                <span>
                                                    <AiOutlineEye size={25} color={"purple"} />
                                                </span>
                                                <span>
                                                    <FaEdit size={20} color={"green"} />
                                                </span>
                                                <span>
                                                    <FaTrashAlt size={25} color={"red"} />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )} 
            </div>
        </div>
    </div>
}

export default EntryList;