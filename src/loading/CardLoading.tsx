import React from "react";
import Skeleton from "react-loading-skeleton";

const CardLoading = () => {
  return (
    <div>
      <Skeleton width="100%" height="250px" />
      <Skeleton height="20px" />
      <Skeleton width="200px" height="20px" />
      <Skeleton width="150px" height="20px" />
      <Skeleton width="50px" height="20px" />
    </div>
  );
};

export default CardLoading;
