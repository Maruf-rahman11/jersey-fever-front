import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  
} from 'firebase/auth';
import app from '../Firebase/firebase.init'




const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const auth = getAuth(app)





  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup properly
  }, [auth]);

  // const allShoes = [
  //   {
  //     id: 1,
  //     name: "AeroFlex Running Pro",
  //     category: "Running",
  //     price: 4500,
  //     discountPrice: 3800,
  //     sizes: [39, 40, 41, 42, 43, 44],
  //     stock: 22,
  //     description: "Lightweight running shoes designed for speed and comfort with breathable mesh and cushioned support.",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLaY1URCAeDy5zDFZ6PzQmbe_1B5ABVTik1Q&s"
  //   },
  //   {
  //     id: 2,
  //     name: "Urban Street Sneakers",
  //     category: "Sneakers",
  //     price: 5200,
  //     discountPrice: 4490,
  //     sizes: [40, 41, 42, 43, 44],
  //     stock: 15,
  //     description: "Casual sneakers with premium build quality, perfect for everyday wear and urban styling.",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2QMnmtw8EK1kXWqszyU5gtWYv55JmU4N2Q&s"
  //   },
  //   {
  //     id: 3,
  //     name: "Classic Leather Boots",
  //     category: "Boots",
  //     price: 7200,
  //     discountPrice: 6500,
  //     sizes: [41, 42, 43, 44, 45],
  //     stock: 10,
  //     description: "Durable full-grain leather boots made for all-day comfort and long-lasting wear.",
  //     image: "https://image.made-in-china.com/2f0j00vgUbPCZMYfzp/Luxury-Winter-Boots-for-Men-Classic-Leather-High-Heels.webp"
  //   },
  //   {
  //     id: 4,
  //     name: "CloudWalk Slides",
  //     category: "Slides",
  //     price: 1200,
  //     discountPrice: 1000,
  //     sizes: [40, 41, 42, 43, 44, 45],
  //     stock: 35,
  //     description: "Soft EVA slides designed for maximum comfort and water resistance.",
  //     image: "https://cdn.shopify.com/s/files/1/0937/5472/0593/files/Sdabf13597888494cbef1fb7141e223776.webp?v=1753599398"
  //   },
  //   {
  //     id: 5,
  //     name: "Velocity Runner X",
  //     category: "Running",
  //     price: 4800,
  //     discountPrice: 4200,
  //     sizes: [39, 40, 41, 42, 43],
  //     stock: 18,
  //     description: "High-performance running shoes with responsive cushioning and anti-slip outsole.",
  //     image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/311911/01/sv01/fnd/EEA/fmt/png/PUMA-x-HYROX-Velocity-NITRO%E2%84%A2-4-Running-Shoes-Men"
  //   },
  //   {
  //     id: 6,
  //     name: "Fusion Sport Sneakers",
  //     category: "Sneakers",
  //     price: 5400,
  //     discountPrice: 4990,
  //     sizes: [40, 41, 42, 43],
  //     stock: 25,
  //     description: "Sporty yet stylish sneakers built with adaptive flexibility and modern aesthetics.",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdK8XKpLVWbWokfQ_qUYVFd0TuqY67SO6wA&s"
  //   },
  //   {
  //     id: 7,
  //     name: "TrailMaster Boots",
  //     category: "Boots",
  //     price: 7800,
  //     discountPrice: 7100,
  //     sizes: [41, 42, 43, 44],
  //     stock: 12,
  //     description: "Rugged boots designed for tough trails, hiking, and outdoor adventures.",
  //     images: [
  //       "https://backwoods.co.nz/image/cache/catalog/trekking%20and%20hiking/Boots/hikeup%2017/Aliexpress_MainImage_5-1000x1000.jpg.webp",
  //       "https://sagarabootmaker.com/cdn/shop/collections/04_Trailmaster.jpg?v=1676300818"
  //     ],
  //     videoUrl: "https://www.youtube.com/embed/ESVLS7iIM2Q?si=i5X6QzrfiSwIGLMu",

  //   },
  //   {
  //     id: 8,
  //     name: "Comfort Cush Slides",
  //     category: "Slides",
  //     price: 1500,
  //     discountPrice: 1300,
  //     sizes: [40, 41, 42, 43, 44],
  //     stock: 40,
  //     description: "Smooth, soft, and ultra-comfortable slides for everyday indoor and outdoor use.",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFK2S2A9rxdPlCAWbCA5p5s-8aKPWbIM3UeA&s"
  //   },
  //   {
  //     id: 9,
  //     name: "PrimeAir Running",
  //     category: "Running",
  //     price: 5000,
  //     discountPrice: 4500,
  //     sizes: [39, 40, 41, 42],
  //     stock: 16,
  //     description: "Premium running shoes featuring supportive heel cushioning and high airflow.",
  //     image: "https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw6a9afb3d/images/large/196989230863-1.jpg"
  //   },
  //   {
  //     id: 10,
  //     name: "Retro Canvas Sneakers",
  //     category: "Sneakers",
  //     price: 3900,
  //     discountPrice: 3200,
  //     sizes: [39, 40, 41, 42, 43],
  //     stock: 20,
  //     description: "Classic canvas sneakers with a modern twist, perfect for casual lifestyles.",
  //     image: "https://dob.com.bd/wp-content/uploads/2024/09/Chuck-70-Vintage-Canvas.jpg"
  //   },
  //   {
  //     id: 11,
  //     name: "Heritage Leather Boots",
  //     category: "Boots",
  //     price: 8500,
  //     discountPrice: 7700,
  //     sizes: [42, 43, 44, 45],
  //     stock: 8,
  //     description: "Premium handcrafted boots that combine durability with timeless style.",
  //     image: "https://claytonandcrume.com/cdn/shop/files/1_3.jpg?v=1730378389&width=1400"
  //   },
  //   {
  //     id: 12,
  //     name: "AquaLite Slides",
  //     category: "Slides",
  //     price: 1100,
  //     discountPrice: 950,
  //     sizes: [40, 41, 42, 43],
  //     stock: 28,
  //     description: "Lightweight water-friendly slides ideal for daily comfort and poolside use.",
  //     image: "https://rukminim2.flixcart.com/image/480/580/xif0q/slipper-flip-flop/z/t/w/10-lsw00006g-aqualite-bkwh-original-imah6emfgtufmex6.jpeg?q=90"
  //   },
  //   {
  //     id: 13,
  //     name: "Heritage Leather Boots",
  //     category: "Boots",
  //     price: 8500,
  //     discountPrice: 7700,
  //     sizes: [42, 43, 44, 45],
  //     stock: 8,
  //     description: "Premium handcrafted boots that combine durability with timeless style.",
  //     image: "https://claytonandcrume.com/cdn/shop/files/1_3.jpg?v=1730378389&width=1400"
  //   }
  // ];
  
  




  const authInfo = {
    
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    user


  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
