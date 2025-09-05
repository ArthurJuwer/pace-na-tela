import { useEffect, useState } from 'react';
import { useImage } from '@/context/ImageContext';

export function useActivityFetcher(id) {
  const [error, setError] = useState(null);
  const { updateActivity, updateImage, updateZoom, updatePosition, updateShapes, updateAtualTemplate } = useImage();

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {

        const res = await fetch(`/api/activity/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar atividade');
        const data = await res.json();


        resetarContext();
        updateActivity(data);
        console.log('Atividade carregada:', data);
      } catch (err) {
        setError(err.message);
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
