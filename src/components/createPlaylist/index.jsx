import axios from 'axios'
import {useState} from 'react'
const CreatePlaylist =({ accessToken })=>{

const [playlist ,setPlaylist]= useState({
    namePlaylist:"",
    descriptionPlaylist:"",
});
const [hasError, setError]=useState(false)
const [playlist_id ,setPlaylist_id] = useState("")

const postData=()=>{
    axios
    .post("https://api.spotify.com/v1/users/estungtungid/playlists",
    {
        name: playlist.namePlaylist,
        description: playlist.descriptionPlaylist,
        public:false,
    },
    {
        headers :{
            Authorization : `Bearer $(accessToken)`,
        },
    }
    )
    .then((res)=>{
        console.log(res.data);
        setPlaylist_id(res.data.id);
    })
    .catch((err)=>{
        console.log(err.message);
    });
}
const handleChange=(event)=>{
    const { name, value}= event.target;
    setPlaylist({
        ...playlist,
        [name]:value,
    });

    const errors = {...playlist}
    if(playlist.namePlaylist.length <=10){
        setError({
            ...errors,
            namePlaylist :"minimum 10 character",
        })
    }else{
        setError({
            ...errors,
            namePlaylist:"",
        })
    }

console.log(playlist)
}
const handleOnSubmit =(event)=>{
    event.preventDefault();
    if (playlist.namePlaylist.length <= 10){
        return alert("Minimum 10 characters")
    }
    // function
    postData();
}


return(
    <>
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="">Title</label>
        <input required name="namePlaylist" type="text" value={playlist.namePlaylist} onChange={handleChange} />
        <label htmlFor="">Description</label>
        <input required name="descriptionPlaylist" type="text" value={playlist.descriptionPlaylist} onChange={handleChange} />
        {hasError.namePlaylist && (
                      <p className="error">{hasError.namePlaylist}</p>
                    )}
        <button type="submit">create playlist</button>
    </form>
    </>
)
}
export default CreatePlaylist;