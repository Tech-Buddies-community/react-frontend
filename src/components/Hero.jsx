import React from "react";

const Hero = () => {
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-4xl">Tech Buddies</h1>
                    <p className="mt-2 mx-w-xl leading-8 text-justify"><strong>Tech Buddies</strong> – Wadah Terbaik untuk Menjelajahi Dunia Teknologi!</p>
                    <p className="mt-1 mx-w-xl leading-8 text-justify">Dapatkan akses ke berbagai event teknologi, edukasi terkini, peluang beasiswa, dan lowongan kerja (loker) di dunia tech dalam satu platform. <strong>Tech Buddies</strong> hadir untuk menghubungkan kamu dengan komunitas, peluang karier, serta wawasan terbaru di industri teknologi.</p>
                    <p className="mt-2 mx-w-xl leading-8 text-justify">Bersama <strong>Tech Buddies</strong>, jangan lewatkan kesempatan untuk berkembang dan membangun masa depan digitalmu! 🚀</p>
                </div>
                <div className="rounded-box flex justify-center items-center order-first md:order-last">
                    <img src="/techbuddies.png" className="rounded-box w-[100] h-[300px]" />
                </div>
            </div>
        </>
    )
}

export default Hero;