import React from "react";

const DeleteDatasetBtn = ({onClick, id}) => {

    return (
        <React.Fragment>
            <button className="LinkUps" onClick={onClick} id ={id}>
            Delete
        </button>  
    </React.Fragment>
)
}

export default DeleteDatasetBtn;