import React, { useEffect, useState } from "react";
import ShoppingCartBar from "./ShoppingCartBar";
import Cookies from "js-cookie";

export default function ShoppingCart({ fetchCart, Cart }) {
   

    return (
        <div>
            <ShoppingCartBar/>
            <div className="navbar1">
                <div className="text-4xl float-right mt-[34px] mr-[104px]">
                    <button>
                        <i class="fa-sharp fa-light fa-bag-shopping fa-shake " style={{ color: "#fff5e8" }}></i>
                    </button>
                </div>
            </div>
        </div>
    )
}