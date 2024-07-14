import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-10 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-lg font-semibold mb-4">Welcome to Lendo!</h4>
                    <p className="mb-4">
                        Your one-stop shop for all your electronics rental needs. Whether you're looking for the latest tech gadgets for a short-term project, a special event, or just to try before you buy, Lendo has you covered. Experience convenience, affordability, and flexibility with Lendo – where technology meets accessibility.
                    </p>
                    <div className="flex space-x-2">
                        <IconButton color="inherit" href="https://twitter.com" target="_blank" className="text-white">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://facebook.com" target="_blank" className="text-white">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://tiktok.com" target="_blank" className="text-white">
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton color="inherit" href="https://instagram.com" target="_blank" className="text-white">
                            <InstagramIcon />
                        </IconButton>
                    </div>
                </div>

                <div className="px-0 md:pl-20">
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <nav className="flex flex-col space-y-2">
                        {['Home', 'How it works', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((text) => (
                            <RouterLink
                                key={text}
                                to={`/${text.toLowerCase().replace(/ /g, '-')}`}
                                className="hover:text-gray-400"
                            >
                                {text}
                            </RouterLink>
                        ))}
                    </nav>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <div className="flex flex-col space-y-2">
                        <p>Email: contact@lendo.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                        <p>Address: 123 Tech Avenue, Silicon Valley, CA</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
