import { useEffect, useState } from "react";
import axios from "axios";

const OfferPopup = () => {

  const [campaign, setCampaign] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {

    const fetchCampaign = async () => {

      try {

        const res = await axios.get("/api/campaign/active");

        console.log("Campaign:", res.data);

        setCampaign(res.data.data);

      } catch (error) {

        console.error("Error fetching campaign:", error);

      }

    };

    fetchCampaign();

  }, []);

  if (!campaign || !campaign.showPopup || !show) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-4 rounded shadow">

        <button
          className="float-right text-red-500"
          onClick={() => setShow(false)}
        >
          X
        </button>

        <a href={campaign.popupClickUrl}>

          <img
            src={campaign.popupDesktopImage}
            className="w-[400px]"
            alt="Offer Popup"
          />

        </a>

      </div>

    </div>

  );

};

export default OfferPopup;