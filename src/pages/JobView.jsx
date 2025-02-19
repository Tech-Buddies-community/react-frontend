import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import customAPI from "../api";
import CardJob from "../components/CardJob";
import { useSelector } from "react-redux";

export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    try {
        const { data } = await customAPI.get('/job', {params: params});

        const job = data?.data || [];
        // const pagination = data?.pagination || {};

        return { job, params };
    } catch (error) {
        console.error("Error loading jobs:", error);
        return { 
            job: [], 
            params, 
            // pagination: {} 
        };
    }
}

const JobView = () => {
    const { job } = useLoaderData();
    const user = useSelector((state) => state.userState.user);

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Job List</h2>
            </div>

            {user?.role === 'admin' && (
                <div className="mt-2 flex justify-end">
                    <Link to='/event/create' className="btn btn-neutral">Add Job</Link>
                </div>
            )}

            {!job?.length ? ( 
                <div className="mt-5 mb-5">
                    <h1 className="text-3xl text-center">
                        Oops! Sepertinya tidak ada lowongan pekerjaan saat ini. Nantikan pembaruan selanjutnya! 😊
                    </h1>
                </div>
            ) : (  
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {job.map((item) => (
                        <CardJob item={item} key={item._id} user={user} />
                    ))}
                </div>
            )}
        </>
    )
}

export default JobView;