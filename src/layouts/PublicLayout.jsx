import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const PublicLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading'

    return (
        <>

            <a
                href="https://feedback.techbuddies.id"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition z-20"
                >
                Feedback
            </a>
            <div className="flex flex-col min-h-screen bg-base-200">
                <Nav />
                { isPageLoading ? (
                    <Loading />
                ) : (
                    <main className="flex-grow mx-auto max-w-6xl px-8 py-10">
                        <Outlet />
                    </main>
                )}
                <Footer />
            </div>
        </>
    )
}

export default PublicLayout;