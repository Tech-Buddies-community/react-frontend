import React from "react";
import { Link } from "react-router-dom";

const CardJob = ({ item,user }) => {
    return (
        <>
            <div className="card bg-base-100 shadow-xl" key={item._id}>
                <figure>
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!.</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <Link to={`/job/${item._id}`} className="btn btn-neutral bg-blue-600 text-white mt-2">See more</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardJob;