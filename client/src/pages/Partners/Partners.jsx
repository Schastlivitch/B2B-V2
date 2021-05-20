import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PartnerCard from "../../components/PartnerCard/PartnerCard";

const Partners = () => {

  const dispatch = useDispatch()

  const currenUser = useSelector(state => state.user)
  const allBars = useSelector(state => state.bars)
  const allBrews = useSelector(state => state.brews)


  return (
    <div style={{backgroundImage:'url(images/background1.jpg)', height:'100vh'}} className="pt-4">
      <div className="album py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              currenUser?.role === 'bar' ?
              allBrews.map(brew => {
                return ( <PartnerCard key={brew._id} partner={brew}/> )
              })
              :
              allBars.map(bar => {
                return ( <PartnerCard key={bar._id} partner={bar}/> )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partners;
