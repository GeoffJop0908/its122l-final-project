import { useNavigate, Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        {/* Navigation Bar */}

        {/* Main Content Pane */}
        <div className="bg-gray-200 w-full flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black">About The GCF</h1>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
          Greenhills Christian Fellowship (GCF) was founded on February 14, 1978 by a missionary 
          couple from America, Dave and PJ Yount. What started then as a Valentine’s Day event 
          has now turned into a community of over 7,000 worshipers.
          </p>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
          Throughout the years, GCF has grown to ‘Know Christ and Make Him Known’, with thousands supporting
           missions-oriented efforts here and abroad for God’s glory. Today, GCF pursues 
           a refocused mission of making disciples in the Philippines and beyond with a new vision of lives and 
           communities transformed through Jesus Christ.
          </p>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
          GCF subscribes to gospel-centered expository preaching and Biblical eldership. We are a member of the 
          Conservative Baptist Association of the Philippines (CBAP) and a partner of various Christian organizations 
          in the Philippines and abroad.
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

    <footer className="bg-gray-100 pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Church Information */}
        <div>
          <h3 className="text-lg font-medium text-teal-700 mb-4">Greenhills Christian Fellowship</h3>
          <p className="text-gray-600 mb-2">Ruby corner Garnet Roads, Ortigas Center, Pasig City, Philippines</p>
          <p className="text-gray-600 mb-2">+63 2 8632-1354 to 56</p>
          <p className="text-gray-600 mb-4">email@gcf.org.ph</p>
          
          <div className="flex space-x-3">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15l5.19-3L10 9v6z"/>
                <path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm2 0c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" fillRule="evenodd"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163C.703 16.033.156 13.988.156 11.891.157 5.335 5.493 0 12.05 0c3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <h3 className="text-lg font-medium text-teal-700 mb-4">Videos</h3>
          <ul className="text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-teal-600">Watch Online</a></li>
            <li><a href="#" className="hover:text-teal-600">Sermons</a></li>
            <li><a href="#" className="hover:text-teal-600">All Videos</a></li>
          </ul>
        </div>

        {/* I'm New Section */}
        <div>
          <h3 className="text-lg font-medium text-teal-700 mb-4">I'm New</h3>
          <ul className="text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-teal-600">About GCF</a></li>
            <li><a href="#" className="hover:text-teal-600">Growth Groups</a></li>
          </ul>
        </div>

        {/* Combined Right Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Be Involved Section */}
          <div>
            <h3 className="text-lg font-medium text-teal-700 mb-4">Be Involved</h3>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-teal-600">Give</a></li>
              <li><a href="#" className="hover:text-teal-600">Life Journey</a></li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-lg font-medium text-teal-700 mb-4">Get in Touch</h3>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-teal-600">Need Prayer?</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default About;
