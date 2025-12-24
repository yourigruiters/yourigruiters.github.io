import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import SectionQuote from "../components/content/SectionQuote";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img10 from "../assets/images/10.JPG";

const Story10 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="You" imageUrl={img10} number="10" />

      <div className="mt-6">
        <SectionText>
          <p>
            So here I am.. the final section of the document.. being honest, my
            main message if I hadn’t documented this all in an application would
            probably mostly be regarding the contents of this section, you. Fair
            enough, since meeting you in Brisbane loads of things have been
            about you in my head.. considering you in my thoughts, considering
            you in my plans for the future, considering you anywhere really. But
            whatever, that is what it is, let me focus more on you.
          </p>
          <p>
            You’re amazing to be around, there’s an incredible amount of
            positive things that you carry with you which I love and appreciate.
            And even the negative things you’ve mentioned about yourself don’t
            seem to be there half the time, haha. Hell, I’m even still waiting
            for some to appear which according to you have been there all the
            time.
          </p>
          <p>
            You’re always keeping me informed about the things you’re doing,
            which I love. You’re always keeping me updated on things going on in
            your camp. You’re always thinking with me about the things we’re
            (planning on) doing. You really seem to care about me. You always
            listen to me. Your heart is in the right place. You always show
            interest in me and things related to me. You always text me. You
            often ask me to call. You allow me to cuddle you all the time.
            You’re great at board and card games. You’re smart. You’re humble.
            You’re beautiful. And one more thing, you’re not afraid to speak up
            to me when I seem to do something negative.
          </p>
          <p>
            I could’ve said many more things above, but I wanted to end on the
            last one also.. We’ve already spoken about this a bit more often
            lately, so there’s no need to go deep into it. But I appreciate you
            speaking up to me and showing me my negative sides, I’ll always try
            to improve myself towards you were possible and I also really
            appreciate you trying to assist in improving the way you might be
            able to improve yourself.
          </p>
          <p>
            There’s so many things I can still tell you.. I’m pretty sure I
            could’ve made this whole document 10 times the size if I wanted to
            with information about our journey so far, but let me wrap it up
            here. The most important thing I’d like for you to know and has,
            according to myself, been this way since chatting to you in July..
          </p>
        </SectionText>

        <SectionQuote quote="I appreciate you, and you’re worth every bit of my time and effort! Thank you for always being there for me." />

        <div className="mt-8"></div>

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story10;
