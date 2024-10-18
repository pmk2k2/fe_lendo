import React from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Banner: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between ">
            {}
            <div className="w-full md:w-1/2 space-y-4 mb-6 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rent Electronics Near You
                </h1>
                <h2 className="text-xl text-gray-600">
                    Select Your Location to Find Local Deals
                </h2>

                <div className="flex items-center space-x-3">
                    <TextField
                        label="Enter your city or ZIP code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        className="bg-white rounded-lg"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="text-white bg-blue-500 hover:bg-blue-600"
                        startIcon={<SearchIcon />}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="src/assets/electronics.png"
                    alt="Electronics"
                    className="max-w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default Banner;
