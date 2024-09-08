import React from 'react';
import SidebarProfile from '../components/SidebarProfile';
import RentalCard from '../components/RentalCard';

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                <SidebarProfile />
                <div className="flex-grow p-6">
                    <div className="text-xl font-bold mb-4">My items for rent</div>
                    <div className="grid grid-cols-1 gap-4">
                        <RentalCard
                            title="Apple iPhone 14 Pro Max 128Gb Deep Purple"
                            price="€64.49/month"
                            imageSrc="iphone_image_url"
                            views={20}
                            likes={20}
                        />
                        <RentalCard
                            title="AirPods Max Silver"
                            price="€64.49/month"
                            imageSrc="airpods_image_url"
                            views={20}
                            likes={20}
                        />
                    </div>

                    <div className="text-xl font-bold mt-8 mb-4">Rented</div>
                    <div className="grid grid-cols-1 gap-4">
                        <RentalCard
                            title="Apple iPhone 14 Pro Max 128Gb Deep Purple"
                            price="€64.49/month"
                            status="Delivered on May 3, 2024"
                            imageSrc="iphone_image_url"
                        />
                        <RentalCard
                            title="AirPods Max Silver"
                            price="€64.49/month"
                            status="Delivered on May 3, 2024"
                            imageSrc="airpods_image_url"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
