import { useEffect, useState } from "react";
import axios from "axios";

const OfferPopup = () => {

  const [campaign, setCampaign] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {

    axios.get("/api/campaign/active")
      .then(res => setCampaign(res.data.data));

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
          />

        </a>

      </div>

    </div>

  );
};

export default OfferPopup;