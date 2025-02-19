import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import CardEvent from "../components/CardEvent";
import customAPI from "../api";
import { useSelector } from "react-redux";
import FilterEvent from "../components/FilterEvent";
import Pagination from "../components/Pagination";

export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);


    const { data } = await customAPI.get('/event', {params: params});

    // console.log(params);
    const event = data.data;
    // console.log(event);
    // const pagination = data.pagination;

    return { event, params, pagination};
}

const EventView = () => {
    const { event } = useLoaderData();
    const user = useSelector((state) => state.userState.user);
    
    return (
        <>
            <FilterEvent />
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Event List</h2>
            </div>

            {/* <h3 className="text-2xl text-neutral font-bold text-right my-3">Total : {pagination.totalEvent} Event</h3> */}

            {user && user.role === 'admin' && (
                <div className="mt-2 flex justify-end">
                        <Link to='/event/create' className="btn btn-neutral">Add Event</Link>
                </div>
            )}

            {!event.length ? ( 
                <div className="mt-5 mb-5">
                    <h1 className="text-3xl text-center">
                        Oops! Kami tidak dapat menemukan event yang sesuai dengan pencarianmu. Mungkin coba kata kunci lain? 🤔
                    </h1>
                </div>
            ) : (  
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {event.map((item) => (
                        <CardEvent item={item} key={item._id} user={user} />
                        ))
                    }
                </div>
            )}

            <div className="mt-5 flex justify-center">
                <Pagination />
            </div>
        </>
    )
}

export default EventView;