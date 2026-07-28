import { default as Lottie } from "lottie-react";
import loading from '../assets/Football Animation Orange Background.json'

const LoadingCompo = () => {
     console.log(loading);
     console.log(Lottie);
    return (
         <div className="flex items-center justify-center min-h-screen">
  <span className="loading loading-bars loading-xl"></span>
</div>
    );
};

export default LoadingCompo;