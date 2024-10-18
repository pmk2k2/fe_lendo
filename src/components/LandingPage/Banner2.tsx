import React from 'react';

const Banner2 = () => {
    return (
        <div className="relative bg-cover bg-center h-96 mx-0" style={{ backgroundImage: "url('src/assets/onur-binay-_RpPMkqTTTg-unsplash.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-4xl font-extralight mb-4">Unlock Earnings with Your Electronics</h1>
                <h4 className="text-xl font-bold mb-6">Rent out Your Gadgets Here!</h4>
                <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
                    List an item
                </button>
            </div>
        </div>
    );
};

export default Banner2;
