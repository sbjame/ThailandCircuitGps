"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";

type CreateCircuitMenuProps = {
  role: string;
};

export default function CreateCircuitMenu({ role }: CreateCircuitMenuProps) {
  const router = useRouter();

  const [circuitName, setCircuitName] = useState("");
  const [circuitLength, setCircuitLength] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [type, setType] = useState("Automotive");
  const [images, setImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleCreateCircuit = async () => {
    if (!circuitName.trim()) {
      alert("Please enter the name of the racetrack.");
      return;
    }
    if (!circuitLength || Number(circuitLength) <= 0) {
      alert("Please enter the field length (must be greater than 0)");
      return;
    }
    if (!lat || !lon) {
      alert("Please enter Lat / Lon coordinates.");
      return;
    }
    if (Number(lat) < -90 || Number(lat) > 90) {
      alert("Lat must be between -90 and 90.");
      return;
    }
    if (Number(lon) < -180 || Number(lon) > 180) {
      alert("Lon must be between -180 and 180.");
      return;
    }

    const googleMapsRegex =
      /^(https?:\/\/)?(www\.google\.[a-z.]+\/maps|maps\.app\.goo\.gl)\/.+$/;
    if (!googleMapsRegex.test(locationUrl)) {
      alert("Please enter a Google Maps link.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least 1 photo (maximum 5).");
      return;
    }
    if (images.length > 5) {
      alert("You can upload up to 5 photos.");
      return;
    }
    if (!thumbnail) {
      alert("Please upload a thumbnail image");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", circuitName);
      formData.append("lat", lat);
      formData.append("lon", lon);
      formData.append("location_url", locationUrl);
      formData.append("length_km", circuitLength);
      formData.append("type", type);

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const res = await axiosInstance.post("/circuit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
        timeout: 20000,
      });

      setCircuitName("");
      setCircuitLength("");
      setLat("");
      setLon("");
      setLocationUrl("");
      setImages([]);
      setThumbnail(null);
    } catch (err) {
      console.error("❌ Error creating circuit:", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const newImages = [...images, ...selectedFiles].slice(0, 5);
    setImages(newImages);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  return (
    <div className={`flex flex-col items-center px-8 gap-4`}>
      <div className="w-full">
        <div className="flex justify-between text-2xl bg-gray-300 p-2 rounded-t">
          <h1>Create Circuit</h1>
        </div>
        <div className="flex flex-col w-full bg-gray-200 p-2 gap-2">
          <label
            htmlFor="circuitName"
            className="p-2 bg-white text-base rounded"
          >
            <input
              type="text"
              placeholder="Circuit name"
              className="w-full p-2"
              value={circuitName}
              onChange={(e) => setCircuitName(e.target.value)}
            />
          </label>
          <label
            htmlFor="circuitLength"
            className="p-2 bg-white text-base rounded"
          >
            <input
              type="number"
              placeholder="Circuit Length (km)"
              className="w-full p-2"
              value={circuitLength}
              onChange={(e) => setCircuitLength(e.target.value)}
            />
          </label>
          <label htmlFor="lat" className="p-2 bg-white text-base rounded">
            <input
              type="number"
              placeholder="Lat"
              className="w-full p-2"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          <label htmlFor="lon" className="p-2 bg-white text-base rounded">
            <input
              type="number"
              placeholder="Lon"
              className="w-full p-2"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </label>
          <label
            htmlFor="locationUrl"
            className="p-2 bg-white text-base rounded"
          >
            <input
              type="text"
              placeholder="Google map Url"
              className="w-full p-2"
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
            />
          </label>
          <div className="p-2 bg-white text-base flex-auto rounded flex flex-col gap-2">
            <label htmlFor="type">Select Circuit Type</label>
            <select
              name="type"
              id="type"
              className="w-full p-2 bg-gray-200 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Automotive">Automotive</option>
              <option value="Kart">Kart</option>
              <option value="Automotive & Kart">Automotive & Kart</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-auto flex flex-col justify-center items-center gap-2">
              <label className="bg-white p-2 w-full rounded flex justify-center items-center">
                Upload Images (max 5)
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-300 rounded ml-2 text-sm px-2"
                />
              </label>
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    className="w-[18vw] h-[18vw] object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Upload thumbnail */}
            <div className="flex-auto flex flex-col justify-center items-center gap-2">
              <label className="bg-white p-2 w-full rounded flex justify-center items-center">
                Upload Thumbnail (1 file only)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="bg-gray-300 rounded ml-2 text-sm px-2"
                />
              </label>
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="w-[20vw] h-[20vw] object-cover rounded"
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={handleCreateCircuit}
              className="text-lg font-bold w-60 text-white px-4 py-2 bg-green-500 hover:rounded-2xl duration-300 ease-in-out cursor-pointer"
            >
              Create Circuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
