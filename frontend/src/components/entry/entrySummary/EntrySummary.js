import React from "react";
import { BiCategory } from "react-icons/bi";
import { BsCart4, BsCartX } from "react-icons/bs";
import InfoBox from "../../infobox/infoBox";
import "./EntrySummary.scss"

const entryIcon = <BsCart4 size={40} color="#fff" />
const formatIcon = <BiCategory size={40} color="#fff" />
const outOfEntryIcon = <BsCartX size={40} color="#fff" />

const EntrySummary = ({entries}) => {
    return <div className="entry-summary">
        <h3 className="--mt">Your Statistics</h3>
        <div className="info-summary">
            <InfoBox 
                icon={entryIcon} 
                title={"Total Items"} 
                count={entries?.length} 
                bgColor="card1" />
            <InfoBox 
                icon={formatIcon} 
                title={"All Formats"} 
                count={0} 
                bgColor="card2" />
            <InfoBox 
                icon={outOfEntryIcon} 
                title={"This item is gone!"} 
                count={0} 
                bgColor="card3" />
        </div>
    </div>
}

export default EntrySummary