import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionImage from "../components/content/SectionImage";
import SectionList from "../components/content/SectionList";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import sunriseImage from "../assets/images/sunrise.png";

const MorningYoga = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="Morning Yoga" imageUrl={sunriseImage} number="01" />

      <div className="mt-6">
        <SectionText>
          <p>
            Start your day with intention and energy. This sequence is designed
            to wake up your spine, stretch your muscles, and prepare your mind
            for the day ahead.
          </p>
          <p>
            <strong>Duration:</strong> 15-20 minutes
            <br />
            <strong>Level:</strong> Beginner friendly
          </p>
        </SectionText>

        <SectionImage src={sunriseImage} alt="Sun Salutation Pose" />

        <SectionText>
          <h3>Why Morning Yoga?</h3>
          <p>
            Practicing yoga in the morning helps to lower stress hormones,
            improve circulation, and gives you a "win" before the day even
            begins.
          </p>
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
          <h3>Up Next</h3>
          <p>
            Check out these related activities for a complete morning routine.
          </p>
        </SectionText>

        <LinkCard
          to="/" // Placeholder: would link to another specific page
          title="Meditation"
          description="Clear your mind after your practice."
          imageUrl={sunriseImage}
          number="03"
        />

        <LinkCard
          to="/" // Placeholder
          title="Healthy Breakfast"
          description="Fuel your body right."
          imageUrl={sunriseImage}
          number="02"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default MorningYoga;
