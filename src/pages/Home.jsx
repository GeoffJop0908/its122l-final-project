import '../App.css';
import RightImageHero from '../components/RightImageHero';
import { SliderHero } from '../components/SliderHero';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <SliderHero />
      <RightImageHero />
    </>
  );
}

export default Home;
