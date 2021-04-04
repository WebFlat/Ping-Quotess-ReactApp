import React from 'react';
import { NavLink } from 'react-router-dom';



const Tablink = (props) => {
    return (
        <NavLink to={props.link} className={props.class} activeClassName={props.activeclass}>
            {props.name}
        </NavLink>
    )
}

export default Tablink;
