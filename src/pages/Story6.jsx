import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionQuote from "../components/content/SectionQuote";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img6 from "../assets/images/6.JPG";
import img7 from "../assets/images/7.JPG";

const Story6 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="Short split-up" imageUrl={img6} number="06" />

      <div className="mt-6">
        <SectionText>
          <p>
            Hey, hey, hey! Our infamous split-up! Besides the fact that it costs
            me loads of money to shortly make my way to Sydney, it might have
            been a good moment to be separated for a week.. Because as we know
            by now, the HUGE amount of time (in minutes, ha) we spend separately
            in Asia over a 6 week period was absolutely crazy. (Especially
            knowing you, your social battery and the time you’d like to spend on
            your own)
          </p>
          <p>
            I believe the situation wasn’t perfect. For myself, it was beautiful
            to see Sydney for the first time and get some things done, meeting
            up with Harry again also.. But generally speaking I wasn’t supposed
            to be there at the time. For you, doing the solo travelling there in
            the beginning didn’t feel fantastic.. At least from my side I didn’t
            necessarily enjoy the fact that you were there on your own without
            knowing too much about the safety and everything. But alright.. we
            both survived, and we managed to get back together with the 3 of us
            in Asia!
          </p>
        </SectionText>

        <SectionQuote quote="You, me and banana soap" />

        <div className="mt-8 mb-4">
          <SectionText>
            <h3 className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest">
              Up Next
            </h3>
          </SectionText>
        </div>

        <LinkCard
          to="/7"
          title="Traveling Asia"
          description="Could have made a whole section per country we’ve visited if I wanted to.."
          imageUrl={img7}
          number="07"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story6;
