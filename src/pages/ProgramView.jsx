import React from "react";
import customAPI from "../api";
import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import FilterProgram from "../components/FilterProgram";
import CardProgram from "../components/CardProgram";
import Pagination from "../components/Pagination";

export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customAPI.get('/program', {params: params});

    // console.log(params);
    const program = data.data;
    // console.log(program);
    const pagination = data.pagination;

    return { program, params, pagination };
}

const ProgramView = () => {
    const { program, pagination } = useLoaderData();
    const user = useSelector((state) => state.userState.user);

    return (
        <>
            <FilterProgram />

            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Program List</h2>
            </div>

            <h3 className="text-2xl text-neutral font-bold text-right my-3">Total : {pagination.totalProgram} Program</h3>

            {user && user.role === 'admin' && (
                <div className="mt-2 flex justify-end">
                        <Link to='/program/create' className="btn btn-neutral">Add Program</Link>
                </div>
            )}

            {!program.length ? ( 
                    <div className="mt-5 mb-5">
                        <h1 className="text-3xl text-center">
                            Oops! Kami tidak dapat menemukan program yang sesuai dengan pencarianmu. Mungkin coba kata kunci lain? 🤔
                        </h1>
                    </div>
                ) : (  
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {program.map((item) => (
                        <CardProgram item={item} key={item._id} user={user} />
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

export default ProgramView;