import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionQuote from "../components/content/SectionQuote";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img3 from "../assets/images/3.JPG";
import img4 from "../assets/images/4.JPG";

const Story3 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="Meeting in Brisbane" imageUrl={img3} number="03" />

      <div className="mt-6">
        <SectionText>
          <p>
            Where our minds are not always in agreement on what has happened
            regarding different moments in our relationship, we do seem to be on
            the same level when it comes down to the way we’ve met and what was
            said in Brisbane. Regarding the actual moment of me telling you how
            I felt about you, as mentioned more often, I would never be able to
            provide you with the exact same words, unfortunately. If only that
            was recorded in the moment so we could replay it at our wedding..
          </p>
          <p>
            From my point of view, as I’ll never forget these images until my
            brain starts to disfunction, there’s two initial moments that I can
            clearly recall. This cute and humble lady sitting at the dinner
            table, and the same cute and humble lady calling ‘someone’ on the
            stairs to the sleeping room. It was the combination of cuteness,
            beauty, maybe a slight touch of ‘just let me be on my own’ and the
            ease of being able to read in your face that you’re humble,
            intelligent and have a heart in the right place that attracted me so
            much to you..
          </p>
          <p>
            .. The conversations after only made all these assumptions become
            reality and made room for all of these other qualities that you
            posses to be added to the list of things I adore about you.
            Conversations that only happened due to the fact that YOU asked me
            an initial question, as I’m still quite certain that otherwise it
            would’ve just been an awkward passing for the remainder of your days
            in Brisbane. Because..
          </p>
        </SectionText>

        <SectionQuote quote="Do you by any chance have a scale?" />

        <SectionText>
          <p>
            I’m still very thankful for the fact that you asked me that
            question. Life has been interesting since you did.
          </p>
          <p>
            <strong>P.S.</strong> I did not force myself upon you.
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
          to="/4"
          title="Chatting in Sunshine Coast/London"
          description="Long and deep conversations, the key to getting to know someone easily.. But then over the phone."
          imageUrl={img4}
          number="04"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story3;
