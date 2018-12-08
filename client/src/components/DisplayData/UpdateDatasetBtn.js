import React from "react";

const UpdateDatasetBtn = ({onClick, id}) => {

    return (
        <React.Fragment>
            <button className="LinkUps" onClick={onClick} id ={id}>
                Update
            </button>  
        </React.Fragment>
    )
}

export default UpdateDatasetBtn;