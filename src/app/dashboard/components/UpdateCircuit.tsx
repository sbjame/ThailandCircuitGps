"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";

type CircuitProps = {
  _id: string;
  name: string;
  length_km: string;
  type: string;
  location_url: string;
  images: string[];
  thumbnail: string;
  weather_daily?: {
    maxTemp_c: number;
    minTemp_c: number;
    maxTemp_f: number;
    minTemp_f: number;
    avgTemp_c: number;
    avgTemp_f: number;
    maxWind_mps: number;
    chanceOfRain: number;
  };
};

export default function UpdateCircuit() {
  const [circuits, setCircuits] = useState<CircuitProps[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitProps | null>(
    null
  );
  const [viewType, setViewType] = useState<
    "images" | "thumbnail" | "weather" | "edit" | null
  >(null);
  const [formData, setFormData] = useState<CircuitProps | null>(null);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [removeThumbnail, setRemoveThumbnail] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const [weatherUpdataStatus, setWeatherUpdateStatus] = useState({
    status: "Manual Weather Update",
    color: "text-white",
  });

  const fetchCircuit = async () => {
    try {
      const res = await axiosInstance.get<CircuitProps[]>("/circuit"); // ระบุ type ของ data
      setCircuits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManualWeatherUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get<{ message: string }>(
        "/weather/update",
        {
          headers: { authorization: token },
        }
      );

      setWeatherUpdateStatus({
        status: res.data.message,
        color: "text-red-700",
      });

      setTimeout(() => {
        setWeatherUpdateStatus({
          status: "Manual Weather Update",
          color: "text-white",
        });
      }, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCircuit();
  }, []);

  const handleEditClick = (circuit: CircuitProps) => {
    setSelectedCircuit(circuit);
    setFormData({ ...circuit });
    setViewType("edit");
    setRemovedImages([]);
    setRemoveThumbnail(false);
    setNewImages([]);
    setNewThumbnail(null);
  };

  const handleFormChange = <K extends keyof CircuitProps>(
    field: K,
    value: CircuitProps[K]
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formData) return;
    const token = localStorage.getItem("token");

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("length_km", formData.length_km);
      form.append("type", formData.type);
      form.append("location_url", formData.location_url);

      //! ส่งรูปที่ถูกลบ
      if (removedImages.length > 0) {
        form.append("removeImages", JSON.stringify(removedImages));
      }

      //! ส่งไฟล์ใหม่
      newImages.forEach((file) => form.append("images", file));

      // !thumbnail
      if (removeThumbnail) form.append("removeThumbnail", "true");
      if (newThumbnail) form.append("thumbnail", newThumbnail);

      await axiosInstance.patch(`/circuit/update/${formData._id}`, form, {
        headers: { authorization: token },
      });

      //! update frontend state
      setCircuits((prev) =>
        prev.map((c) =>
          c._id === formData._id
            ? {
                ...formData,
                images: [
                  ...formData.images.filter(
                    (img) => !removedImages.includes(img)
                  ),
                  ...newImages.map((file) => URL.createObjectURL(file)),
                ],
                thumbnail: newThumbnail
                  ? URL.createObjectURL(newThumbnail)
                  : removeThumbnail
                  ? ""
                  : formData.thumbnail,
              }
            : c
        )
      );

      setSelectedCircuit(null);
      setViewType(null);
      setRemovedImages([]);
      setRemoveThumbnail(false);
      setNewImages([]);
      setNewThumbnail(null);
      fetchCircuit();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="mx-8 my-8">
      <div className="flex justify-between w-full bg-gray-300">
        <h1 className="text-2xl p-2 rounded-t">Circuit List</h1>
        <div className="relative">
          <button
            onClick={fetchCircuit}
            className="m-2 px-4 py-1 bg-green-500 text-white font-bold cursor-pointer hover:rounded-2xl duration-300"
          >
            Reload
          </button>
          <button
            onClick={fetchManualWeatherUpdate}
            className={`m-2 px-4 py-1 bg-green-500 ${weatherUpdataStatus.color} font-bold cursor-pointer hover:rounded-2xl duration-300`}
          >
            {weatherUpdataStatus.status}
          </button>
        </div>
      </div>
      <div className="p-2 bg-gray-200 overflow-y-auto max-h-[92vh]">
        <table className="w-full">
          <thead className="bg-amber-500">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Length(km)</th>
              <th>type</th>
              <th>Google Map Url</th>
              <th>Images</th>
              <th>Thumbnail</th>
              <th>Weather data</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 text-center">
            {circuits.map((circuit) => (
              <tr
                key={circuit._id}
                className="text-sm border-b border-gray-400"
              >
                <td className="p-2">{circuit._id}</td>
                <td>{circuit.name}</td>
                <td>{circuit.length_km}</td>
                <td>{circuit.type}</td>
                <td>
                  <a
                    href={circuit.location_url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {circuit.location_url}
                  </a>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setSelectedCircuit(circuit);
                      setViewType("images");
                    }}
                    className="bg-amber-500 px-4 py-1 text-white font-bold cursor-pointer hover:rounded-2xl duration-300"
                  >
                    View
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setSelectedCircuit(circuit);
                      setViewType("thumbnail");
                    }}
                    className="bg-amber-500 px-4 py-1 text-white font-bold cursor-pointer hover:rounded-2xl duration-300"
                  >
                    View
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setSelectedCircuit(circuit);
                      setViewType("weather");
                    }}
                    className="bg-amber-500 px-4 py-1 text-white font-bold cursor-pointer hover:rounded-2xl duration-300"
                  >
                    View
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(circuit)}
                    className="px-4 py-1 bg-blue-500 text-white hover:rounded-2xl duration-300 font-bold cursor-pointer"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedCircuit && viewType && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
              <button
                onClick={() => {
                  setSelectedCircuit(null);
                  setViewType(null);
                }}
                className="absolute top-2 right-2 text-red-600 font-bold cursor-pointer"
              >
                ✕
              </button>

              {/* ========== FORM EDIT ========== */}
              {viewType === "edit" && formData && (
                <div>
                  <h2 className="text-lg font-bold mb-2">
                    Edit Circuit ({formData.name})
                  </h2>
                  <div className="flex flex-col gap-2">
                    <input
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="border p-1 rounded"
                      placeholder="Name"
                    />
                    <input
                      value={formData.length_km}
                      onChange={(e) =>
                        handleFormChange("length_km", e.target.value)
                      }
                      className="border p-1 rounded"
                      placeholder="Length (km)"
                    />
                    <label className="flex gap-2 items-center">
                      Type:
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          handleFormChange("type", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      >
                        <option value="">-- Select Type --</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Kart">Kart</option>
                        <option value="Automotive & Kart">
                          Automotive & Kart
                        </option>
                      </select>
                    </label>
                    <input
                      value={formData.location_url}
                      onChange={(e) =>
                        handleFormChange("location_url", e.target.value)
                      }
                      className="border p-1 rounded"
                      placeholder="Google Map Url"
                    />

                    {/* ========== IMAGES UPLOAD & LIST ========== */}
                    <div>
                      <p className="font-semibold">Images</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.images?.map((img, idx) => (
                          <div key={idx} className="relative">
                            <Image
                              src={img} // URL ชั่วคราว
                              alt={`image-${idx}`}
                              className="h-20 w-20 object-cover rounded border"
                              unoptimized
                            />
                            {/* <img
                              src={img}
                              alt={`image-${idx}`}
                              className="h-20 w-20 object-cover rounded border"
                            /> */}
                            <button
                              type="button"
                              onClick={() => {
                                setRemovedImages([...removedImages, img]);
                                handleFormChange(
                                  "images",
                                  formData.images.filter((_, i) => i !== idx)
                                );
                              }}
                              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ))}

                        {formData.images.length + newImages.length < 5 && (
                          <label className="h-20 w-20 border-2 border-dashed flex items-center justify-center text-gray-500 cursor-pointer rounded">
                            +
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files) {
                                  const filesArray = Array.from(e.target.files);
                                  const availableSlots =
                                    5 -
                                    (formData.images.length + newImages.length);
                                  setNewImages([
                                    ...newImages,
                                    ...filesArray.slice(0, availableSlots),
                                  ]);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* preview ไฟล์ใหม่ */}
                      {newImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newImages.map((file, idx) => (
                            <Image
                              key={idx}
                              src={URL.createObjectURL(file)} // URL ชั่วคราว
                              alt={`new-${idx}`}
                              className="h-20 w-20 object-cover rounded border"
                              unoptimized
                            />
                            // <img
                            //   key={idx}
                            //   src={URL.createObjectURL(file)}
                            //   alt={`new-${idx}`}
                            //   className="h-20 w-20 object-cover rounded border"
                            // />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ========== THUMBNAIL UPLOAD ========== */}
                    <div>
                      <p className="font-semibold">Thumbnail</p>
                      {formData.thumbnail && !removeThumbnail ? (
                        <div className="relative inline-block">
                          <Image
                            src={formData.thumbnail}
                            alt="thumbnail"
                            className="h-24 object-cover rounded"
                            unoptimized
                          />
                          {/* <img
                            src={formData.thumbnail}
                            alt="thumbnail"
                            className="h-24 object-cover rounded"
                          /> */}
                          <button
                            type="button"
                            onClick={() => {
                              setRemoveThumbnail(true);
                              handleFormChange("thumbnail", "");
                            }}
                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500">No thumbnail</p>
                      )}
                      <div className="mt-2">
                        <input
                          placeholder="Choose file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setNewThumbnail(e.target.files[0]);
                            }
                          }}
                        />
                        {newThumbnail && (
                          <Image
                            src={URL.createObjectURL(newThumbnail)}
                            alt="preview-thumbnail"
                            className="h-24 rounded object-cover mt-2"
                            unoptimized
                          />
                          // <img
                          //   src={URL.createObjectURL(newThumbnail)}
                          //   alt="preview-thumbnail"
                          //   className="h-24 object-cover rounded border mt-2"
                          // />
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded font-bold"
                  >
                    Save
                  </button>
                </div>
              )}

              {/* ========== IMAGE VIEW ========== */}
              {viewType === "images" && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Images</h2>
                  {selectedCircuit.images?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCircuit.images.map((img) => (
                        <Image
                          key={img}
                          src={img}
                          alt="circuit"
                          className="rounded"
                          unoptimized
                        />
                        // <img
                        //   key={img}
                        //   src={img}
                        //   alt="circuit"
                        //   className="rounded"
                        // />
                      ))}
                    </div>
                  ) : (
                    <p>No images</p>
                  )}
                </div>
              )}

              {/* ========== THUMBNAIL VIEW ========== */}
              {viewType === "thumbnail" && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Thumbnail</h2>
                  {selectedCircuit.thumbnail ? (
                    <Image
                      src={selectedCircuit.thumbnail}
                      alt="thumbnail"
                      className="rounded w-full"
                      unoptimized
                    />
                    // <img
                    //   src={selectedCircuit.thumbnail}
                    //   alt="thumbnail"
                    //   className="rounded w-full"
                    // />
                  ) : (
                    <p>No thumbnail</p>
                  )}
                </div>
              )}

              {/* ========== WEATHER VIEW ========== */}
              {viewType === "weather" && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Weather Data</h2>
                  {selectedCircuit.weather_daily ? (
                    <div className="flex flex-col gap-1">
                      <p>
                        Min Temp: {selectedCircuit.weather_daily.minTemp_c} °C
                      </p>
                      <p>
                        Max Temp: {selectedCircuit.weather_daily.maxTemp_c} °C
                      </p>
                      <p>
                        Avg Temp: {selectedCircuit.weather_daily.avgTemp_c} °C
                      </p>
                      <p>
                        Min Temp: {selectedCircuit.weather_daily.minTemp_f} °F
                      </p>
                      <p>
                        Max Temp: {selectedCircuit.weather_daily.maxTemp_f} °F
                      </p>
                      <p>
                        Avg Temp: {selectedCircuit.weather_daily.avgTemp_f} °F
                      </p>
                      <p>
                        Max wind speed:{" "}
                        {selectedCircuit.weather_daily.maxWind_mps} m/s
                      </p>
                      <p>
                        Chance of rain:{" "}
                        {selectedCircuit.weather_daily.chanceOfRain} %
                      </p>
                    </div>
                  ) : (
                    <p>No weather data</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
