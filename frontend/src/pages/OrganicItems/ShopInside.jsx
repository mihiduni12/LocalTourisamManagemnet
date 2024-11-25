import React, { useEffect, useState } from "react";
import Products from "../../images/Organic Items/food6.jpg";
import Header from "../../components/Header/Header";
import { useParams } from "react-router";
import GradientOpen3 from "../../components/Organic Items/GradientOpen3";
import { motion } from "framer-motion";
import "./product.css";
import Cookies from 'js-cookie';
import axios from "axios";
import Footer from "../../components/Footer/Footer";

export let GlobalproductsInCart;
export let GlobalonQuantityChange;
export let GlobalonProductRemove;

const ShopInside = ({ nuts, fetchNuts, snacks, fetchSnacks, sweetners, fetchSweetners, fetchCartItems, cartItems }) => {
  const param = useParams();
  const [items, setItems] = useState([]);
  const [viewProducts, setProductItem] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (param.id === "Nuts & Seeds") {
      fetchNuts();
    }
    else if (param.id === "Snacks") {
      fetchSnacks();
    }
    else if (param.id === "Sweetners") {
      fetchSweetners();
    }
  }, [param.id]); // param.id as dependency

  useEffect(() => {
    if (param.id === "Nuts & Seeds") {
      setItems(nuts);
    }
    else if (param.id === "Snacks") {
      setItems(snacks);
    }
    else if (param.id === "Sweetners") {
      setItems(sweetners);
    }
  }, [nuts, snacks, sweetners, param.id]); // nuts, snacks, sweetners as dependencies

  const viewItem = async (id) => {
    if (id === null) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5555/api/products/${id}`);
      setProductItem(response.data.data);
    } catch (error) {
      console.error("Error fetching Nuts category:", error);
    }
  }

  // useEffect(() => {
  //     fetchCartItems();
  //     setCart(cartItems);
  // }, []);


  // const handleEnter = (event) => {
  //     if (event.code === "Enter") {
  //         handleClick();
  //     }
  // };

  // const handleClick = (id) => {
  //   if (id !== "") {
  //       fetch(`http://localhost:5555/list`, {
  //           method: "POST",
  //           body: JSON.stringify({ productId: id }),
  //           headers: {
  //               "Content-type": "application/json",
  //           },
  //       })
  //       .then((res) => res.json())
  //       .then((data) => {
  //           console.log(data);  // Log the response data, not 'id'
  //           // Assuming setCart is a function that updates the cart state
  //           // Make sure setCart is defined and does what you intend
  //           setCart();  
  //       })
  //       .catch((error) => {
  //           console.error(error);
  //           // Handle any error that occurred during the fetch
  //       });
  //   } else {
  //       alert("Input is Empty");
  //   }
  // };


  // const handleDoubleClick = (id) => {
  //     {
  //         fetch(`http://localhost:5000/list/${id}`, {
  //             method: "DELETE",
  //         })
  //             .then((res) => res.json())
  //             .then((data) => {
  //                 console.log(data);
  //                 getCart();
  //             });
  //     }
  // };

  // for cart

  const cartFromCookie = Cookies.get('shopping-cart');

  // Use the cart from cookies if it exists, otherwise use the cart from local storage
  const initialCart = cartFromCookie && cartFromCookie !== 'undefined'
    ? JSON.parse(cartFromCookie)
    : [];

  const [productsInCart, setProducts] = useState(initialCart);

  useEffect(() => {
    const interval = setInterval(() => {
      const cartData = JSON.stringify(productsInCart);
      Cookies.set("shopping-cart", cartData);
    }, 1000); // Set cookie every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [productsInCart]);
  GlobalproductsInCart = productsInCart;

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([
      ...productsInCart,
      newProduct,
    ]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };
  GlobalonQuantityChange = onQuantityChange;

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      console.log(setProducts)

      const productsIndex =
        oldState.findIndex(
          (item) =>
            item.id === product.id
        );


      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };
  GlobalonProductRemove = onProductRemove;

  console.log(productsInCart)

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
    <div className="bg-[#fdfafa]">
      <Header
        Cart={cartItems} fetchCart={fetchCartItems}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 1 / 10,
        }}
      >
        <div className="pt-[115px]">
          <div className="h-[500px] w-[100%] mt-[-1px] border-black bg-[#edf3ce] ">
            <div className="absolute bg-[#deb78379] h-[455px] w-[720px] mt-[40px] ml-[-70px] rounded-[45px] ">
              <img
                src={Products}
                className="absolute h-[400px] rounded-[25px] mt-[26px] ml-[45px]"
              />
            </div>
            <div className="ml-[730px] pt-[100px] w-[540px] font-Coda font-light text-[#848a39]">
              <div className="border-[9px] border-[#848a39] p-[13px] rounded-[17px]">
                <h1 className="text-[51pt] border-b-[2px]">
                  {param.id}
                  <br />
                  Species
                </h1>
                <p className="mt-[25px]">
                  They are rich in vitamins, minerals, and antioxidants, and have
                  a natural flavor and color.
                </p>
              </div>
            </div>
          </div>
        </div>
        <GradientOpen3 />
        <div>
          <section className="py-16 z-30 font-Barlow font-bold pt-[30px]">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[20px] max-w-sm mx-auto md:max-w-none md:max-0">
                {items?.length ? (
                  items.map((items) => (
                    <div className="border-[2px] rounded-[12px] bg-[#ebedec]  border-[#ffffff] h-[450px] w-[270px] mb-4 overflow-hidden group transition hover:border-[#ffffff]">
                      <div class="product-box">
                        <div class="product-item">
                          <div className="w-[180px] mx-auto h-[330px] flex justify-center items-center ">
                            <img
                              className="max-h-[280px] group-hover:scale-110 transition duration-300"
                              src={
                                "http://localhost:5555/products/" +
                                "/" +
                                items.image
                              }
                              alt=""
                            />
                          </div>
                          <div class="overlay-c"></div>
                          <div class="product-desc h-[180px] border-b-[2px] border-[#000]">
                            <button onClick={() => addProductToCart(items)}>
                              <div className="bg-white w-[50px] h-[50px] pt-[10px] ml-[-65px] mx-auto rounded-[7px] hover:bg-[#eaffdf]">
                                <i
                                  class="fa-duotone fa-cart-circle-plus fa-2xl mt-[20px]"
                                  style={{
                                    "--fa-primary-color": "#046604",
                                    "--fa-secondary-color": "#046604",
                                  }}
                                ></i>
                              </div>
                            </button>
                            <div className="absolute bg-white w-[50px] h-[50px] pt-[14px] mt-[-50px] ml-[135px] mx-auto rounded-[7px] hover:bg-[#eaffdf]">
                              <button onClick={() => { toggleModal(), viewItem(items._id) }} >
                                <i
                                  class="fa-duotone fa-circle-info fa-2xl"
                                  style={{
                                    "--fa-primary-color": "#006515",
                                    "--fa-secondary-color": "#006515",
                                  }}
                                ></i>
                              </button>
                            </div>
                          </div>


                          <div className="bg-white rounded-[7px] mt-0 text-[15pt] font-Barlow font-bold text-left pl-[20px] h-[110px] text-[#000] mx-[7px]">
                            <p className="absolute mt-[10px] mb-[3px]">
                              {items.name}
                            </p>
                            <div className="absolute font-normal mt-[40px]">
                              From
                              {items.discPrice === '' ? (
                                <p className="font-bold ml-[0px]">Rs:{items.price}</p>
                              ) : (
                                <p className="font-bold ml-[0px] line-through">Rs:{items.price}</p>
                              )}
                              <p className="top-0 ml-[110px] mt-[30px] font-normal absolute">{items.discPrice}</p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <td
                    className="border px-4 py-2 text-center "
                    rowSpan={10}
                    colSpan={10}
                  >
                    No Data Found
                  </td>
                )}
                {modal && (
                  <div>
                    <div className="w-[100vw] h-[100vw] top-0 left-0 right-0 bottom-0 fixed z-4">
                      <div onClick={toggleModal} className="w-[100vw] h-[100vw] fixed bg-[#ececec56] top-0 left-0 right-0 bottom-0 "></div>
                      {viewProducts.map((items) => (
                        <div className="absolute top-[25%] left-[48.5%] translate-x-[-50%] translate-y-[-50%] leading-[1.4] bg-[rgb(237,237,237)] px-[28px] py-[14px] rounded-[13px] border-[2px] border-[#fff] max-w-[650px] max-h-[400px] text-[#000]">
                          <div className="flex">
                            <img
                              className="h-[290px] mt-[10px] p-[5px] transition duration-300 border rounded-[12px] bg-white"
                              src={
                                "http://localhost:5555/products/" +
                                items.image
                              }
                              alt=""
                            />
                            <div className="ml-[30px] mt-[10px] ">
                              <h2 className="w-[330px] font-FiraSans font-bold text-[23px] mb-[20px]">{items.nameDesc}</h2>
                              <label className="font-normal">Price : </label>
                              {items.discPrice === '' ? (
                                <p className="font-FiraSans font-normal text-[19px]">Rs:{items.price}</p>
                              ) : (
                                <p className="font-FiraSans font-normal text-[19px] line-through">Rs:{items.price}</p>
                              )}
                              <p className="mt-[5px] font-FiraSans font-normal text-[19px] text-justify">{items.discPrice}</p>

                            </div>
                          </div>
                          <p className="font-normal">
                            {items.Desc}
                          </p>
                          <button className="absolute top-0 right-0 mr-[20px] mt-[17px] text-[33px]" onClick={toggleModal}>
                            <i class="fa-duotone fa-rectangle-xmark" style={{ "--fa-primary-color": "#d3bf05", "--fa-secondary-color": "#d3bf05", }}></i>
                          </button>

                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default ShopInside;
