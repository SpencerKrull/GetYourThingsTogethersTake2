import React from 'react'

const Header = () => {
    return (
        <div className="--pad header">
            <div className='--flex-between'>
                <h3>
                    <span className="--fw-thin">Hello,</span>
                    <span className="--color-danger">Spencer</span>
                </h3>
                <button className="--btn --btn-danger">Log Out</button>
            </div>
            <hr />
        </div>
    )
}

export default Header