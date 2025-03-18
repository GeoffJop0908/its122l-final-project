import '../App.css';
import ImageHero from '../components/ImageHero';
import { SliderHero } from '../components/SliderHero';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="-mt-28">
      <SliderHero />
      <ImageHero right />
      <ImageHero className="bg-stone-300" />
    </div>
  );
}

export default Home;
