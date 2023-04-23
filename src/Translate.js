import React,{ useState ,useEffect} from 'react';
import Axios from 'axios';
const Translate = () => {
	const [options ,setOptions] =useState([])
    const [to ,setTo] = useState("en");
    const [from ,setFrom] = useState("en");
    const [input ,setInput] = useState("");
    const [output ,setOutput] = useState("");

const translate=()=>{
		const params = new URLSearchParams();
		params.append('q',input);
		params.append('source',from);
		params.append('target',to);
		params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
		Axios.post('https://libretranslate.de/translate',params,{
			headers:{'accept':' application/json'}
		}).then((res)=>{
			console.log(res.data)
			setOutput(res.data.translatedText)
		})
	}




     useEffect(()=>{
		 Axios.get('https://libretranslate.de/languages',{
			 headers:{'accept':'application/json'}
		 }).then((res)=>{
			console.log(res.data)
             setOptions(res.data)			
		 })
	 },[]) 
   
  return (
    <div>
        <div className='App'>
            <div>
        Form ({from}):
        <select onChange={e=>setFrom(e.target.value)} className="sl">
		{options.map(opt=><option key={opt.code} value={opt.code} >{opt.name}</option>)}
        </select> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        To ({to}):
        <select onChange={e=>setTo(e.target.value)} className="sl">
          		{options.map(opt=><option key={opt.code} value={opt.code}>{opt.name}</option>)}  
        </select>
        </div>
        <div>
            <textarea cols='70' rows='7'className="txt" onInput={e=>setInput(e.target.value)}></textarea>
        </div>
        <div>
            <textarea cols='70' rows='7' className="txt1" value={output}></textarea>
        </div>
        <button className='btn btn-danger text-light' style={{fontSize:'20px'}} onClick={e=>translate()}> Translate</button>
        </div>
    </div>
  )
}

export default Translate