"use client";

import { useState, useEffect } from 'react';

async function fetchData(query, limit, timePublished, country, lang) {
  const API_URL = `https://real-time-news-data.p.rapidapi.com/search?query=${query}&limit=${limit}&time_published=${timePublished}&country=${country}&lang=${lang}`;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6916baa38amsh3df31704ef2c71ap19f7jsn0e8f1ab8d82d',
      'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    }
  };

  console.log('Fetching data from API:', API_URL);

  try {
    const response = await fetch(API_URL, API_OPTIONS);
    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtener detalles del error
      console.error('Fetch error details:', errorDetails);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: [] }; // Retornar un objeto con data vacía en caso de error
  }
}

export default function PruebaPage({ params }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      console.log('Loading data...');
      const data = await fetchData('politica', 6, 'anytime', 'ES', 'es');
      setArticles(data.data || []);
      console.log('Articles loaded:', data.data);
    };
    loadData();
  }, []);

  return (
    <div className="contPrincipal">
      {articles.length > 0 ? (
        <div className="card" style={{ width: '18rem' }}>
          <img src={articles[0].photo_url} className="card-img-top" alt={articles[0].title} />
          <div className="card-body">
            <h5 className="card-title">{articles[0].title}</h5>
            <p className="card-text">{articles[0].snippet}</p>
            <a href={articles[0].link || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leer más</a>
          </div>
        </div>
      ) : (
        <p>No se encontraron artículos.</p>
      )}
    </div>
  );
}