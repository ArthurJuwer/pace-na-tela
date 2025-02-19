export default async function handler(req, res) {
    const { activityId } = req.query;
  
    if (!activityId) {
      return res.status(400).json({ error: "Activity ID is required" });
    }
  
    const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
  
    try {
      const response = await fetch(`https://www.strava.com/api/v3/activities/${activityId}`, {
        headers: {
          Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      res.status(200).json(data); // Retorna os dados da atividade
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  