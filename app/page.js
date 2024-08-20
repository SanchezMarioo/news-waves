import Image from "next/image";
import styles from "./page.module.css";

async function getNews(categoria) {
  const res = await fetch(process.env.DB_HOST + '/posts?category=' + categoria, { next: { revalidate: 10 }});
  
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
  const dataActualidad = await getNews('actualidad');
  
  return (
    <div>
      <section className="portada"> {/* // Añadir la clase portada como bg-img en el CSS */}
        {dataPortada.map((post) => (
          <div key={post.id}>
            <h2 className="font-manrope-bold-portada">{post.title}</h2>
            <p className="font-manrope-portada p-2">{post.snippet}</p>
          </div>
        ))}
      </section>
      <article className="lastest-news p-4">
          <div className="grid">
            <div className="tecnologia">
              <h2>Tecnología</h2>
                {dataTech.map((post) => (
                  <div key={post.id}>
                    <div className="d-flex flex-column">
                      <div className="d-flex p-2">
                        <div className="image">
                          <img src={post.photo_url} alt="noticia" width={200} height={250}/>
                        </div>
                        <div className="content p-2">
                          <h5>{post.title}</h5>
                          <p>{post.snippet}</p>
                          <a href={post.link} className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="deportes">
            <h2>Deportes</h2>
              {dataSports.map((post) => (
                <div key={post.id}>
                  
                  <div className="d-flex flex-column">
                    <div className="d-flex p-2">
                      <div className="image">
                        <img src={post.photo_url} alt="noticia" width={200} height={250}/>
                      </div>
                      <div className="content p-2">
                        <h5>{post.title}</h5>
                        <p>{post.snippet}</p>
                        <a href={post.link} className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="politica">
          <h2>Política</h2>
          {dataPolitics.map((post) => (
            <div key={post.id}>
              <div className="d-flex flex-column">
                <div className="d-flex p-2">
                  <div className="image">
                    <img src={post.photo_url} alt="noticia" width={200} height={250}/>
                  </div>
                  <div className="content p-2">
                    <h5>{post.title}</h5>
                    <p>{post.snippet}</p>
                    <a href={post.link} className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </article>
      <section className="news p-4">
        <h2 className="p-4">Actualidad</h2>
        <div className="row row-cols-1 row-cols-md-3 justify-content-around">
        {dataActualidad.map((post) => (
          <div key={post.id} className="row">
            <div className="card">
              <img src={post.photo_url} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.snippet}</p>
                <a href={post.link} className="btn btn-light">Leer Más</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>
      </div>
  );

}