import React from 'react'

import "./NavLinks.css"

function NavLinks(props) {
    return (
        <div className='navLinks'>
            {props.children}
        </div>
    )
}

export default NavLinks
