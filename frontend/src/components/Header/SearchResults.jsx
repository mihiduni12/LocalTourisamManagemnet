import React, { useState } from "react";


export const SearchResult = ({ result, productId }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div>
      <div
        className="py-[10px] px-[20px] hover:bg-[#efefef]"
        onClick={toggleModal}
      >
        {result}
      </div>
      {modal && (
        <div>
          <div className="w-[100vw] h-[100vw] top-0 left-0 right-0 bottom-0 fixed z-4">
            <div onClick={toggleModal} className="w-[100vw] h-[100vw] fixed bg-[#ececec56] top-0 left-0 right-0 bottom-0 "></div>

            <div className="absolute top-[25%] left-[48.5%] translate-x-[-50%] translate-y-[-50%] leading-[1.4] bg-[rgb(237,237,237)] px-[28px] py-[14px] rounded-[13px] border-[2px] border-[#fff] max-w-[650px] max-h-[400px] text-[#000]">
              <div className="flex">
                <img
                  className="h-[290px] mt-[10px] p-[5px] transition duration-300 border rounded-[12px] bg-white"
                  src={
                    "http://localhost:5555/products/" +
                    productId.image
                  }
                  alt=""
                />
                <div className="ml-[30px] mt-[10px] ">
                  <h2 className="w-[330px] font-FiraSans font-bold text-[23px] mb-[20px]">{productId.nameDesc}</h2>
                  <label className="font-normal">Price : </label>
                  {productId.discPrice === '' ? (
                    <p className="font-FiraSans font-normal text-[19px]">Rs:{productId.price}</p>
                  ) : (
                    <p className="font-FiraSans font-normal text-[19px] line-through">Rs:{productId.price}</p>
                  )}
                  <p className="mt-[5px] font-FiraSans font-normal text-[19px] text-justify">{productId.discPrice}</p>

                </div>
              </div>
              <p className="font-normal">
                {productId.Desc}
              </p>
              <button className="absolute top-0 right-0 mr-[20px] mt-[17px] text-[33px]" onClick={toggleModal}>
                <i class="fa-duotone fa-rectangle-xmark" style={{ "--fa-primary-color": "#d3bf05", "--fa-secondary-color": "#d3bf05", }}></i>
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};