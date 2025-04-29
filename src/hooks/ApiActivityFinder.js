import { useEffect, useState } from 'react';
import axios from 'axios';
import { useImage } from '@/context/ImageContext';

export function useActivityFetcher(id) {
  const [error, setError] = useState(null);
  const { updateActivity, updateImage, updateZoom, updatePosition, updateShapes, updateAtualTemplate } = useImage();  

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_STRAVA_TOKEN;
        const response = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        resetarContext(); // Resetando antes de atualizar com a nova atividade
        updateActivity(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err.response?.data || { message: 'Erro ao buscar a atividade.' });
      }
    };

    fetchActivity();
  }, [id]);

  const resetarContext = () => {
    updateImage(null);
    updateZoom(1);
    updatePosition({ x: 0, y: 0 });
    updateShapes({});
    updateAtualTemplate({});
  };

  return { error };
}
