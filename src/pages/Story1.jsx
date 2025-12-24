import React from "react";
import PageHeader from "../components/content/PageHeader";
import SectionText from "../components/content/SectionText";
import LinkCard from "../components/content/LinkCard";
import BottomBackBtn from "../components/content/BottomBackBtn";
import img1 from "../assets/images/1.JPG";
import img2 from "../assets/images/2.JPG";

const Story1 = () => {
  return (
    <div className="bg-white min-h-screen pb-10">
      <PageHeader title="A simple Christmas gift" imageUrl={img1} number="01" />

      <div className="mt-6">
        <SectionText>
          <p>
            Hey you! A couple of weeks ago I had figured there were only two
            real options available, I’d either send a gift to your house or
            write you one of my typical messages I hadn’t written for a long
            time. Regaining access to my laptop provided me with a more
            interesting option than a simple message, creating another little
            application to make my message stand out a little better and give it
            some more content than just mentioning the stuff I appreciate about
            yourself.
          </p>
          <p>
            Sending a package to your house didn’t feel very realistic,
            especially because I wasn’t sure if you’d appreciate the risk with
            family and all of that good stuff being around the house. Writing
            just a message would have either been annoying using WhatsApp, and a
            little bit sad using email, but in general I figured it would have
            been too simple for Christmas. Obviously being together during
            Christmas would’ve given us much better options, but hopefully this
            one works out just fine!
          </p>
          <p>
            Please know it took a fair amount of time to document everything,
            and I’ve definitely skipped over same topics to keep it feasible to
            read and to make sure it was finished before the end of Christmas,
            haha.
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
          to="/2"
          title="Summary of the last 6 months"
          description="What a journey, ups and downs.. Still standing!"
          imageUrl={img2}
          number="02"
        />

        <BottomBackBtn />
      </div>
    </div>
  );
};

export default Story1;
