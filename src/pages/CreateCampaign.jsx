import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCampaign = () => {

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      isActive: true,
      showPopup: false,
      showMarquee: false,
      marqueeColor: "#000000",
      marqueeGradient: ""
    }
  });

  const onSubmit = async (data) => {

    try {

      await axios.post("/api/campaign/create", data);

      toast.success("Campaign Created Successfully");

      window.location.reload();

    } catch (error) {

      toast.error("Failed to create campaign");

      console.error(error);

    }

  };

  const marqueeText = watch("marqueeText");
  const marqueeColor = watch("marqueeColor");
  const marqueeGradient = watch("marqueeGradient");

  return (

    <div className="bg-gray-100 p-10 flex justify-center">

      <div className="bg-white w-[900px] rounded-lg shadow-lg p-8">

        <h1 className="text-2xl font-bold mb-6">
          Campaign Manager
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* Campaign Schedule */}
          <div>

            <h3 className="font-semibold mb-2">
              Campaign Schedule
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="datetime-local"
                {...register("activeFrom")}
                className="border p-2 rounded"
              />

              <input
                type="datetime-local"
                {...register("activeTill")}
                className="border p-2 rounded"
              />

            </div>

          </div>

          {/* Status */}
          <div>

            <h3 className="font-semibold mb-2">
              Status
            </h3>

            <div className="flex gap-6">

              <label className="flex gap-2">
                <input type="checkbox" {...register("isActive")} />
                Active
              </label>

              <label className="flex gap-2">
                <input type="checkbox" {...register("showPopup")} />
                Show Popup
              </label>

              <label className="flex gap-2">
                <input type="checkbox" {...register("showMarquee")} />
                Show Marquee
              </label>

            </div>

          </div>

          {/* Marquee Settings */}
          <div>

            <h3 className="font-semibold mb-2">
              Marquee Settings
            </h3>

            <div className="space-y-3">

              <input
                placeholder="Marquee Text"
                {...register("marqueeText")}
                className="border p-2 rounded w-full"
              />

              <input
                placeholder="Marquee Link"
                {...register("marqueeLink")}
                className="border p-2 rounded w-full"
              />

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Solid Color</label>

                  <input
                    type="color"
                    {...register("marqueeColor")}
                    className="w-full h-10"
                  />
                </div>

                <div>
                  <label>Gradient Color</label>

                  <input
                    placeholder="linear-gradient(...)"
                    {...register("marqueeGradient")}
                    className="border p-2 rounded w-full"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Marquee Preview */}
          <div>

            <h3 className="font-semibold mb-2">
              Marquee Preview
            </h3>

            <div
              className="p-3 text-white rounded"
              style={{
                background: marqueeGradient || marqueeColor
              }}
            >

              {marqueeText || "Your marquee text will appear here"}

            </div>

          </div>

          {/* Popup Settings */}
          <div>

            <h3 className="font-semibold mb-2">
              Popup Settings
            </h3>

            <div className="space-y-3">

              <input
                placeholder="Popup Desktop Image URL"
                {...register("popupDesktopImage")}
                className="border p-2 rounded w-full"
              />

              <input
                placeholder="Popup Mobile Image URL"
                {...register("popupMobileImage")}
                className="border p-2 rounded w-full"
              />

              <input
                placeholder="Popup Click URL"
                {...register("popupClickUrl")}
                className="border p-2 rounded w-full"
              />

            </div>

          </div>

          {/* Submit */}
          <div className="flex justify-end">

            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              Create Campaign
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default CreateCampaign;