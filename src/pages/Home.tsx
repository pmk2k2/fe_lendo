import React from 'react';
import Banner2 from "../components/LandingPage/Banner2.tsx";
import Categories from "../components/LandingPage/CategorySection.tsx";
import Banner from "../components/LandingPage/Banner.tsx";
import BrandSection from "../components/LandingPage/BrandSection.tsx";
import ProductGrid from "../components/LandingPage/ProductGrid.tsx";

const Home: React.FC = () => {
  // const navigate = useNavigate();

  return (
      <div>
          <Banner/>
          <Categories />
          <BrandSection/>
          <ProductGrid/>
          <Banner2/>
      </div>
  );
};

export default Home;
