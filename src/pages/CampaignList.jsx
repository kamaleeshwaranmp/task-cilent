import { useEffect, useState } from "react";
import axios from "axios";

const CampaignList = () => {

  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {

    try {

      const res = await axios.get("/api/campaign");

      setCampaigns(res.data?.data || []);

    } catch (error) {

      console.error("Error fetching campaigns:", error);

      setCampaigns([]);

    }

  };

  useEffect(() => {

    fetchCampaigns();

  }, []);

  return (

    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        Campaigns
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2 border">Marquee Text</th>
            <th className="p-2 border">Active From</th>
            <th className="p-2 border">Active Till</th>
            <th className="p-2 border">Status</th>
          </tr>

        </thead>

        <tbody>

          {campaigns.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No campaigns found
              </td>
            </tr>
          ) : (

            campaigns.map((c) => (

              <tr key={c._id}>

                <td className="p-2 border">
                  {c.marqueeText}
                </td>

                <td className="p-2 border">
                  {new Date(c.activeFrom).toLocaleString()}
                </td>

                <td className="p-2 border">
                  {new Date(c.activeTill).toLocaleString()}
                </td>

                <td className="p-2 border">

                  {c.isActive ? (
                    <span className="text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Disabled
                    </span>
                  )}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default CampaignList;