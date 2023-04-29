import React from "react";

const AdminViewMainList = ({
  data,
  buttonColor,
  buttonText = "View Details",
  activeType,
  setActiveType,
  listType = "teachersTable",
}) => {
  return (
    <>
      <ul className="item-details-list-ul">
        {data.map((item) => {
          return <li className="item-details-list-li">{item}</li>;
        })}
      </ul>
      <div
        className={"customize-btn w-100 btn btn-" + buttonColor}
        onClick={() => setActiveType(listType)}
      >
        {buttonText}
      </div>
    </>
  );
};

export default AdminViewMainList;
