import '../App.css';
import RightImageHero from '../components/RightImageHero';
import { SliderHero } from '../components/SliderHero';

function Home() {
  return (
    <div className="-mt-28">
      <SliderHero />
      <RightImageHero />
    </div>
  );
}

export default Home;
