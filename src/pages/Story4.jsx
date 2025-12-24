import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img4 from "../assets/images/4.png";
import img5 from "../assets/images/5.png";

const Story4 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader
        title="Chatting in Sunshine Coast/London"
        imageUrl={img4}
        number="04"
      />

      <div className="mt-6">
        <SectionText>
          <p>
            Where we started walking for hours and hours in Brisbane, I had to
            continue these walks on my own during our hourly phone calls whilst
            you were in London. A very interesting time that really tested our
            ability to communicate together and whether we would be able to
            provide the required effort to keep up deep conversations they way
            we had those early days. We’ve even had to celebrate both birthdays
            over the phone, imagine.
          </p>
          <p>
            And honestly speaking, the conversations we had during this period
            of time seem to be the ones where we really got to know each other.
            We even started realising that not EVERYTHING was in common for us,
            even though loads of things seemed to be. A lot of the things that
            seemed to differ between us also came down to you mentioning your
            position in relationships, and I guess for some of the points I’m
            still trying to figure out exactly what you meant. Because you
            definitely did not show me all of these aspects during our trip to
            Asia.
          </p>
          <p>
            Time went by quickly in some days and slowly in others. Time seemed
            to go slowest when we started realising that Perth was going to be a
            realistic option. Looking back at everything, Perth worked out very
            well for us in spending time together and getting to know each other
            even more, but initially.. we weren’t even supposed to be together
            in Perth full-time from day 1. I’m still happy that I decided to
            just navigate my way fully to Perth, everything would’ve been very
            different if I would’ve gone back to the Sunshine Coast after a
            couple of days. And being there, it started to seem like you were
            more and more interested in me sticking around your little bubble
            also.
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
          to="/5"
          title="Mixture of emotions in Perth"
          description="What can I say? Favourite location for sure. 10/10 will come back again!"
          imageUrl={img5}
          number="05"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story4;
