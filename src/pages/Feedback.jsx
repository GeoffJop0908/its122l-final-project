function Feedback() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        {/*Navigation Bar Color/Background*/}

        {/* Main Content Pane */}
        <div className="w-full flex flex-col items-center py-20">
          {/* Form Container */}
          <div className="max-w-6xl w-full flex flex-row justify-between">
            {/* Left Section */}
            <div className="w-5/12">
              <h1 className="text-5xl font-bold text-black mb-8">
                Send us a Feedback
              </h1>
              <div className="w-120 h-30 bg-gray-300 flex items-center justify-center mb-7">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
              <p className="text-lg text-justify text-black mb-10 leading-relaxed">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Right Section */}
            <div className="w-5/12 justify-center">
              <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg">
                  Username / Email:
                </legend>
                <input type="text" className="input w-full" />
              </fieldset>

              <fieldset className="fieldset mt-3">
                <legend className="fieldset-legend text-lg">Feedback:</legend>
                <textarea className="textarea w-full resize-none h-30"></textarea>
              </fieldset>

              <div className="flex justify-center w-full pt-5">
                <button className="bg-black text-white py-3 px-10 rounded text-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
