import React, {useState} from "react"
import {BrowserRouter, useParams, Link, Route} from "react-router-dom";
import './editable-item.css'
const EditableItem = (
    {
        to="/somewhere/to/go",
        deleteItem,
        updateItem,
        item={
            title: "Some title",
            _id:"1321"
        },
        active
    }) => {
    const [editing,setEditing] = useState(false)
    const [cachedItem, setCachedItem] =useState(item)
    return (
        <>
            {!editing &&
            <div>
                <Link className={`bg-clr all-side-margin bg-dark text-white nav-link ${active?'active':''}`} to={to}>
                    {item.title}
                    <i onClick={() => setEditing(true)}
                       className="fa fa-edit float-right"></i>
                </Link>
            </div>
            }
            {editing &&
            <>
                <input
                    onChange={
                        (e) => setCachedItem({
                            ...cachedItem,
                            title: e.target.value
                        })
                    }
                    value={cachedItem.title}/>
                <i onClick={() => {
                    deleteItem(item)
                    setEditing(false)} }
                   className="icons-on-item fa fa-times text-danger"></i>
                <i onClick={() => {
                    setEditing(false)
                    updateItem(cachedItem)
                }} className="icons-on-item fa fa-check text-success"></i>
            </>
            }
        </>
    )
}

export default EditableItem