import { useNavigate, Link } from 'react-router-dom';

function About() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        {/* Navigation Bar */}

        {/* Main Content Pane */}
        <div className="bg-gray-200 w-full flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black">About The GCF</h1>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
            Greenhills Christian Fellowship (GCF) was founded on February 14,
            1978 by a missionary couple from America, Dave and PJ Yount. What
            started then as a Valentine’s Day event has now turned into a
            community of over 7,000 worshipers.
          </p>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
            Throughout the years, GCF has grown to ‘Know Christ and Make Him
            Known’, with thousands supporting missions-oriented efforts here and
            abroad for God’s glory. Today, GCF pursues a refocused mission of
            making disciples in the Philippines and beyond with a new vision of
            lives and communities transformed through Jesus Christ.
          </p>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
            GCF subscribes to gospel-centered expository preaching and Biblical
            eldership. We are a member of the Conservative Baptist Association
            of the Philippines (CBAP) and a partner of various Christian
            organizations in the Philippines and abroad.
          </p>

          <Link
            to="https://www.gcf.org.ph/about"
            className="font-medium hover:underline"
          >
            <button className="bg-black text-white py-3 px-6 rounded-md mt-6">
              Learn More
            </button>
          </Link>
        </div>
        <br></br>
      </div>
    </>
  );
}

export default About;
