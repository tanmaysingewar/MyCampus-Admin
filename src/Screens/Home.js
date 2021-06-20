import React,{useState,useEffect} from 'react'
import Cards from '../Components/Cards'
import { Link, Redirect } from 'react-router-dom'

function Home() {
  const [success, setSuccess] = useState(false)
    const [selectForm, setSelectForm] = useState(2)
    const [change, setChange] = useState(0)
    const [data, setdata] = useState({
        postTitle : "",
        postDec : "",
        reflink : "",
        contact : "",
        googleFormLink : "",
        videoId : "",
        campus : false
      })

      const {postTitle, postDec, reflink, contact, googleFormLink, videoId, campus} = data
    
    const [Data, setData] = useState('')
        const getAllPost = () => {
        return  fetch(`https://whispering-bastion-55738.herokuapp.com/api/post/all/0`,{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res =>{
            return res.json()
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {

      const login = localStorage.getItem('client')

      if(!login) {
        return setSuccess(true)
      }

        getAllPost()
         .then((data) =>{
            if(!data){
                return setData([])
            }
            return setData(data)
         })
    }, [change])


    

    console.log(Data,"Data")

    const performRedirect = ()=>{
      if (success) {
        return <Redirect to='/login' />
      }
  }

    const logout = () => {
      setSuccess(true)
      return localStorage.setItem('client',"")
    }

    const handleChange = (name) => event =>{
        if(name === "campus"){
            return setdata({...data,[name]:event.target.checked})
        }
        setdata({...data,[name]:event.target.value})
    }

    const onSubmit = () => {
      
      return fetch(`https://whispering-bastion-55738.herokuapp.com/api/post/create`,{
            method : 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
          }).then((res) =>{
            setdata({
              postTitle : "",
              postDec : "",
              reflink : "",
              contact : "",
              googleFormLink : "",
              videoId : "",
              campus : false
            })
          }).catch((e) => {
            console.log(e)
          })
           
    }

    const allPostSelect = () => {
      setSelectForm(2)
      return setChange(change + 1)
    }
    function header(){
        return(
            <div  >
              
              <div style={{display: 'flex' ,justifyContent: 'left' , marginBottom : 20 }}>
                  <p style={  selectForm === 2 ? boxStyle : {...boxStyle,boxShadow : 'none'} }  onClick={() => allPostSelect() }>All Post</p>
                  <p style={  selectForm === 0 ? boxStyle : {...boxStyle,boxShadow : 'none'} }  onClick={() => setSelectForm(0)}>Add Announcement</p>
                  <p style={{...boxStyle,backgroundColor : 'white', color : 'gray', boxShadow : 'none', border : '1px solid #fff'}} onClick={() => logout()}>LogOut</p>
              </div>
            </div>
        )
    }

    function loadPosts(){
        return(
            <div style={{
                left: 0,
                right: 0,
                top : "80px",
                bottom : 0 ,
                width: '500px',
                height : "92vh",
                position : "fixed",
                overflow : "scroll",
                scrollPadding : 0,
                scrollbarWidth : 0,
                paddingBottom : "10px",
                margin: 'auto'}}>
                        <h2 style={{marginTop : "40px"}}>All Announcement</h2>
                        {Data ? Data?.map((cardData,index) => {
                            return <Cards id={cardData._id} postTitle={cardData.postTitle} videoId={cardData.videoId} postDec={cardData.postDec} reflink={cardData.reflink} contact={cardData.contact} googleFormLink={cardData.googleFormLink} />
                        }) : <p></p>}
            </div>
        )
    }

    function Form_Post() {
        return (
              <div style={{
              top: 0,
              left: 0,
              right: 0,
              width: '500px',
              margin: 'auto',
            }}>
              
              <h2 style={{textAlign : 'left' ,fontFamily :'Poppins, sans-serif', fontWeight : 100 , fontSize : 30}}>Add Announcement</h2>
              <div >
              {/* <p>{`${campus}`}</p> */}
                <div  style={{display: 'flex'  , alignSelf : 'center', marginBottom : 20}}>
                  <input type='text' placeholder='Title of Post' onChange={handleChange("postTitle")} value={postTitle}  style={inputStyles} />
                </div>
                <div  style={{display: 'flex'  , alignSelf : 'center', marginBottom : 20}}>
                  <textarea type='text' placeholder='Description' onChange={handleChange("postDec")} value={postDec} style={inputStyles} />
                </div>
                <div  style={{display: 'flex'  , alignSelf : 'center', marginBottom : 20}}>
                  <input type='text' placeholder='Video Code' onChange={handleChange("videoId")} value={videoId} style={inputStyles} />
                </div>
                <div  style={{display: 'flex'  , alignSelf : 'center', marginBottom : 20}}>
                  <input type='text' placeholder='Contact email' onChange={handleChange("contact")} value={contact} style={inputStyles} />
                </div>
                <div  style={{display: 'flex'  , alignSelf : 'center', marginBottom : 20}}>
                  <input type='text' placeholder='Reffrence Link' onChange={handleChange("reflink")} value={reflink} style={inputStyles} />
                </div>
                <div  style={{display: 'flex'  , marginBottom : 20}}>
                  <input type='text' placeholder='Join Link' onChange={handleChange("googleFormLink")} value={googleFormLink} style={inputStyles} />
                </div>
                <div  style={{display: 'flex' , alignSelf : "left", marginBottom : 20}}>
                  <input type="checkbox"  style={{marginTop : "19px", marginRight : "10px"}} onChange={handleChange("campus")} value={false} /> <p>College amnnouncement</p>
                </div>
                <div  style={{display: 'flex' ,justifyContent: "right" , alignSelf : 'center'}}>
                  <button style={{backgroundColor : 'black', color : '#fff', border  :'none', padding: '8px 30px', borderRadius : 20, outline  : 'none' }} onClick={() => onSubmit()} >Submit</button>
                </div>
              </div>
            </div>
      )
      }
      
      const inputStyles ={
      width  : 250,
      paddingLeft : 20,
      paddingRight : 20,
      paddingTop : 8,
      paddingBottom : 8,
      borderRadius : 5,
      outline : 'none',
      border: '1px solid #fff',
      fontSize : 14
      }
    return (
        <div style={{backgroundColor : "#E0c9A6" , bottom : 0 , height : "100vh"}}>
                {header()}
                {
                    selectForm === 2 ? loadPosts() :  Form_Post() 
                }
                {performRedirect()}
        </div>
    )
}

const boxStyle ={ padding: '8px 30px', backgroundColor : 'black', color : 'white',fontFamily : 'Poppins, sans-serif', 
boxShadow :'0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)', borderRadius : 3, marginLeft : 20, marginTop : 20,cursor : "pointer"  }
export default Home
