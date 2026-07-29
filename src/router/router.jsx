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

      }
    ]
  }
]);

export default router;