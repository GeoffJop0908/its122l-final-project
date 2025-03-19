import { useNavigate, Link } from 'react-router-dom';

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-10">
      {/* Navigation Bar */}

      {/* Main Content Pane */}
      <div className="w-full flex flex-col items-center">
        <h1 className="text-5xl font-bold text-black">About The GCF</h1>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        GCF San Fernando Pampanga started in 1998, but was formally launched on January 10, 1999 thru the collective efforts of missionary couple Pastor Love and Sister Racquel Tira; and pioneer members Brother Cesar Ocampo, and the couple Brother Mario and Sister Liz Dabu. In a formal inaugural service conducted at Days Hotel, attended by the leaders of the Conservative Baptist Association of the Philippines (CBAP), GCF-Ortigas, and its then senior pastor Dr. Luis Pantoja, Jr., GCF San Fernando was officially established to be a beacon of the gospel in Central Luzon with a primary goal: to “KNOW CHRIST AND MAKE HIM KNOWN.”
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        Pastor Love Tira led the church from 1998 to 2003, establishing its strong directional and theological foundation. Also, during that time, the first GCF Center at Lazatin Boulevard was established. When Pastor Love had to move to Bulacan to start GCF Malolos (the first daughter church of GCF-SF), the leadership of the church was entrusted to Pastor Ross Tarroja, who ministered to GCF San Fernando from 2003 to 2009, alongside gifted local leaders. However, from 2009 up to 2010, GCF San Fernando was forced by circumstances to survive without a Resident Pastor when Pastor Ross had to leave San Fernando. But instead of losing hope, the situation strengthened the resolve of the then Governing Board under the leadership of Elder Jun Perez. The GB initiated an extensive search for a suitable pastor, and by faith waited on the Lord to provide the church a new undershepherd.
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        In June of 2010, after a long period of prayer and deliberations, the GCF San Fernando Congregation through its Governing Board, invited and called Reverend Gerry Oarde, who was then the Regional Chairman of CBAP Region 3A and the Senior Pastor of Christian Evangelical Fellowship in Tarlac City, to be the Resident Senior Pastor of GCF San Fernando. Alongside Pastor Gerry and at the same period, Pastor Joey Melad, an Assistant Pastor at GCF Malolos was also invited and called to be an Assistant Pastor.
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        Since 2010, Pastor Gerry led GCF San Fernando through many transitions. He restructured the church leadership; strengthened the church’s Bible-teaching ministry; redefined ministry descriptions and goals; implemented effective ministry programs; and conducted administrative reforms. More importantly, he re-emphasized disciple-making and church planting, and provided a new and exciting strategic vision dubbed “VISION 2020.”
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        VISION 2020 states: “To glorify God and make disciples of all nations: We envision doubling our membership through Church health by 2012, establishing at least 30 multiplying Growth Groups by 2015, and launching 2 local church plants with strategic and significant presence in and around the province of Pampanga by 2020.” So far, GCF-SF is on track with its vision. From a membership of 68 in 2010 to 513 in 2017, it has now more than quadrupled its membership and has established more small groups. Also, it inaugurated its new and larger Ministry Center at Robinsons Starmills in 2013, secured its legal independent church status and SEC Registration in 2014, and launched its Angeles City Church plant also in 2014.
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        From 2015-2016 GCF-SF campaigned for a more vibrant spirituality and fellowship among its leaders and members, culminating with the theme: “Deeper in the Word, Wider in the World” in 2017. In early 2017, GCF San Fernando started GCF Guagua through the generous support of Deaconess Luz Jingco and family. In the same year, GCF San Fernando re-engineered its church structure, and positioned and renamed itself as GCF Pampanga-Central, highlighting its farther vision to establish and strengthen GCF Pampanga-North (GCF Angeles), GCF Pampanga-West (GCF Guagua & Lubao), and in the near future… GCF Pampanga-East (GCF Arayat & Mexico) and GCF Pampanga-South (GCF Apalit & Macabebe). In 2019, during its 20th Anniversary, the entire church of GCF PAMPANGA focused on putting everyone’s efforts together for its battle cry: “20gether: Victory in Unity!” knowing that our victory is in Christ as we His church unite to follow Jesus and glorify God.
        </p>

        <p className="text-lg text-black max-w-[60%] text-justify my-6 leading-relaxed">
        This year, GCF PAMPANGA as one Church is putting all faith and credit to God Almighty in expanding Vision 2020 beyond the numbers and objectives that we targeted ten years ago. The Lord is still at work in our Church and in our individual lives! Let us all work forward towards our future that Christ holds in His hands! Today, GCF Pampanga-Central continues to be a beacon of the Gospel of Christ in West Central Luzon. We will expand our vison for our church to be stronger, larger, and ever attempting to be like its Master in love, service, and purity. It will continuously look forward to a brighter future as it pursues its unchanging mission - “TO GLORIFY GOD BY MAKING DISCIPLES WHO LOVE GOD AND EACH OTHER.”
        </p>

        <Link
          to="https://www.gcf.org.ph/about"
          className="font-medium hover:underline"
        >
          <button className="bg-jungle-green-600 text-white py-3 px-6 rounded-md mt-6">
            Learn More
          </button>
        </Link>
      </div>
      <br></br>
    </div>
  );
}

export default About;
