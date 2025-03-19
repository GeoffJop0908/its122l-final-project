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
        text="Greenhills Christian Fellowship exists to glorify GOD by making disciples who love GOD and love one another."
        image="/mission.png"
        header="Mission"
      />
       <ImageHero
        text="Lives and communities transformed through Christ (2 Cor. 5:17; Acts 2:42-47)."
        image="/vision.jpg"
        header="Vision"
      />
      <ImageHero
        right
        text= { <> <p> Grounded on God’s Word and sound interpretation </p>

          <p> Christ-centered and intentional discipleship </p>

          <p> Focus on God’s glory in worship and fervent prayer </p>

          <p>Compassion for the lost and evangelism </p>

          <p> Spiritual gifts based ministry and excellent service </p>

          <p> Fellowship and sincere brotherly love </p> </>}
        image="/corevalues.jpg"
        header="Core Values"
      />
    </div>
  );
}

export default Home;
