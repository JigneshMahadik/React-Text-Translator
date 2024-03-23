// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState([]);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [res, setRes] = useState("");

  useEffect(()=>{
    getData();
  },[]);

  // Fetched available Languages.
  async function getData(){
    const options = {
      method: 'GET',
      url: 'https://text-translator2.p.rapidapi.com/getLanguages',
      headers: {
        'X-RapidAPI-Key': '416989c663msh15a2d1c56ea3abep191e1fjsn8e1bd9673eaa',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      // const resData = response.data.data.languages;
      setData(response.data.data.languages);
      // setResult(resData);
      // console.log(JSON.stringify(response.data.data.languages));
    } catch (error) {
      console.error(error);
    }
  }

  function selectSourceLang(val){
    // console.log(id.target.value);
    setSourceLang(val.target.value);
  }

  function selectTargetLang(val){
    setTargetLang(val.target.value);
  }

  async function translate(){
    // const encodedParams = new URLSearchParams();
    // encodedParams.set('source_language', 'en');
    // encodedParams.set('target_language', 'id');
    // encodedParams.set('text', 'What is your name?');

    const input = document.getElementById("txt").value;
    // console.log(input);
    const requestData = {
      source_language : sourceLang,
      target_language : targetLang,
      text : input,
    };

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '416989c663msh15a2d1c56ea3abep191e1fjsn8e1bd9673eaa',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: requestData,
    };

    try {
      const response = await axios.request(options);
      setRes(response.data.data.translatedText);
      // console.log(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div className='cont'>
      <h1 className='heading'>Text Translator</h1>
      <label>Enter Text : </label>
      <input type='text' placeholder='Enter Text Here' id='txt'/>
      <br/><br/>
      <label>Source Language : </label>
      <select onChange={selectSourceLang}>
        <option value="">Select Language</option>
      {
        data.length>0 && data.map((item,id)=>{
          return (
          <option key={id} value={item.code}>{item.name}</option>
          )
        })
      }
      </select>
      <br></br><br></br>
      {/* <p>{sourceLang}</p> */}

      <label>Target Language : </label>
      <select onChange={selectTargetLang}>
        <option value="">Select Language</option>
        {
          data.length>0 && data.map((item,id)=>{
            return(
              <option key={id} value={item.code}>{item.name}</option>
            )
          })
        }
      </select>
      <br></br><br></br>
      {/* <p>{targetLang}</p> */}
      <button onClick={translate}>Translate</button>
      <p>{res}</p>
      </div>
    </div>
  );
}

export default App;
