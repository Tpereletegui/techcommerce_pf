import React, { useState, useEffect } from 'react';
import s from '../assets/styles/login.module.css'
import iconGoogle from '../assets/Imgs/iconGoogle.png'
import {Google} from '@styled-icons/boxicons-logos/Google'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {getuser,loginAccount} from '../Store/actions/users'
import swal from 'sweetalert2'
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  setPersistence, 
  browserSessionPersistence,
} from 'firebase/auth';

function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const auth = getAuth();
  let user=useSelector(state=>state.users)
  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );
  const initialState = {
     email: '',
     password: ''
  }
  const [data,setData] = useState(initialState)
  const [error,setError] = useState({
    email:'Enter an email',
    password: 'Enter a password'
  })
  useEffect(() => {
    dispatch(getuser())
  },[dispatch])

  useEffect(() => {
    if(user.token) navigate('/products')
    if(user.error) swal.fire({title:'Error', text:user.error, icon: 'error'})
    if(user.user?.force) swal.fire({title:'Informacion', text:'¡Advertencia! Se sugiere, realizar un cambio de contraseña', icon:"warning"}).then(res => navigate("/profile"))
  },[user])

  const handlerChange = (e) => {
    e.preventDefault();
    let name= e.target.name;
    let value= e.target.value;
    let errortext=''
    if(name==="email" && !validEmail.test(value)){
      errortext='Invalid email'
    }else if(name==="password" && !/[A-Za-z0-9]{3,}/.test(value)){
      errortext='Password must be at least 3 characters long and contain a number'
    }
    //console.log('errortext', errortext);
      setError({
        ...error,
        [name]:errortext
      })
      setData({
        ...data,
        [name]:value
      })  
  }

  const handlerSubmit = (e) => {
    console.log("data",data)
    e.preventDefault();
    if(!error.email && !error.password){
      dispatch(loginAccount({...data, type:'normal'}))
    }else{
      swal.fire({title:'Error', text:'Error al iniciar sesión debe rellenar nos campos', icon: 'error'})
    } 
  }

  const extLogin = async (e)=>{
    e.preventDefault();
    let provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence)
    .then(()=>{
        return signInWithPopup(auth, provider).then(res=>{
            let dataU = {
                password:'-',
                uid: res.user.uid,
                name: res.user.displayName.split(" ")[0],
                lastname: res.user.displayName.split(" ")[1],
                photo: res.user.photoURL,
                email: res.user.email
            };
            dispatch(loginAccount({...dataU, type:'external'}))
        })
    }).catch((error) => {
        if(error.message.split("/")[1] === "account-exists-with-different-credential)."){
            swal.fire({
                title:'Ya tiene una cuenta con el mismo email',
                text: "no puede iniciar sesión en una cuenta no registrada en la base de datos que tenga el mismo email. Use la cuenta con la que se haya registrado",
                icon: 'error'
            })
        }
    });
}

return (
  <div className={s.container}>
    {!user.token?<div className={s.body}>
      <form autoComplete='off' className={s.form} onSubmit={handlerSubmit}>
        <h2 className={s.title}>My Account</h2>
        <FontAwesomeIcon className={s.iconUser} icon={faUser}/>
        <div className={s.formGrup}>
          <span>Email</span>
          <input type="text" placeholder='Email' name="email" onChange={handlerChange}/>
        </div>
        {error.email?<span className={s.error}>{error.email}</span>:null}
        <div className={s.formGrup}>
          <span>Password</span>
          <input type="password" placeholder='Password' name="password" onChange={(e)=>handlerChange(e)}/>
        </div>
        {error.password?<span className={s.error}>{error.password}</span>:null}
        <div className={s.buttons}>
          <button type='submit' className={`${s.btn} ${s.btn_login}`}>Login</button>
          <button type='button' className={`${s.btn} ${s.btn_sign}`} onClick={()=>navigate('/register')}>Sign up</button>
          <button type='button' className={`${s.btn} ${s.btn_google}`} onClick={extLogin}><img src={iconGoogle} width={50}/>Login with Google</button>
          <Link to="/reset" className={s.btn}>Forgot your password?</Link>
        </div>
      </form>
    </div>:null}

  </div>
  );
}

export default Login;
