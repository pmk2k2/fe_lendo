import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Banner from "../components/Banner.tsx";
import Categories from "../components/CategorySection.tsx";

const Home: React.FC = () => {
  // const navigate = useNavigate();

  return (
      <div>
          <Banner/>
          <Categories />
      </div>
  );
};

export default Home;
