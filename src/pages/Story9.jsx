import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img9 from "../assets/images/9.png";
import img10 from "../assets/images/10.png";

const Story9 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader
        title="Activities done together"
        imageUrl={img9}
        number="09"
      />

      <div className="mt-6">
        <SectionText>
          <p>
            From chatting about our ‘top 5 songs’ to playing Monopoly Deal, from
            night walks in Brisbane to itinerary research nights in Asia, from
            hospital shower sessions to.., oh wait! One had to go through all of
            our pictures and dig deep into his brain to find all these
            activities, and I’ve definitely forgotten so many! Here is a list of
            all the things I could think of:
          </p>
        </SectionText>

        <SectionList
          items={["LIST OF ACTIVITIES", "(Update this list in code)"]}
        />

        <div className="mt-8 mb-4">
          <SectionText>
            <h3 className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest">
              Up Next
            </h3>
          </SectionText>
        </div>

        <LinkCard
          to="/10"
          title="Uncertainty of the future"
          description="…"
          imageUrl={img10}
          number="10"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story9;
