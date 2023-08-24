import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import LoginUser from '../../../apis/Login';
import Input from '../../../components/Input';

const Login = ({ changeCondition }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await LoginUser(email, password);
      localStorage.setItem('token', token);
      setError(false); 
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      setError(true); 
    }
  };

  return (
    <form className='w-96 bg-white p-14 pt-6 rounded-lg flex flex-col justify-center items-center gap-3'  onSubmit={handleSubmit}>
      <h1 className='text-3xl font-semibold	 mb-10'>Login</h1>
      <Input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div
        className={`text-sm text-center text-red-500 absolute bottom-20 px-8 ${error ? "" : "hidden"}`}
        >
          {error}
      </div>

      <div className='mt-12'>
        <button
        className='bg-[#df0052]/70 w-32 h-12 rounded-full text-white text-xl'
        >Login</button>
      </div>
      <hr className='border-grey border-solid border-1 w-full mt-3 mb-3'/>
      <p className='text-sm	'>Didn't register yet? <span className='font-semibold text-[#df0052]' onClick={changeCondition}>Signup</span> instead</p>
    </form>
  )
}

export default Login