import './App.css';
import {Component, useEffect, useState} from "react";
import CreatePlaylist from './components/createPlaylist';

const CLIENT_ID = "621decf90bd14806971f62c9136f8900"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


const App =()=>{
  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  // const handleSelectedSong=(event)=>{
  //   setSelectedSong([...selectedSong],uri)
  // }
  // const handleDeselectedSong=(event)=>{
  //   setSelectedSong(selectedSong.filter((item)))
  // }

  const getSpotify = () => {
    fetch('https://api.spotify.com/v1/search?q=' + search + '&type=track&limit=10&access_token=' + accessToken)


      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data.tracks.items)
      });
  }


  useEffect(() => {
    setAccessToken(window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1])
   
  }, [])

 

 
  return (
    <div className="App">
      <CreatePlaylist/>
      <header className="App-header">
        <h1>Vibes Nyuci Baju</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        <input value={search} onChange={handleChange}></input>
        <button onClick={getSpotify}>search</button>
        <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Song image</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Album</th>
              
              </tr>
          </thead>
          <tbody>
            {data.map((item, index)=>(
            <tr>
          
              <td>{index + 1}</td>
                <td>
                <img src={item.album.images[2].url}></img>
                </td>
                <td>{item.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.album.name}</td>

              <td>
              {selectedSong.includes(item.uri) ? 
                <button onClick={() => setSelectedSong(selectedSong.filter(uri => uri !== item.uri))}>
                  Deselect
                  </button> :
                <button onClick={() => setSelectedSong([...selectedSong, item.uri])}>Select</button>
                }
              </td>
                
            </tr>
            ))}
           
          </tbody>

       

        </table>
       
      </header>
      
    </div>
  );
 

 


 
}

export default App;