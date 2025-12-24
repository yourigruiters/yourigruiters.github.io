import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img5 from "../assets/images/5.png";
import img6 from "../assets/images/6.png";

const Story5 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader
        title="Mixture of emotions in Perth"
        imageUrl={img5}
        number="05"
      />

      <div className="mt-6">
        <SectionText>
          <p>
            Christmas is a time of positivity and love.. not one for sharing
            negativity. And as several parts of my documentation might contain
            small negative bits, I’ve decided to keep them out as much as I can
            from the Perth section. So is there anything left to mention that
            was positive? Of course! Damn, we’ve done so many things together in
            Perth and so many of them were amazing! (Like Jess and Twiggy, easy)
          </p>
          <p>
            But hey.. Perth was a challenge, hopefully one we’ll not have to
            face again.
          </p>
          <p>Let me just some up some of the highlights:</p>
        </SectionText>

        <SectionList
          items={["LIST OF HIGHLIGHTS", "(Update this list in code)"]}
        />

        <SectionText>
          <p>
            So.. Perth didn’t really work out in the end, we’re well aware of
            that. After a lot of communicating and thinking about possible
            options, we finally did decide to go to Asia! From m side, I still
            think it was the best option we had from the available ones, and I’m
            glad you also chose Asia to be our next ‘supposed’ destination. But
            theeeeeeeeennn.. Passport gone!
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
          to="/6"
          title="Short split-up"
          description="I mean.. It wasn’t really necessary to split up if you just didn’t hide my passport between the bed."
          imageUrl={img6}
          number="06"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story5;
