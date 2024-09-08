import React from 'react';

const SidebarProfile: React.FC = () => {
    return (
        <aside className="w-64 bg-white p-6">
            <div className="text-center mb-6">
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-300"></div>
                <h3 className="text-lg font-semibold mt-4">User's name</h3>
                <p className="text-sm text-gray-500">98.1% positive reviews</p>
            </div>
            <nav>
                <ul className="space-y-4">
                    <li>Edit Profile</li>
                    <li>Inbox</li>
                    <li>Rented</li>
                    <li>For rent</li>
                    <li>Settings</li>
                </ul>
            </nav>
        </aside>
    );
}

export default SidebarProfile;
