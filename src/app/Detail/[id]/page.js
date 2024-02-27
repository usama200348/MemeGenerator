'use client'
// import Detail from "./Detail";
import Link from "next/link";
import { useEffect, useState } from 'react';


export default  function Details({params}){
    const [selectedMemeUrl, setSelectedMemeUrl] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [generatedMemeUrl, setGeneratedMemeUrl] = useState('');

    useEffect(() => {
        fetchMeme();
    }, []);

    async function fetchMeme() {
        const res = await fetch('https://api.imgflip.com/get_memes')
        console.log('res',res);
        const result = await res.json()
        const memes = result.data.memes.find(memes => memes.id === params.id);
        setSelectedMemeUrl(memes.url)   
    }

    async function generateMeme(){
        const res = await fetch(` https://api.imgflip.com/caption_image?template_id=${params.id}&username=MuneebAhmed3&password=muneeb12&text0=${text1}&text1=${text2}`)
        
        // console.log('id',id);
        const result = await res.json()
        if (result.success) {
            setGeneratedMemeUrl(result.data.url);
        } else {
            alert(result.error_message);
        }
    } 



    return <div class="flex items-baseline ..."> 
         <img className='w-64 h-64 m-4' src={selectedMemeUrl} alt="Selected Meme" />
         <div className='mb-4'>
                <label htmlFor="text1" className='mr-2'>Text 1:</label>
                <input className='h-12 p-2 border border-black rounded' type="text" id="text1" value={text1} onChange={(e) => setText1(e.target.value)} />
            </div>
            <div className='mb-4'>
                <label htmlFor="text2" className='mr-2'>Text 2:</label>
                <input className='h-12 p-2 border border-black rounded' type="text" id="text2" value={text2} onChange={(e) => setText2(e.target.value)} />
            </div>
            <button className="bg-pink-500 ml-2 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={generateMeme}>Generate</button>
            <div>
                 {generatedMemeUrl && <img className='w-64 h-64' src={generatedMemeUrl} alt="Generated Meme" />}
            </div>
    </div>
    }