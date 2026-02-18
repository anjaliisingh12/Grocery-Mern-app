import React, { useState, useEffect } from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";
import { axiosInstance } from "../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { isSeller } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isSeller) {
      toast.error("You must be logged in as a seller.");
      return;
    }

    try {
      const formData = new FormData();

      // ✅ DIRECT FIELDS SEND KARO
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      // ✅ IMAGES
      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axiosInstance.post(
        "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Product added successfully!");

        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("ADD PRODUCT ERROR:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file) URL.revokeObjectURL(file);
      });
    };
  }, [files]);

  if (!isSeller) {
    return (
      <div className="flex-1 h-[95vh] flex justify-center items-center">
        <p className="text-xl font-medium text-gray-700">
          You must be logged in as a seller.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} className="cursor-pointer">
                  <img
                    className="max-w-24"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                  />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const updated = [...files];
                      updated[index] = e.target.files[0];
                      setFiles(updated);
                    }}
                  />
                </label>
              ))}
          </div>
        </div>

        <div>
          <label className="text-base font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="text-base font-medium">
            Product Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded resize-none"
          />
        </div>

        <div>
          <label className="text-base font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.path} value={item.path}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5">
          <div className="flex-1">
            <label className="text-base font-medium">
              Product Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="text-base font-medium">
              Offer Price
            </label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;