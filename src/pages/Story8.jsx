import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img8 from "../assets/images/8.JPG";
import img9 from "../assets/images/9.JPG";

const Story8 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="A month of separation" imageUrl={img8} number="08" />

      <div className="mt-6">
        <SectionText>
          <p>
            So, here we are, separated at last and back to communicating over
            our phones. Towards the end of our trip it also felt like the time
            separated might be good for us again, definitely because minor
            issues seemed to come and go on an almost daily basis. And
            truthfully speaking, you were absolutely right in mentioning that
            you would’ve expected way more issues regarding the time spend
            together.
          </p>
          <p>
            Where you had mentioned that it felt a little bit weird in the
            beginning on our first phone call, I haven’t really noticed anything
            different.. I know you better than ever, I still feel like I want to
            share anything I do with you over the phone, and I’ll always be
            looking out for the first moment I get to see you again. Seems to me
            like the biggest difference this time of separation is that we are
            not sharing our top 5 songs anymore!
          </p>
          <p>
            Christmas though.. That’s actually a really funny one now that I’m
            writing this bit of text. I can recall so well, that during our
            initial chats whilst I was in the Sunshine Coast and also when we
            were in Perth, I had mentioned quite a few times JOKINGLY how you
            were going to leave me alone for Christmas because of your
            appointment. Christmas seemed so far away back in that moment, but
            now it’s right here. I can say whatever I want to say, but at least
            I got some gifts from my Secret Santa!
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
          to="/9"
          title="Uncertainty of the future"
          description="…"
          imageUrl={img9}
          number="09"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story8;
