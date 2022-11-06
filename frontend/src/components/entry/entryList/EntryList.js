import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai"
import { Spinner } from "../../loading/Loading";
import "./EntryList.scss"
import Search from "../../search/search";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_ENTRIES, selectFiltered } from "../../../redux/features/entries/filter_slice";
import ReactPaginate from "react-paginate";


const EntryList = ({entries, isLoading}) => {
    const [search, setSearch] = useState("")
    const filteredEntries = useSelector(selectFiltered)

    const dispatch = useDispatch()
    
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortText = text.substring(0, n).concat("...")
            return shortText
        }
        return text; // shortens and minimizes text by showing only a portion of the text saved to the database
    }

    // pagination start

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
  
      setCurrentItems(filteredEntries?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredEntries?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredEntries]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredEntries?.length;
      setItemOffset(newOffset);
    };

    //pagination end

    useEffect(() => {
        dispatch(FILTER_ENTRIES({ entries, search }))
    }, [entries, search, dispatch])

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
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </span>
            </div>

            {isLoading && <Spinner />}

            <div className="table">
                {!isLoading && entries?.length === 0 ? (
                    <p>Not found. Please add the item!</p>
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
                                currentItems?.map((entry, index) => {
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
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activePage"
                />
        </div>
    </div>
}

export default EntryList;