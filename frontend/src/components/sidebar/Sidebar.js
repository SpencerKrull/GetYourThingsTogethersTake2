import React, { useState } from 'react'
import "./sidebar.scss"
import { MdOutlineExpandLess, MdOutlineInventory } from 'react-icons/md'
import menu from '../../data/sidebar_menu'
import ItemSidebar from './ItemSidebar'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({children}) => {
    const [barOpen, setBarOpen] = useState(true)
    const toggle = () => setBarOpen(!barOpen)
    const navigate = useNavigate()

    const goHome = () => {
        navigate("/")
    }

    return (
        <div className='layout'>
            <div className='sidebar' style={{ width: barOpen? "250px" : "50px"}}>
                <div className='top'>
                    <div className='logo' style={{ display: barOpen ? "block" : "none"}}>
                        <MdOutlineInventory size={35} style={{cursor: "pointer"}} onClick={goHome} />
                    </div>
                    <div className='bar' style={{ margiLeft: barOpen ? "100px" : "0px" }} >
                        <MdOutlineExpandLess size={35} onClick={toggle} />
                    </div>
                </div>
                {menu.map((item, index) => {
                    return <ItemSidebar key={index} item={item} barOpen={barOpen} />
                })}

            </div>
            <main style={{ paddingLeft: barOpen ? "250px" : "50px", transition: "all .5s" }}>
                {children}
            </main>
        </div>
    )
}

export default Sidebar