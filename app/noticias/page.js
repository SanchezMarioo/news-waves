"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';


function buildApiUrl(query, limit, timePublished, country, lang) {
  const baseUrl = 'https://real-time-news-data.p.rapidapi.com/search';
  const url = new URL(baseUrl);
  url.searchParams.append('query', query);
  url.searchParams.append('limit', limit);
  url.searchParams.append('time_published', timePublished);
  url.searchParams.append('country', country);
  url.searchParams.append('lang', lang);
  return url.toString();
}

// Configuración de opciones de caché y revalidación
const fetchOptions = {
  cache: 'default',
  next: {
    revalidate: 82400 // Tiempo en segundos para revalidar los datos
  }
};

// Función para obtener datos con parámetros
async function fetchData(query, limit, timePublished, country, lang) {
  const API_URL = `https://real-time-news-data.p.rapidapi.com/search?query=${query}&limit=${limit}&time_published=${timePublished}&country=${country}&lang=${lang}`;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6916baa38amsh3df31704ef2c71ap1db9f7jsn0e8f1ab8d82d',
      'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(API_URL, API_OPTIONS);
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtener detalles del error
      console.error('Fetch error details:', errorDetails);
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { data: [] }; // Retornar un objeto con data vacía en caso de error
  }
}
export default function NoticiasPage() {
  const [query, setQuery] = useState('politica');
  const [limit, setLimit] = useState(6);
  const [timePublished, setTimePublished] = useState('anytime');
  const [country, setCountry] = useState('ES');
  const [lang, setLang] = useState('es');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(query, limit, timePublished, country, lang);
      setArticles(data.data || []);
    };
    loadData();
  }, [query, limit, timePublished, country, lang]);

  const handleSearch = () => {
    fetchData(query, limit, timePublished, country, lang).then(data => {
      setArticles(data.data || []);
    });
  };

  return (
    <div className="contPrincipal">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="rounded-lg shadow-sm p-4 dark">
            <h2 className="h5 font-weight-semibold mb-4">Filtros</h2>
            <div className="mb-4">
              <label htmlFor="date" className="form-label">
                Fecha de publicación
              </label>
              <select id="date" className="form-control" onChange={(e) => setTimePublished(e.target.value)}>
                <option value="anytime">En Cualquier Momento</option>
                <option value="1h">Hace 1 hora</option>
                <option value="24h">Hace 24 horas</option>
                <option value="7d">Hace 7 días</option>
                <option value="1y">Hace 1 año</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="topic" className="form-label">
                Tema
              </label>
              <select id="topic" className="form-select" onChange={(e) => setQuery(e.target.value)}>
                <option value="politica">Política</option>
                <option value="ciencia">Ciencia</option>
                <option value="economia">Economía</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="tecnologia">Tecnología</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src={article.photo_url} className="card-img-top" alt={article.title} />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.snippet}</p>
                    <a href={"/noticias/" + index || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leer más</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

