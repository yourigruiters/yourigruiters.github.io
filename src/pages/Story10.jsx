import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img10 from "../assets/images/10.png";
import img11 from "../assets/images/11.png";

const Story10 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader
        title="Uncertainty of the future"
        imageUrl={img10}
        number="10"
      />

      <div className="mt-6">
        <SectionText>
          <p>
            Well.. It had to be documented at some point, the uncertainty of the
            future. I could be talking about ‘finding work in Sydney’ as a
            start, but I’m also thinking about whatever happens after Sydney or
            when the initial visa’s run out of time. We’ve had short talks about
            this regarding London, England in general, Australia, New Zealand,
            other countries.. So many different options and nothing is certain
            at the moment.
          </p>
          <p>
            It wouldn’t fit into our profile so far if one of us had the
            answers, but it would be lovely it is was possible to know already.
            My best bet is for us to communicate about this constantly once we
            get back together in Sydney in 2026, good old deep Luxmi & Youri
            conversations. I wish I could’ve told you otherwise, but I also like
            to believe we’re smart people that will make the right decision for
            us moving forward.
          </p>
        </SectionText>

        <div className="mt-8 mb-4">
          <SectionText>
            <h3 className="text-center text-gray-400 text-sm font-medium uppercase tracking-widest">
              Up Next
            </h3>
          </SectionText>
        </div>

        <LinkCard
          to="/11"
          title="You"
          description="My favourite."
          imageUrl={img11}
          number="11"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story10;
