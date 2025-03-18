import '../App.css';
import RightImageHero from '../components/RightImageHero';
import { SliderHero } from '../components/SliderHero';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="-mt-28">
      <SliderHero />
      <RightImageHero />
    </div>
  );
}

export default Home;
