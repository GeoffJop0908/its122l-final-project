import icon from '../assets/horn.svg';

function Announcement() {
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        {/*Navigation Bar Color/Background*/}

        {/* Main Content Pane */}
        <div className=" bg-gray-200 w-full flex flex-col items-center py-15">
          <h1 className="text-5xl font-bold text-black pb-10">Announcements</h1>

          <ul
            className="list bg-base-100 rounded-box shadow-md max-w-[70%] w-full max-h-[50%] overflow-y-auto"
            data-lenis-prevent
          >
            <li className="list-row">
              <div>
                <img className="size-10 rounded-box" src={icon} />
              </div>
              <div>
                <div>Knee Gears for sale</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  July 2, 1839
                </div>
              </div>
              <p className="list-col-wrap text-sm">
                Fresh from the boat knee gears.
              </p>
            </li>

            <li className="list-row">
              <div>
                <img className="size-10 rounded-box" src={icon} />
              </div>
              <div>
                <div>Sample</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  January 1, 2000
                </div>
              </div>
              <p className="list-col-wrap text-sm">
                The Chamber verified the identity of the suspect and ensured
                that he was clearly informed of the crimes he is alleged to have
                committed and of his rights under the Rome Statute of the ICC in
                a language he fully understands and speaks.
              </p>
            </li>

            <li className="list-row">
              <div>
                <img className="size-10 rounded-box" src={icon} />
              </div>
              <div>
                <div>Suntukan sa Mapua</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  March 17, 2025
                </div>
              </div>
              <p className="list-col-wrap text-sm"></p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Announcement;
