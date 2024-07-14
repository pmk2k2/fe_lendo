import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state to track login status

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu-mobile"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {['Home', 'About', 'Contact Us', 'Help'].map((text) => (
                <MenuItem key={text} component={RouterLink} to={`/${text.toLowerCase().replace(' ', '-')}`}>
                    {text}
                </MenuItem>
            ))}
        </Menu>
    );

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isLoggedIn ? (
                <>
                    <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
                    <MenuItem component={RouterLink} to="/inbox">Inbox</MenuItem>
                    <MenuItem component={RouterLink} to="/rent">Rent</MenuItem>
                    <MenuItem component={RouterLink} to="/for-rent">For Rent</MenuItem>
                    <MenuItem onClick={() => { setIsLoggedIn(false); handleMenuClose(); }}>Log Out</MenuItem>
                </>
            ) : (
                <>
                    <MenuItem component={RouterLink} to="/login">Login</MenuItem>
                    <MenuItem component={RouterLink} to="/signup">Sign Up</MenuItem>
                </>
            )}
        </Menu>
    );

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-5">
                <div className="flex items-center space-x-5">
                    <img src="/images/logo.png" alt="lendo" className="h-10 pr-2" />
                    <div className="hidden md:flex relative text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-5 py-1 border rounded-md bg-gray-100 focus:bg-white focus:outline-none"
                            placeholder="Search…"
                            aria-label="search"
                        />
                    </div>
                </div>
                <nav className="hidden md:flex space-x-4">
                    {['Home', 'About', 'Contact Us', 'Help'].map((text) => (
                        <RouterLink
                            key={text}
                            to={`/${text.toLowerCase().replace(' ', '-')}`}
                            className="text-black hover:text-gray-700"
                        >
                            {text}
                        </RouterLink>
                    ))}
                </nav>
                <div className="hidden md:flex items-center space-x-0.5">
                    <IconButton size="large" color="inherit" aria-label="wishlist" className="text-black">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" aria-label="cart" className="text-black">
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" aria-label="profile" onClick={handleProfileMenuOpen} className="text-black">
                        <PersonOutlineOutlinedIcon />
                    </IconButton>
                </div>
                <div className="md:hidden">
                    <IconButton size="large" color="inherit" aria-label="menu" onClick={handleMobileMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </div>
            {renderMobileMenu}
            {renderProfileMenu}
        </header>
    );
};

export default Header;
