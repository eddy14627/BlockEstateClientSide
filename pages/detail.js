import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useContractRead, useSigner } from "@thirdweb-dev/react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  DetailEight,
  DetailFive,
  DetailFour,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";

import { Loader } from "../PageComponents/Components";

import { useStateContext } from "../context";

const detail = () => {
  const signer = useSigner();
  const [property, setProperty] = useState();
  const [parsedReviews, setParsedReviews] = useState();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const {
    address,
    contract,
    addReviewFunction,
    getProductReviewsFunction,
    likeReviewFunction,
    buyPropertyFunction,
    getPropertyFunction,
    getPropertiesData,
    updatePriceFunction,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  //GET PROPERTY DATA
  const fetchProperty = async () => {
    const data = await getPropertyFunction(query.property);
    const dataReviews = await getProductReviewsFunction(query.property);
    const dataProperties = await getPropertiesData();
    setProperty(data);
    setParsedReviews(dataReviews);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  //ADD REVIEW
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    setCommentLoading(true);
    const data = await addReviewFunction({
      ...review,
      productID: property.productID,
    });
    setCommentLoading(false);
  };

  //LIKE REVIEW
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: 0,
  });
  const likeReviewCall = async () => {
    const data = await likeReviewFunction({
      reviewIndex: likeReviews.reviewIndex,
      productID: property.productID,
    });
  };

  //BUY PROPERTY
  const buying = {
    productID: property?.productID,
    amount: property?.price,
  };
  const buyingProperty = async () => {
    setBuyLoading(true);
    const balance = await signer?.getBalance();
    const balanceEther = ethers.utils.formatEther(balance);
    if (balanceEther < property?.price) {
      setBuyLoading(false);
      alert("Insufficient balance");
    } else await buyPropertyFunction(buying);
    setBuyLoading(false);
  };

  //UPDATE PRICE
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    productID: property?.productID,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    const data = await updatePriceFunction({
      ...updatePropertyPrice,
      productID: property?.productID,
    });
    setUpdatePriceLoading(false);
    window.location.reload();
  };

  console.log("Property: ", property);
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <DetailOne />

      <DetailTwo
        property={property}
        parsedReviews={parsedReviews}
        setLikeReviews={setLikeReviews}
        likeReviewCall={likeReviewCall}
        buyingProperty={buyingProperty}
        address={address}
        isLoading={isLoading}
        buyLoading={buyLoading}
      />

      <DetailThree properties={properties} />
      <DetailFive />
      <DetailSix />
      <DetailSeven
        property={property}
        setUpdatePropertyPrice={setUpdatePropertyPrice}
        updatepropertyPrice={updatepropertyPrice}
        updatePriceLoading={updatePriceLoading}
      />
      <DetailEight
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />

      <Footer />
      <Copyright />
    </div>
  );
};

export default detail;
