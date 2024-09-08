import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { handleSignin, useRenewToken } from '../api/auth/auth.api';

const Header: React.FC = () => {
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const { data, isSuccess } = useRenewToken({ enabled: isAuthenticated() });

    useEffect(() => {
        if (data && isSuccess && !isAuthenticated()) {
            handleSignin(signIn)(data);
        }
    }, [data, isSuccess, signIn, isAuthenticated]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        handleMenuClose();
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {['Home', 'About', 'Contact', 'Help'].map((text) => (
                <MenuItem key={text} component={RouterLink} to={`/${text.toLowerCase().replace(' ', '-')}`}>
                    {text}
                </MenuItem>
            ))}
        </Menu>
    );

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isLoggedIn ? (
                <>
                    <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
                    <MenuItem component={RouterLink} to="/inbox">Inbox</MenuItem>
                    <MenuItem component={RouterLink} to="/rent">Rent</MenuItem>
                    <MenuItem component={RouterLink} to="/for-rent">For Rent</MenuItem>
                    <MenuItem onClick={handleLogout} style={{ color: 'red' }}>Log Out</MenuItem>
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
                    {['Home', 'About', 'Contact', 'Help'].map((text) => (
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
