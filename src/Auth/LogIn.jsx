import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';


const Login = () => {
  const { user, signInUser, } = use(AuthContext)
  
  const location = useLocation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);




  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value;
    const password = form.password.value;
   

    signInUser(email, password)
      .then(result => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/adminDashboard');
       

      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Wrong Credentials",
          showConfirmButton: false,
          timer: 1500
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }
  return (
    <div>
      <div className='mx-auto my-10'>

        <p className='text-3xl text-base-content font-semibold mb-6 text-center' >Admin Login </p>
        <div className="card mx-auto border-2 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <label className="label text-base-content">Email</label>
              <input name='email' type="email" className="input w-full" required placeholder="Email" />
              <label className="label text-base-content">Password</label>

              <div className="flex">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full pr-12"
                  required
                  placeholder="Password"
                />
                 <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="text-2xl mx-2 cursor-pointer text-base-content "
  >
    {showPassword ?<BiSolidHide /> : <BiSolidShow />}
  </button>
              </div>

              <button type='submit' className="btn btn-neutral bg-orange-600 hover:bg-black hover:text-amber-50 text-base-200 mt-4">Login</button>
            </fieldset>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;