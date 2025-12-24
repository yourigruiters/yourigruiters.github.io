import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img7 from "../assets/images/7.png";
import img8 from "../assets/images/8.png";

const Story7 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="Traveling Asia" imageUrl={img7} number="07" />

      <div className="mt-6">
        <SectionText>
          <p>
            Well, well, well.. No Sunshine Coast, no Perth, no Sydney, no other
            possible location in Australia, so.. Asia! Bali being the first stop
            of our trip which will go over 4-5 countries, who would’ve thought
            about this the day we met up in Brisbane. Indonesia, Singapore,
            Vietnam, Thailand (, Nepal).. and then finally back home to England
            & The Netherlands. To be fair, it’s a legendary list of countries
            and some of them I’ve always wanted to visit in my life, so from my
            perspective it’s definitely been a great holiday, not just one to
            cover our shitty situation in Perth.
          </p>
          <p>
            We’ve had our ups and downs regarding activities and locations
            throughout the trip.. But generally speaking it’s been absolutely
            amazing! My stomach is still processing the amount of milkshakes,
            smoothies, smoothie bowls, fried rice and snacks we’ve had over
            these weeks.. And my mind is still processing all the amazing
            activities we’ve done in these different countries. The general
            experience from the trip is something you’d never forget, and some
            of the things we’ve seen will definitely never leave my mind.
          </p>
          <p>
            Let me try to summarise it a little bit for you, so you can just
            enjoy the thoughts instead of needing to do the research yourself:
          </p>
        </SectionText>

        <SectionList
          items={[
            "PER COUNTRY LIST OF ACTIVITIES",
            "(Update this list in code)",
          ]}
        />

        <div className="mt-8 mb-4">
          <SectionText>
            <h3 className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest">
              Up Next
            </h3>
          </SectionText>
        </div>

        <LinkCard
          to="/8"
          title="A month of separation"
          description="It’ll be over before we know it! Time seems to go quick already, but it also feels like I’ve been a month without you already."
          imageUrl={img8}
          number="08"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story7;
