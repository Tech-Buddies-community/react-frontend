import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorView = () => {
    const error = useRouteError();

    if (error.status === 404) {
        return (
            <main className="grid min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <p className="mt-6 text-lg leading-7">Sorry page not found!</p>
                    <div className="mt-10">
                        <Link to='/' className="btn btn-primary">Back To Home</Link>
                    </div>
                </div>
            </main>
        )
    } else if (error.status === 500) {
        return (
            <main className="grid min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-primary">500</h1>
                    <p className="mt-6 text-lg leading-7">Sorry, there is a server problem. Please come back in 15 minutes!</p>
                </div>
            </main>
        )
    }
}

export default ErrorView;