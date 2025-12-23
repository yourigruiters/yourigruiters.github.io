import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionImage from "../components/content/SectionImage";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import SectionQuote from "../components/content/SectionQuote";
import sunriseImage from "../assets/images/sunrise.png";

const Story12 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="Morning Yoga" imageUrl={sunriseImage} number="12" />

      <div className="mt-6">
        <SectionText>
          <p>Blabla</p>
        </SectionText>

        <SectionQuote quote="Yoga is the journey of the self, through the self, to the self." />

        <SectionImage src={sunriseImage} alt="Sun Salutation Pose" />

        <SectionText>
          <h3>Why Morning Yoga?</h3>
          <p>Blabla</p>
        </SectionText>

        <SectionList
          items={[
            "Find a quiet space",
            "Roll out your mat",
            "Connect with your breath",
            "Move with intention",
          ]}
        />

        <SectionText>
          <p>Blabla</p>
        </SectionText>

        <LinkCard
          to="/" // Placeholder: would link to another specific page
          title="Meditation"
          description="Clear your mind after your practice."
          imageUrl={sunriseImage}
          number="03"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story12;
