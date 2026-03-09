import { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import CountdownTimer from "./CountdownTimer";

const MarqueeBanner = () => {

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {

    axios.get("/api/campaign/active")
      .then(res => setCampaign(res.data.data))
      .catch(err => console.log(err));

  }, []);

  if (!campaign || !campaign.showMarquee) return null;

  return (

    <div>

      <Marquee
        style={{
          background: campaign.marqueeGradient || campaign.marqueeColor,
          color: "white",
          padding: "10px"
        }}
      >

        <a href={campaign.marqueeLink} className="mx-10">
          {campaign.marqueeText}
        </a>

      </Marquee>

      {/* Countdown Timer */}
      <CountdownTimer end={campaign.activeTill} />

    </div>

  );

};

export default MarqueeBanner;