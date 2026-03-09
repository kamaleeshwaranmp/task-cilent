import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Megaphone } from "lucide-react";

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

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Megaphone size={26} />
            Campaigns
          </h2>

          <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
            {campaigns.length} Campaigns
          </span>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 text-gray-600 text-left">

                <th className="p-4">Marquee Text</th>
                <th className="p-4">Active From</th>
                <th className="p-4">Active Till</th>
                <th className="p-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {campaigns.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-12 text-gray-400"
                  >

                    <div className="flex flex-col items-center gap-2">

                      <Calendar size={40} />

                      <p className="text-lg">
                        No campaigns found
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                campaigns.map((c) => (

                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-medium text-gray-800">
                      {c.marqueeText || "-"}
                    </td>

                    <td className="p-4 text-gray-600">

                      {c.activeFrom
                        ? new Date(c.activeFrom).toLocaleString()
                        : "-"}

                    </td>

                    <td className="p-4 text-gray-600">

                      {c.activeTill
                        ? new Date(c.activeTill).toLocaleString()
                        : "-"}

                    </td>

                    <td className="p-4">

                      {c.isActive ? (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>

                      ) : (

                        <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
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

      </div>

    </div>

  );

};

export default CampaignList;