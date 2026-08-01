import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layouts/HomeLayout';
import Home from '../Pages/Home';
import ProductDetails from '../Pages/ProductDetails';
import AllProducts from '../Pages/AllProducts';
import AdminLayout from '../Layouts/AdminLayout';
import AddProduct from '../Admin dashboard/AddProduct';
import Cart from '../Pages/Cart';
import DeliveryPage from '../Pages/DeliveryPage';
import AllItems from '../Admin dashboard/AllItems';
import ItemDetails from '../Admin dashboard/ItemDetails';
import UpdateItem from '../Admin dashboard/UpdateItem';
import AllOrders from '../Admin dashboard/AllOrders';
import Jersey from '../Pages/Jersey';
import Trousers from '../Pages/Trousers';
import Accessory from '../Pages/Accessory';
import Sneakers from '../Pages/Sneakers';
import OrderDetails from '../Admin dashboard/OrderDetails';
import PrivateRoute from '../Auth/PrivateRoute';
import Login from '../Auth/LogIn';
import PreOrders from '../Admin dashboard/PreOrders';
import Tshirt from '../Pages/Tshirt';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/productDetails',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/allProducts',
        element: <AllProducts></AllProducts>
      },
      {
        path: '/ProductDetails/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/deliveryPage',
        element: <DeliveryPage></DeliveryPage>
      },
      {
        path: '/allJerseys',
        element: <Jersey></Jersey>
      },
      {
        path: '/allTrousers',
        element: <Trousers></Trousers>
      },
      {
        path: '/allAccessories',
        element: <Accessory></Accessory>
      },
      {
        path: '/tShirts',
        element: <Tshirt></Tshirt>
      },
      {
        path: '/allSneakers',
        element: <Sneakers></Sneakers>
      },
      {
        path:'/logIn',
        element: <Login></Login>
      }
    ]
  },
  {
    path: '/adminDashboard',
    element: <PrivateRoute><AdminLayout></AdminLayout></PrivateRoute> ,
    children: [
      {
        index: true,
        element: <AllItems></AllItems>
      },
      {
        path: '/adminDashboard/allItems',
        element: <AllItems></AllItems>
      },
      {
        path: '/adminDashboard/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/adminDashboard/itemDetails/:id',
        element: <ItemDetails></ItemDetails>
      },
      {
        path: '/adminDashboard/updateItem/:id',
        element: <UpdateItem></UpdateItem>
      },
      {
        path: '/adminDashboard/allOrders',
        element: <AllOrders></AllOrders>
      },
      {
        path: '/adminDashboard/preOrders',
        element: <PreOrders></PreOrders>
      },
      {
        path: '/adminDashboard/orderDetails/:id',
        element: <OrderDetails></OrderDetails>
      }
    ]
  }
]);

export default router;