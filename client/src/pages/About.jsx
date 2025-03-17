function About() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        {/* Navigation Bar */}

        {/* Main Content Pane */}
        <div className="bg-gray-200 w-full flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black">About The GCF</h1>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>

          <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>

          <button className="bg-black text-white py-3 px-6 rounded-md mt-6">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}

export default About;
