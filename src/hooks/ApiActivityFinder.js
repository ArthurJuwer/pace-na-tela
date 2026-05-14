import { useEffect, useState } from 'react';
import { useImage } from '@/context/ImageContext';

export function useActivityFetcher(id) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateActivity, updateImage, updateZoom, updatePosition, updateShapes, updateAtualTemplate } = useImage();

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/activity/${id}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Erro ${res.status}: não foi possível carregar a atividade`);
        }
        const data = await res.json();
        resetarContext();
        updateActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const resetarContext = () => {
    updateImage(null);
    updateZoom(1);
    updatePosition({ x: 0, y: 0 });
    updateShapes([]);
    updateAtualTemplate({});
  };

  return { error, loading };
}
