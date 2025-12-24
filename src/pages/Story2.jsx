import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";

const Story2 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader
        title="Summary of the last 6 months"
        imageUrl={img2}
        number="02"
      />

      <div className="mt-6">
        <SectionText>
          <p>
            It’s been a while, hey.. Five and a half months ago we met each
            other in Brisbane, a month and a half ago we started a trip to Asia
            together after having had the ‘worlds greatest’ time in Perth, quite
            the journey already. I’d like to start everything by thanking you
            for sticking with me through all of the amazing experiences we’ve
            shared together so far.
          </p>
          <p>
            What an incredible time if you think about it, and where would you
            even start to document about it.. Every time our journey crosses my
            mind there’s so many different aspects to consider, let me take you
            with me on a journey of some of the things we’ve done. Definitely
            including the following main ones:
          </p>
        </SectionText>

        <SectionList
          items={[
            "Meeting in Brisbane",
            "Chatting in Sunshine Coast/London",
            "Failure in Perth",
            "Short split-up",
            "Traveling Asia",
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
          to="/3"
          title="Meeting in Brisbane"
          description="My favourite memory.. Just seeing you there at the dinner table."
          imageUrl={img3}
          number="03"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story2;
