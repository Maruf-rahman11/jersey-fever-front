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
      }
    ]
  },
  {
    path: '/adminDashboard',
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <AllProducts></AllProducts>
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
      }
    ]
  }
]);

export default router;