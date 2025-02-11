import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../Utils/Index";
import { FaBuilding, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Loading from "../components/Loading";

const DetailProgramView = () => {
    let {id}= useParams();
    const [program, setProgram] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const Program = async () => {
        const { data } = await customAPI.get(`/program/${id}`);
        setProgram(data.data);
    }

    useEffect(() => {
        Program();
    }, [])

    const handleRSVPClick = (e) => {
        if (!program.registration.startsWith("http")) {
            e.preventDefault(); // Mencegah navigasi jika link tidak valid
            setShowPopup(true);
        }
    };

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Detail Program</h2>
            </div>
            {program ? (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg p-8 mt-6">
                <figure className="relative w-100 overflow-hidden">
                    {program.status === "Close" && (
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-bold bg-red-500 px-3 py-1 rounded">
                            <a className="text-white">Close</a>
                        </span>
                    )}

                    {program.status === "Coming Soon" && (
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold bg-yellow-500 px-3 py-1 rounded">
                            <a className="text-white">Coming Soon</a>
                        </span>
                    )}

                    <span className={`absolute top-0 right-0 font-bold text-white rounded 
                        ${program.ticket_status === "Free" ? "bg-success" : "bg-neutral"}`}>
                        <a className="m-1">
                            ({program.ticket_status === "Free" ? "Free" : "Paid"})
                        </a>
                    </span>
                    <img src={program.poster} alt={program.name} className="w-full  object-cover rounded-lg" />
                </figure>

                <div className="mt-2">
                    <h2 className="text-2xl font-semibold text-gray-800">{program.name}</h2>
                </div>

                <div className="border-b border-neutral pb-1 mt-1" />
                <div className="mt-2 space-y-2 text-gray-700">
                    <p className="flex items-center gap-2"><strong><FaBuilding /></strong> {program.organizer}</p>
                    <p className="flex items-center gap-2"><strong><FaCalendarAlt /></strong> {formatDate(program.deadline_registration)}</p>
                    <p className="flex items-center gap-2"><strong><FaLocationDot /></strong> 
                        {program.location ? (
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(program.location)}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline"
                            >
                                {program.location}
                            </a>
                        ) : (
                            <span>To Be Announced</span>
                        )}
                    </p>


                    {program.description && ( 
                        <p className="flex items-center gap-2"><strong><FaStickyNote /></strong> Notes :</p>
                    )}
                </div>
                
                {program.description && (
                    <div className="border border-neutral pb-1 mt-1">
                        <p className="m-2">{program.description}</p>
                    </div>
                )}

                {program.registration && (
                    <Link to={program.registration} target="_blank" onClick={handleRSVPClick} rel="noopener noreferrer" className="w-full btn mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                        RSVP Now
                    </Link>
                )}

                {program.information && ( 
                    <Link to={program.information} target="_blank" rel="noopener noreferrer" className="w-full btn mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                        Information
                    </Link>
                )}

            </div>
            ) : (
                <Loading />
            )}

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello Buddies!</h3>
                    <p className="py-4 justify-center">Pendaftaran untuk event ini dilakukan <strong>{program.registration}</strong>. Silakan datang lebih awal untuk memastikan ketersediaan tempat.</p>
                    <div className="modal-action">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={() => setShowPopup(false)} className="btn">Close</button>
                        </form>
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DetailProgramView;