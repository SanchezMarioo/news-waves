export default function RootLayout({ children }) {
    return (
    <div className="container news">
        <h2> Noticias</h2>
        <section className="deportes">
            <h2>Deportes</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="row">
                    <div className="d-flex flex-column">
                        <div className="d-flex p-2">
                        <div className="image">
                            <img src="https://www.eltiempo.com/files/image_640_428/uploads/2021/05/26/60ae7f3f9d2a0.jpeg" alt="noticia" width={200} height={250}/>
                        </div>
                        <div className="content p-2">
                            <h5>Titulo de la noticia</h5>
                            <p>Resumen de la noticia</p>
                            <a href="#" className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                        </div>
                        </div>
                        <div className="image">
                            <img src="https://www.eltiempo.com/files/image_640_428/uploads/2021/05/26/60ae7f3f9d2a0.jpeg" alt="noticia" width={200} height={250}/>
                        </div>
                        <div className="content p-2">
                            <h5>Titulo de la noticia</h5>
                            <p>Resumen de la noticia</p>
                            <a href="#" className="btn btn-light m-2" role="button" data-bs-toggle="button">Leer Mas</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </div>
    );
}