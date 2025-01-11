import { useState } from "react";
import PropTypes from "prop-types";
import PersonalInfoResume from "./personalInfoResume";
import PurchaseFinalInfo from "./purchaseFinalInfo";
import PaymentInfo from "./paymentInfo";

export default function FinishPurchaseFromShoppingCart({
  userInfo,
  handleUserInfo,
  shoppingCart,
}) {
  const [sections, setSections] = useState({
    personalInfo: true,
    paymentInfo: false,
    finalInfo: false,
  });

  return (
    <div className="flex flex-col min-h-[640px] w-full items-center bg-gray-200">
      <div
        className={`flex flex-col rounded w-[90%] items-center p-4 ${
          (sections.personalInfo || sections.paymentInfo) && "bg-white"
        } gap-10 pt-10`}
      >
        {sections.personalInfo ? (
          <PersonalInfoResume
            userInfo={userInfo}
            handleUserInfo={handleUserInfo}
            setSections={setSections}
          />
        ) : sections.paymentInfo ? (
          <PaymentInfo handleUserInfo={handleUserInfo} setSections={setSections} userInfo={userInfo} />
        ) : (
          <PurchaseFinalInfo userInfo={userInfo} shoppingCart={shoppingCart} setSections={setSections} />
        )}
      </div>
    </div>
  );
}

FinishPurchaseFromShoppingCart.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handleUserInfo: PropTypes.func.isRequired,
  shoppingCart: PropTypes.array.isRequired,
};
