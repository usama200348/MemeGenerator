import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const res = await fetch('https://api.imgflip.com/get_memes');
  const data = await res.json();
  const images = data.data.memes;

  return (
    
<div>    
<h3 className="h3">Meme Generator</h3>
<div  className="main-card-div" > 

        {images.map((item, index) => (
          <div key={index}  className="mb-0 text-center lg:mb-0 lg:text-left">
            <Link href={`/detail/${item.id}`} passHref>
              <div className="border-2 p-2 w-60 h-auto m-3" rel="noopener noreferrer">
                <img src={item.url} alt={item.name} width={100} height={100} className="p-2 w-52 h-52 " />
                <span className="image-name">{item.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
