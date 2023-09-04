import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { CreateOne } from "../PageComponents/CreatePage";
import {
  Header,
  Footer,
  Copyright,
  Loader,
} from "../PageComponents/Components";
import { useStateContext } from "../context";
import { checkIfImage } from "../utils";
import axios from "axios";

const categories = [
  "Housing",
  "Rental",
  "Farmhouse",
  "Office",
  "commercial",
  "country",
];

const Update = () => {
  const router = useRouter();
  const { query } = router;

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [diplayImg, setDiplayImg] = useState(null);
  const [fileName, setFileName] = useState("Upload Image");

  const { updatePropertyFunction } = useStateContext();

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
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        await updatePropertyFunction({
          ...form,
          productId: query.property * 1,
        });
        setIsLoading(false);
        window.location.reload();
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, images: "" });
      }
    });
  };

  const uploadToPinata = async () => {
    setFileName("Image Uploading...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("h1");
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
        console.log("h2");
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        console.log(ImgHash);
        setForm({ ...form, images: ImgHash });
        setFileName("Image Uploaded");
        return ImgHash;
      } catch (error) {
        alert("Unable to upload image to Pinata");
      }
    }
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
    <div class="template-color-1 nft-body-connect">
      <Header />
      <CreateOne title="Update Property" />
      <div class="creat-collection-area pt--80">
        <div class="container">
          <div class="row g-5 ">
            <div class="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              <div class="collection-single-wized banner">
                <label class="title required">Logo image</label>

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
                  <a
                    onClick={() => uploadToPinata()}
                    class="btn btn-primary-alta btn-large"
                  >
                    {fileName}
                  </a>
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
                    <div class="BlockEstate-information mb--30">
                      <div class="single-notice-setting">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="themeSwitch"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="themeSwitch" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Explicit & sensitive content</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="button-wrapper">
                      <a
                        onClick={() => handleSubmit()}
                        class="btn btn-primary-alta btn-large"
                      >
                        {isLoading ? <Loader /> : "Update"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default Update;