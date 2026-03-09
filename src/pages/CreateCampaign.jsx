import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Calendar,
  Settings,
  Layout,
  Monitor,
  Sparkles,
  Link,
  Image
} from "lucide-react";

const CreateCampaign = () => {

  const { register, handleSubmit, watch, formState:{isSubmitting} } = useForm({
    defaultValues: {
      isActive: true,
      showPopup: false,
      showMarquee: false,
      marqueeColor: "#6366f1",
      marqueeGradient: ""
    }
  });

  const onSubmit = async (data) => {

    try {

      await axios.post("/api/campaign/create", data);

      toast.success("Campaign Created Successfully 🚀");

      window.location.reload();

    } catch (error) {

      toast.error("Failed to create campaign");

    }

  };

  const marqueeText = watch("marqueeText");
  const marqueeColor = watch("marqueeColor");
  const marqueeGradient = watch("marqueeGradient");
  const showMarquee = watch("showMarquee");
  const showPopup = watch("showPopup");

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center p-10">

      <div className="bg-white/80 backdrop-blur-lg w-[950px] rounded-2xl shadow-2xl p-10 border">

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
          <Sparkles className="text-indigo-600"/> Campaign Manager
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* SCHEDULE */}

          <div className="bg-white p-6 rounded-xl shadow-sm border">

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar size={18}/> Campaign Schedule
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="datetime-local"
                {...register("activeFrom")}
                className="border p-3 rounded-lg w-full"
              />

              <input
                type="datetime-local"
                {...register("activeTill")}
                className="border p-3 rounded-lg w-full"
              />

            </div>

          </div>

          {/* STATUS */}

          <div className="bg-white p-6 rounded-xl shadow-sm border">

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Settings size={18}/> Status Controls
            </h3>

            <div className="flex gap-10 text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("isActive")} />
                Active Campaign
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("showPopup")} />
                Show Popup
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("showMarquee")} />
                Show Marquee
              </label>

            </div>

          </div>

          {/* MARQUEE SETTINGS */}

          {showMarquee && (

          <div className="bg-white p-6 rounded-xl shadow-sm border">

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Layout size={18}/> Marquee Settings
            </h3>

            <div className="space-y-4">

              <div className="relative">

                <Sparkles className="absolute left-3 top-3 text-gray-400"/>

                <input
                  placeholder="Marquee Text"
                  {...register("marqueeText")}
                  className="border p-3 pl-10 rounded-lg w-full"
                />

              </div>

              <div className="relative">

                <Link className="absolute left-3 top-3 text-gray-400"/>

                <input
                  placeholder="Marquee Link"
                  {...register("marqueeLink")}
                  className="border p-3 pl-10 rounded-lg w-full"
                />

              </div>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-medium">
                    Solid Color
                  </label>

                  <input
                    type="color"
                    {...register("marqueeColor")}
                    className="w-full h-12 mt-1"
                  />
                </div>

                <div>

                  <label className="text-sm font-medium">
                    Gradient
                  </label>

                  <input
                    placeholder="linear-gradient(...)"
                    {...register("marqueeGradient")}
                    className="border p-3 rounded-lg w-full mt-1"
                  />

                </div>

              </div>

            </div>

          </div>

          )}

          {/* PREVIEW */}

          {showMarquee && (

          <div className="bg-white p-6 rounded-xl shadow-sm border">

            <h3 className="font-semibold text-lg mb-4">
              Live Marquee Preview
            </h3>

            <div
              className="p-4 rounded-lg text-white text-center font-semibold"
              style={{
                background: marqueeGradient || marqueeColor
              }}
            >

              {marqueeText || "Your marquee text will appear here"}

            </div>

          </div>

          )}

          {/* POPUP SETTINGS */}

          {showPopup && (

          <div className="bg-white p-6 rounded-xl shadow-sm border">

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Monitor size={18}/> Popup Settings
            </h3>

            <div className="space-y-4">

              <div className="relative">

                <Image className="absolute left-3 top-3 text-gray-400"/>

                <input
                  placeholder="Popup Desktop Image URL"
                  {...register("popupDesktopImage")}
                  className="border p-3 pl-10 rounded-lg w-full"
                />

              </div>

              <div className="relative">

                <Image className="absolute left-3 top-3 text-gray-400"/>

                <input
                  placeholder="Popup Mobile Image URL"
                  {...register("popupMobileImage")}
                  className="border p-3 pl-10 rounded-lg w-full"
                />

              </div>

              <div className="relative">

                <Link className="absolute left-3 top-3 text-gray-400"/>

                <input
                  placeholder="Popup Click URL"
                  {...register("popupClickUrl")}
                  className="border p-3 pl-10 rounded-lg w-full"
                />

              </div>

            </div>

          </div>

          )}

          {/* SUBMIT */}

          <div className="flex justify-end">

            <button
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? "Creating..." : "Create Campaign 🚀"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default CreateCampaign;