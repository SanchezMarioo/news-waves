import Image from "next/image";
import styles from "./page.module.css";

async function getNews(categoria) {
  const res = await fetch(process.env.DB_HOST + '/posts?category=' + categoria, { next: { revalidate: 6400 }});
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  return data;
}

export default async function Home() {
  const dataTech = await getNews('tecnología'); 
  const dataSports = await getNews('deportes');
  const dataPolitics = await getNews('política');
  const dataPortada = await getNews('portada');
  
  return (
    <div>
      <section className="portada"> {/* // Añadir la clase portada como bg-img en el CSS */}
        {dataPortada.map((post) => (
          <div key={post.id}>
            <h2 className="font-manrope-bold-portada">{post.title}</h2>
            <p className="font-manrope-portada p-2">{post.snippet}</p>
            <a href={post.link} className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
          </div>
        ))}
      </section>
      <article className="news">
        <h2 className="font-manrope-bold p-5">Tecnología</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 p-5">
          <div className="row">
          {dataTech.map((post) => (
  
            <div key={post.id}>
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center p-2 g-2">
                  <div className="image">
                    <img src={post.photo_url} alt={post.title} width={100} height={150} />
                  </div>
                  <div className="content p-2">
                    <h5 className="font-manrope-bold">{post.title}</h5>
                    <p className="font-manrope p-2">{post.snippet}</p>
                    <a href={post.link} className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </article>
    </div>
  );
}