import '../App.css';
import ImageHero from '../components/ImageHero';
import { SliderHero } from '../components/SliderHero';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="-mt-[10vh]">
      <SliderHero />
      <ImageHero
        right
        text="GCF San Fernando Pampanga started in 1998, but was formally launched
            on January 10, 1999 thru the collective efforts of missionary couple
            Pastor Love and Sister Racquel Tira; and pioneer members Brother
            Cesar Ocampo, and the couple Brother Mario and Sister Liz Dabu. In a
            formal inaugural service conducted at Days Hotel, attended by the
            leaders of the Conservative Baptist Association of the Philippines
            (CBAP), GCF-Ortigas, and its then senior pastor Dr. Luis Pantoja,
            Jr., GCF San Fernando was officially established to be a beacon of
            the gospel in Central Luzon with a primary goal: to “KNOW CHRIST AND
            MAKE HIM KNOWN."
        image="/gcf.jpg"
        header="We're glad you're here!"
        button="Worship with us"
      />
      <ImageHero className="bg-stone-300" />
    </div>
  );
}

export default Home;
