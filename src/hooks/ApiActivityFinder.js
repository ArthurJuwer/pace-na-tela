import { useState, useEffect } from 'react';
import axios from 'axios';
import { useImage } from '@/context/ImageContext';

export function useActivityFetcher(id) {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { updateActivity } = useImage();  
  // TALVEZ TIRAR ESTA activity E PUXAR PELO useImage()
  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_STRAVA_TOKEN;
        const response = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateActivity(response.data);
        setActivity(response.data)
        
      } catch (err) {
        setError(err.response?.data || { message: 'Erro ao buscar a atividade.' });
      }
    };

    fetchActivity();
  }, [id]);

  return { activity, error };
}
