import axios from 'axios';
import { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';



const axiosSecure = axios.create({
    
    baseURL: `https://jersey-server.vercel.app`
    // baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const { user, logOut } = use(AuthContext);
    
  
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        // if (status === 403) {
        //     navigate('/');
        // }
         if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;