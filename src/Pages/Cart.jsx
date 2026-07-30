
import { use } from "react";

import { Link } from "react-router";
import { RiEye2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import CartContext from "../Context/CartContext";

const Cart = () => {
  
  const {removeFromCart, myCart} = use(CartContext)

  
console.log(myCart)

  const handleRemove = (id, size) => {
    removeFromCart(id, size);
   
  };

  const total = myCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  if(myCart.length <= 0) return <div className="flex  my-25 flex-col justify-center items-center">
     <p className="flex justify-center items-center mb-5 text-base-content text-4xl">Cart empty!!!</p>
  <Link to={'/'} className="btn cursor-pointer hover:text-amber-50 hover:bg-black">Continue Shopping</Link>
  </div>
 

  return (
    <div className="mt-10">
      {myCart.map(item => (
        <div>
            <div className="flex mx-6  gap-3  items-start " key={item._id + item.size}>
            <img className="aspect-square w-4/12 lg:w-2/12 rounded overflow-hidden border border-orange-600" src={item.image} alt="" srcset="" />
            <div className="flex items-start  w-full justify-between gap-2">
              <div className="text-base-content">
          <p className="text-lg lg:mb-3 font-semibold lg:text-2xl">{item.name} (Size {item.size})</p>
          
          <p className="lg:mb-3 text-sm text-base-content">Price : <span className="text-orange-600"> {item.price}Tk</span> </p>
          {item.edition && <p className="lg:mb-3 text-sm text-base-content">Edition : <span className="text-orange-600">{item.edition}</span></p>}
          {item.season && <p className="lg:mb-3 text-sm text-base-content">Season : <span className="text-orange-600">{item.season}</span></p>}
          </div>
          <div>
             <button className="bg-base-200 text-black p-2 border-orange-600 border rounded cursor-pointer mt-3" onClick={() => handleRemove(item._id, item.size)}>
            <MdDelete />
          </button>
            <p className="text-base-200 border p-1 font-semibold text-center rounded bg-orange-600 mt-6">{item.quantity} </p>
           
          </div>
            </div>
            
          
        </div>
        <div className="flex-1 h-px my-6 mx-4 bg-gray-400"></div>
        </div>
      
      ))}
      {/* <div className="flex-1 h-px mt-10 mx-4 bg-gray-400"></div> */}
      <div className="flex items-center mx-6 mt-2 mb-8 justify-between ">
        <h2 className="lg:text-2xl text-xl font-semibold text-base-content">Total order value :</h2>
        <p className="text-base-content font-semibold lg:text-2xl text-xl">{total}Tk</p>
      </div>
      
      <div className="mx-4 ">
         <Link to={'/deliveryPage'}><button className="bg-orange-600 text-base-200 mx-auto w-full p-3 rounded cursor-pointer my-3">Proceed to Checkout </button></Link>
      </div>
     
    </div>
  );
};

export default Cart;
