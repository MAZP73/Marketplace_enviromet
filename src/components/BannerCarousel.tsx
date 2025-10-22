import React, { useState, useEffect } from "react";
import banner1Img from "../assets/banner1.jpg";
import banner2Img from "../assets/banner2.jpg";
import banner3Img from "../assets/banner3.jpg";

const images = [
    {
        src: banner1Img,
        title: "Conectando empresas con fundaciones",
        text: "Únete a nuestra red para reducir el desperdicio alimentario y apoyar a quienes más lo necesitan.",
    },
    {
        src: banner2Img,
        title: "Transforma el desperdicio en oportunidades",
        text: "Cada alimento rescatado es una historia de impacto positivo.",
    },
    {
        src: banner3Img,
        title: "Empresas, agricultores y fundaciones unidas",
        text: "Juntos podemos crear un sistema alimentario más sostenible.",
    },
];

const BannerCarousel: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-96 overflow-hidden">
            {/* Imágenes */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{image.title}</h1>
                        <p className="text-lg md:text-xl max-w-2xl">{image.text}</p>
                    </div>
                </div>
            ))}

            {/* Botones */}
            <button
                onClick={() =>
                    setCurrent((prev) => (prev - 1 + images.length) % images.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full"
            >
                ❮
            </button>

            <button
                onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full"
            >
                ❯
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${index === current ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;