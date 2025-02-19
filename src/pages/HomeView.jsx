import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CardEvent from "../components/CardEvent";
import CardProgram from "../components/CardProgram";
import CardJob from "../components/CardJob";
import customAPI from "../api";

const HomeView = () => {
    const [event, setEvent] = useState([]);
    const [program, setProgram] = useState([]);
    const [job, setJob] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventResponse, programResponse, jobResponse] = await Promise.all([
                    customAPI.get('/event'),
                    customAPI.get('/program'),
                    customAPI.get('/job')
                ]);

                setEvent(eventResponse?.data?.data || []);
                setProgram(programResponse?.data?.data || []);
                setJob(jobResponse?.data?.data || []);    
            } catch (error) {
                console.error("🔥 Error fetching data:", error);

                setEvent([]);
                setProgram([]);
                setJob([]);
            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
    }, []);

    return (
        <>
            <Hero />
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Event List</h2>
            </div>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <span><span className="loading loading-infinity loading-lg"></span></span>
                    </div>
                ) : !event.length ? ( 
                    <div className="mt-5 mb-5">
                        <h1 className="text-3xl text-center">
                            Oops! Sepertinya tidak ada event saat ini. Nantikan pembaruan selanjutnya! 😊
                        </h1>
                    </div>
                ) : (  
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        {event
                            .sort(() => Math.random() - 0.5) // Acak urutan job
                            .slice(0, 4) // Ambil 4 job pertama
                            .map((item) => (
                                <CardEvent item={item} key={item._id} />
                            ))
                        }
                    </div>
                )}

            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Program List</h2>
            </div>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <span><span className="loading loading-infinity loading-lg"></span></span>
                    </div>
                ) : !program.length ? ( 
                        <div className="mt-5 mb-5">
                            <h1 className="text-3xl text-center">
                                Oops! Sepertinya tidak ada program saat ini. Nantikan pembaruan selanjutnya! 😊
                            </h1>
                        </div>
                ) : (  
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        {program
                            .sort(() => Math.random() - 0.5) // Acak urutan job
                            .slice(0, 4) // Ambil 4 job pertama
                            .map((item) => (
                                <CardProgram item={item} key={item._id} />
                            ))
                        }
                    </div>
                )}

            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Job List</h2>
            </div>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <span><span className="loading loading-infinity loading-lg"></span></span>
                    </div>
                ) : !job.length ? ( 
                    <div className="mt-5 mb-5">
                        <h1 className="text-3xl text-center">
                            Oops! Sepertinya tidak ada lowongan pekerjaan saat ini. Nantikan pembaruan selanjutnya! 😊
                        </h1>
                    </div>
                ) : (  
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        {job
                            .sort(() => Math.random() - 0.5) // Acak urutan job
                            .slice(0, 4) // Ambil 4 job pertama
                            .map((item) => (
                                <CardJob item={item} key={item._id} />
                            ))
                        }
                    </div>
                )}
            
            <div className="border-b border-neutral mt-5" />
        </>
    )
}

export default HomeView;