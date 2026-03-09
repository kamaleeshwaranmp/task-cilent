import { Toaster } from "react-hot-toast";
import MarqueeBanner from "../src/components/MarqueeBanner";
import OfferPopup from "../src/components/OfferPopup";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignList from "./pages/CampaignList";

function App() {

  return (

    <div>

      <Toaster position="top-right" />

      {/* Website Banner */}
      <MarqueeBanner />
      <OfferPopup />

      {/* Admin Panel */}
      <div className="p-10 bg-gray-100 space-y-10">

        <CreateCampaign />

        <CampaignList />

      </div>

    </div>

  );

}

export default App;