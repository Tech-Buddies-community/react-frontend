import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { FaTrash, FaPencilAlt, FaCalendarAlt, FaBuilding, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import customAPI from "../api";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../Utils/Index";

const CardEvent = ({ item,user }) => {
    const { revalidate } = useRevalidator();

    return (
        <>
            <div className="card bg-base-100 shadow-xl" key={item._id}>
                <>
                    <figure>
                        {item.status === "Close" && (
                            <span className="absolute font-bold bg-red-500 px-3 py-1 rounded">
                                <a className="text-white">Close</a>
                            </span>
                        )}

                        {item.status === "Coming Soon" && (
                            <span className="absolute font-bold bg-yellow-500 px-3 py-1 rounded">
                                <a className="text-white">Coming Soon</a>
                            </span>
                        )}

                        <span className={`absolute top-0 right-0 font-bold text-white rounded 
                            ${item.ticket_status === "Free" ? "bg-success" : item.ticket_status === "Coming Soon" ? "bg-warning" : "bg-neutral"}`}>
                            <a className="m-1">
                                {item.category} ({item.ticket_status})
                            </a>
                        </span>

                        <img src={item.poster} alt={item.name} className="w-[500px] h-[250px] object-cover" />
                    </figure>
                </>
                <div className="card-body">
                    {user && user.role === 'admin' && (
                        <div className="flex justify-end gap-x-3">
                            <FaTrash  onClick={ async () => { await customAPI.delete(`/event/${item._id}`); toast.success('Success delete event!'); revalidate(); }} className="text-red-500 cursor-pointer" />
                            <Link to={`/event/${item._id}/update`}>
                                <FaPencilAlt className="text-info cursor-pointer" />
                            </Link>
                        </div>
                    )}

                    <h1 className="card-title">{item.name.substring(0,19)}</h1>
                    <h3 className="flex items-center gap-2 text-sm"><FaBuilding />{item.organizer.substring(0,19)}</h3>
                    <p className="flex items-center gap-2 text-xs font-bold"><FaCalendarAlt />{formatDate(item.date)} {item.dateend && ` - ${formatDate(item.dateend)}`}</p>
                    {item.start_time && (
                        <p className="flex items-center gap-2 text-xs"><FaClock />{formatTime(item.start_time)} {item.end_time && ` - ${formatTime(item.end_time)}`}</p>
                    )}
                    <p className="flex items-center gap-2 text-sm"><FaLocationDot />{item.location ? item.location.substring(0,19) : "To Be Announced"}</p>
                    <div className="card-actions justify-end">
                    <Link to={`/event/${item._id}`} className="btn btn-neutral bg-blue-600 text-white mt-2">See more</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardEvent;