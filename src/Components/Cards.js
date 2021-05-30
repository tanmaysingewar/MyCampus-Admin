import React,{useState} from 'react'

function Cards({postTitle,videoId,postDec,reflink,contact,googleFormLink, id}) {
    const [deleted, setDeleted] = useState(false)
    const deletePost = () => {
        return fetch(`https://whispering-bastion-55738.herokuapp.com/api/post/delete/${id}`,{
            method: "DELETE",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(res =>{
            return setDeleted(true)
        })
        .catch(err => console.log(err))
    }
   return deleted ? 
    <div>

    </div> :(
        <div style={{border : '1px solid #fff', padding : "20px", width: "400px" , marginTop : "20px", borderRadius : "5px"}}>
            <div >
                <h3>{postTitle}</h3>
                {
                    videoId ? 
                    <iframe width="400px" height="250" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    : <div></div>
                }
                
                <p>{postDec}</p>
                <p><a href={reflink}>More info</a></p>
                <p>{contact}</p>
                <a href={googleFormLink}>
                    <p style={{...boxStyle,boxShadow : 'none'}} >Apply</p>
                </a>
                <p style={{cursor : "pointer"}} onClick={() => deletePost()} >Delete Post</p>
            </div>
        </div>
    )
}

const boxStyle ={ padding: '8px 30px', backgroundColor : 'black', color : 'white',fontFamily : 'Poppins, sans-serif', 
boxShadow :'0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)', borderRadius : 3,  marginTop : 20 , width : 60 , cursor : "pointer" }


export default Cards
