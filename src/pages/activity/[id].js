import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ActivityPage() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    if (!id) return; // Aguarda o ID estar disponível

    const fetchActivity = async () => {
      try {
        const res = await fetch(`/api/strava/activity?activityId=${id}`);
        if (!res.ok) {
          throw new Error('Erro ao buscar a atividade');
        }
        const data = await res.json();
        setActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <p>Carregando...</p>; // Exibe mensagem de carregamento
  if (error) return <p>Erro: {error}</p>; // Exibe mensagem de erro

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>Distância: {activity.distance / 1000} km</p>
      <p>Tempo: {Math.floor(activity.moving_time / 60)} min</p>
      <p>Velocidade Média: {activity.average_speed} m/s</p>
    </div>
  );
}