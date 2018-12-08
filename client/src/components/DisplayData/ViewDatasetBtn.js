import React from "react";
import { Link } from "react-router-dom";

const ViewDatasetBtn = ({onClick, id}) => {

    return (
        <React.Fragment>
            <Link
            to = {{
                pathname: `/dashboard/view/${id}`,
                state: { fromDashboard :true}
                }}
                >
                <button className="LinkUps" onClick={onClick} id ={id}>
                View
                </button>  
            </Link>
    </React.Fragment>
)
}

export default ViewDatasetBtn;