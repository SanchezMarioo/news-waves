// app/prueba/page.js

import fetch from 'node-fetch';
import Link from 'next/link';

// Función para construir la URL con parámetros
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
  const API_URL = buildApiUrl(query, limit, timePublished, country, lang);
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '05c619e7f5mshd2f0c8a06544e03p1b28cdjsnfa74da2cfcaf',
      'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(API_URL, { ...API_OPTIONS, ...fetchOptions });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  }
}

// Componente de servidor
export default async function PruebaPage(query, limit, timePublished, country, lang) {
   query = 'politica';
   limit = '3';
    timePublished = 'anytime';
    country = 'ES';
   lang = 'es';

  const data = await fetchData(query, limit, timePublished, country, lang);
  console.log(data);

  const articles = data.data || [];

  return (
    <div className='contPrincipal'>
      <h1>Sports News</h1>
      <div className='news'>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className='article'>
              <h2>{article.title}</h2>
              <img src={article.photo_url} alt={article.title} />
              <p>{article.snippet}</p>
              <Link href={"./noticias/" + id}  target='_blank' rel='noopener noreferrer'>Read more</Link>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
}
