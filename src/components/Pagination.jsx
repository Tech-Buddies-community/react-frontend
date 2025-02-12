import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = () => {
    const { pagination } = useLoaderData();
    const { page, totalPage } = pagination;
    const { search, pathname } = useLocation();
    const navigation = useNavigate();

    const handlePageChange = (number) => {
        // console.log(number);
        // console.log(search);
        // console.log(pathname);

        const searchParams = new URLSearchParams(search);
        searchParams.set('page', number);
        navigation(`${pathname}?${searchParams.toString()}`)
    }

    const pages = Array.from({length: totalPage}, (_, index) => { return index + 1; });
    return (
        <div className="w-full overflow-x-auto">
            <div className="join flex flex-wrap justify-center overflow-x-auto scroll-smooth mt-4 gap-1">
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`btn btn-sm bg-base-200 border-none join-item ${
                            pageNumber === page ? 'bg-neutral text-white' : ''
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Pagination;
