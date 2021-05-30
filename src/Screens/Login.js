import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom'

function Login() {
    const [values, setValues] = useState({
      username : '',
      password : '',
      success : false
    })

    const [warning, setWarning] = useState('')

    const { username , password  ,success} = values

    const handleChange = (name) => event =>{
      setValues({...values,[name]:event.target.value})
    }


    function header() {
        return (
          <div style={{padding : 10}}>
            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84454/preview.svg" alt={"Logo"} style={{height : 50, width : 50}} />
          </div>
        )
    }

    function bottonRightCorner(){
      return(
        <div>
            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38033/preview.svg" alt={"Logo"} style={{height : 30, width : 30, position: 'fixed',bottom: 0,right: 0, padding : 20}} />
          </div>
      )
    }    

      function loginForm(){
        return(
          <div style={{
            display: 'inline-block',
            position: 'fixed',
            top: 0,
            bottom: 150,
            left: 0,
            right: 0,
            width: '500px',
            height: '200px',
            margin: 'auto',
          }}>
            <h2 style={{textAlign : 'center' ,fontFamily :'Poppins, sans-serif', fontWeight : 1000 , fontSize : 32}}>Admin Login</h2>
            <p style={{textAlign : 'center' ,fontFamily :'Poppins, sans-serif', fontWeight : 1000 , fontSize : 15, color : 'red'}}>{warning}</p>
            <div style={{padding : 30}}>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input placeholder='Username' style={inputStyles} onChange={handleChange('username')} value={username} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center', marginBottom : 20}}>
                <input type='password' placeholder='Password' style={inputStyles} onChange={handleChange('password')} value={password} />
              </div>
              <div  style={{display: 'flex' ,justifyContent: 'center' , alignSelf : 'center'}}>
                <button  type="submit" style={{backgroundColor : 'black', color : '#fff', border  :'none', padding: '8px 30px', borderRadius : 20, outline  : 'none', cursor : 'pointer' }} onClick={onSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )
      }

      function onSubmit () {
        if(password === '' || username === '') return 
        if(password !== 'admin' || username !== 'admin') return setValues({ username : "",password :"", success:false})
        if(password === 'admin' || username === 'admin') localStorage.setItem('client',"login")
        return setValues({...values, success:true})
      }
      const performRedirect = ()=>{
        if (success) {
          return <Redirect to='/' />
        }
    }
    
      return (
          <div style={{backgroundColor : "#E0c9A6" , bottom : 0 , height : "100vh", margin : 0}}>
            {header()}
            {loginForm()}
            {bottonRightCorner()}
            {performRedirect()}
          </div>
      )
    }
    
    const inputStyles ={
      width  : 250,
      paddingLeft : 20,
      paddingRight : 20,
      paddingTop : 8,
      paddingBottom : 8,
      borderRadius : 20,
      outline : 'none',
      borderColor : 'gray',
      border: '1px solid #ccc',
      fontSize : 14
    }

export default Login