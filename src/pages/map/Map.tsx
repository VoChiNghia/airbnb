import React,{useEffect, useState} from "react";
import MapModal from "../../component/MapModal";




type Props = {};

const Map2 = (props: Props) => {
 

  return (
    <div className="map" style={{ height: '100vh', width: '100%' }}>
      <MapModal/>
    </div>
  );
};

export default Map2;