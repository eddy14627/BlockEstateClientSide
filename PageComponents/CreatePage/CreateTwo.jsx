import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Link from "next/link";
//INTERNAL IMPORT
import { Loader } from "../Components";
import { CreateThree } from ".";
import { useStateContext } from "../../context";
import { checkIfImage } from "../../utils";
import { useRouter } from "next/router";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "Commercial",
  "Country",
];

const CreateTwo = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imgHash, setImgHash] = useState("");
  const [file, setFile] = useState(null);
  const [diplayImg, setDiplayImg] = useState(null);
  const [fileName, setFileName] = useState("Upload Image");

  const { address, createPropertyFunction } = useStateContext();

  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
  });

  const handleFormFieldChange = (fileName, e) => {
    setForm({ ...form, [fileName]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    form.images = imgHash;
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        if (imgHash) {
          await createPropertyFunction({
            ...form,
            images: imgHash,
            price: ethers.utils.parseUnits(form.price, 18),
          });
          setIsLoading(false);
        }
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, images: "" });
        setIsLoading(false);
      }
    });
  };

  const uploadToPinata = async () => {
    setFileName("Image Uploading...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `afa9d784d697660c47b0`,
            pinata_secret_api_key: `9f1e9a344069a388878a1e1bf8ee02038b3eebec5535f7ed4a2b13f9ef13aebf`,
            "Content-Type ": "multipart/form-data",
          },
        });
        const imghash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setImgHash(imghash);
        setFileName("Image Uploaded");
        return imgHash;
      } catch (error) {
        alert("Unable to upload image to Pinata");
        return null;
      }
    }
    return null;
  };

  const retrieveFile = (event) => {
    const data = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(event.target.files[0]);

      if (event.target.files && event.target.files[0]) {
        setDiplayImg(URL.createObjectURL(event.target.files[0]));
      }
    };

    event.preventDefault();
  };

  return (
    <>
      <div class="creat-collection-area pt--80">
        <div class="container">
          <div class="row g-5 ">
            <div class="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              <div class="collection-single-wized banner">
                <label class="title required">Property image</label>

                <div class="create-collection-input logo-image">
                  <div class="logo-c-image logo">
                    <img
                      id="rbtinput1"
                      src={diplayImg || "/profile/profile-01.jpg"}
                      alt="Profile-NFT"
                    />
                    <label for="fatima" title="No File Choosen">
                      <span class="text-center color-white">
                        <i class="feather-edit"></i>
                      </span>
                    </label>
                  </div>
                  <div class="button-area">
                    <div class="brows-file-wrapper">
                      <input
                        name="fatima"
                        id="fatima"
                        type="file"
                        onChange={retrieveFile}
                      />
                    </div>
                  </div>
                </div>
                {file && (
                  <Link
                    href="#"
                    onClick={() => uploadToPinata()}
                    class="btn btn-primary-alta btn-large"
                  >
                    <button>{fileName}</button>
                  </Link>
                )}
              </div>
            </div>

            <div class="col-lg-7">
              <div class="create-collection-form-wrapper">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="name" class="title required">
                        Property Title
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="name"
                          class="name"
                          type="text"
                          required
                          placeholder="propertyTitle"
                          onChange={(e) =>
                            handleFormFieldChange("propertyTitle", e)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="url" class="title">
                        Image
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="url"
                          class="url"
                          type="text"
                          required
                          placeholder={fileName}
                          onChange={(e) => handleFormFieldChange("images", e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="collection-single-wized">
                      <label class="title">Category</label>
                      <div class="create-collection-input">
                        <div class="nice-select mb--30" tabindex="0">
                          <span class="current">Add Category</span>
                          <ul class="list">
                            {categories.map((el, i) => (
                              <li
                                key={i + 1}
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    category: el,
                                  })
                                }
                                data-value="Housing"
                                class="option"
                              >
                                {el}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="collection-single-wized">
                      <label for="description" class="title">
                        Description
                      </label>
                      <div class="create-collection-input">
                        <textarea
                          id="description"
                          class="text-area"
                          placeholder="description"
                          onChange={(e) =>
                            handleFormFieldChange("description", e)
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="earning" class="title">
                        Price
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="earning"
                          class="url"
                          type="number"
                          placeholder="price"
                          onChange={(e) => handleFormFieldChange("price", e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="collection-single-wized">
                      <label for="wallet" class="title">
                        Property Address
                      </label>
                      <div class="create-collection-input">
                        <input
                          id="wallet"
                          class="url"
                          type="text"
                          placeholder="propertyAddress"
                          onChange={(e) =>
                            handleFormFieldChange("propertyAddress", e)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="button-wrapper">
                      <Link
                        href=""
                        onClick={() => handleSubmit()}
                        class="btn btn-primary-alta btn-large"
                      >
                        {isLoading ? <Loader /> : "Create"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateThree data={form} />
    </>
  );
};

export default CreateTwo;
