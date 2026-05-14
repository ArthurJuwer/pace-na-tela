// Definições de posts interativos
// Cada post:
//   id          — slug único
//   sportTypes  — tipos de atividade Strava compatíveis
//   condition   — function(activity) → boolean
//   image       — caminho da imagem ilustrativa
//   getTitle    — function(activity, athlete) → string
//   getText     — function(activity, athlete) → string
//   category    — rótulo de exibição

export const posts = [
  // ── Distância ──────────────────────────────────────────────────────────────

  {
    id: 'track_laps',
    sportTypes: ['Run', 'Walk', 'VirtualRun'],
    condition: (a) => a.distance >= 800,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const laps = Math.round(a.distance / 400);
      const name = athlete?.firstname || 'Você';
      return `${name} fez o equivalente a ${laps} volta${laps !== 1 ? 's' : ''} na pista de atletismo!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km é um resultado incrível!`;
    },
    category: 'Distância',
  },

  {
    id: 'football_fields',
    sportTypes: ['Run', 'Walk', 'Ride', 'VirtualRide'],
    condition: (a) => a.distance >= 210,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const fields = Math.round(a.distance / 105);
      const name = athlete?.firstname || 'Você';
      return `${name} percorreu ${fields} campo${fields !== 1 ? 's' : ''} de futebol!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km de pura dedicação!`;
    },
    category: 'Distância',
  },

  {
    id: 'paulista_avenue',
    sportTypes: ['Run', 'Walk'],
    condition: (a) => a.distance >= 2800,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const times = (a.distance / 2800).toFixed(1);
      const name = athlete?.firstname || 'Você';
      return `${name} correu ${times}x a extensão da Avenida Paulista!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km de história e asfalto!`;
    },
    category: 'Distância',
  },

  {
    id: 'ibirapuera',
    sportTypes: ['Run', 'Walk'],
    condition: (a) => a.distance >= 3550,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const loops = (a.distance / 3550).toFixed(1);
      const name = athlete?.firstname || 'Você';
      return `${name} deu ${loops} volta${parseFloat(loops) >= 2 ? 's' : ''} ao redor do Parque Ibirapuera!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km em um dos parques mais lindos do Brasil!`;
    },
    category: 'Distância',
  },

  {
    id: 'sp_rio',
    sportTypes: ['Run', 'Ride', 'Walk', 'VirtualRide'],
    condition: (a) => a.distance >= 50000,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const percent = ((a.distance / 360000) * 100).toFixed(1);
      const name = athlete?.firstname || 'Você';
      return `${name} percorreu ${percent}% da distância de SP ao Rio!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km — quase chegando no Rio!`;
    },
    category: 'Distância',
  },

  // ── Desafio ────────────────────────────────────────────────────────────────

  {
    id: 'marathon_percent',
    sportTypes: ['Run'],
    condition: (a) => a.distance >= 5000 && a.distance < 42195,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const percent = ((a.distance / 42195) * 100).toFixed(0);
      const name = athlete?.firstname || 'Você';
      return `${name} completou ${percent}% de uma maratona completa!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km — chegando lá!`;
    },
    category: 'Desafio',
  },

  {
    id: 'half_marathon',
    sportTypes: ['Run'],
    condition: (a) => a.distance >= 19000 && a.distance <= 23000,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const name = athlete?.firstname || 'Você';
      return `${name} quase completou uma meia maratona!`;
    },
    getText: (a) => {
      const km = (a.distance / 1000).toFixed(1);
      return `${km}km — ritmo de campeão!`;
    },
    category: 'Desafio',
  },

  // ── Tempo ──────────────────────────────────────────────────────────────────

  {
    id: 'songs',
    sportTypes: ['Run', 'Walk', 'Ride', 'Swim', 'Hike', 'VirtualRun', 'VirtualRide'],
    condition: (a) => a.moving_time >= 210,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const songs = Math.round(a.moving_time / 210);
      const name = athlete?.firstname || 'Você';
      return `${name} ouviria ${songs} música${songs !== 1 ? 's' : ''} nesse tempo de treino!`;
    },
    getText: (a) => {
      const min = Math.round(a.moving_time / 60);
      return `${min} minutos bem aproveitados!`;
    },
    category: 'Tempo',
  },

  {
    id: 'netflix_episode',
    sportTypes: ['Run', 'Walk', 'Ride', 'VirtualRun', 'VirtualRide'],
    condition: (a) => a.moving_time >= 1800,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const episodes = (a.moving_time / 2700).toFixed(1);
      const name = athlete?.firstname || 'Você';
      return `${name} treinou por ${episodes} episódio${parseFloat(episodes) >= 2 ? 's' : ''} de série!`;
    },
    getText: (a) => {
      const min = Math.round(a.moving_time / 60);
      return `${min} minutos — mais saudável que a Netflix!`;
    },
    category: 'Tempo',
  },

  // ── Elevação ───────────────────────────────────────────────────────────────

  {
    id: 'floors',
    sportTypes: ['Run', 'Walk', 'Hike', 'Ride'],
    condition: (a) => a.total_elevation_gain >= 30,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const floors = Math.round(a.total_elevation_gain / 3);
      const name = athlete?.firstname || 'Você';
      return `${name} subiu o equivalente a ${floors} andares de prédio!`;
    },
    getText: (a) => {
      const elev = Math.round(a.total_elevation_gain);
      return `${elev}m de elevação acumulada!`;
    },
    category: 'Elevação',
  },

  {
    id: 'pao_de_acucar',
    sportTypes: ['Run', 'Walk', 'Hike', 'Ride'],
    condition: (a) => a.total_elevation_gain >= 100,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const percent = ((a.total_elevation_gain / 396) * 100).toFixed(0);
      const name = athlete?.firstname || 'Você';
      return `${name} subiu ${percent}% da altura do Pão de Açúcar!`;
    },
    getText: (a) => {
      const elev = Math.round(a.total_elevation_gain);
      return `${elev}m de puro esforço nas pernas!`;
    },
    category: 'Elevação',
  },

  // ── Calorias ───────────────────────────────────────────────────────────────

  {
    id: 'calories_brigadeiros',
    sportTypes: ['Run', 'Walk', 'Ride', 'Swim', 'VirtualRun', 'VirtualRide'],
    condition: (a) => a.calories >= 75,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const brigadeiros = Math.round(a.calories / 75);
      const name = athlete?.firstname || 'Você';
      return `${name} queimou ${brigadeiros} brigadeiro${brigadeiros !== 1 ? 's' : ''} nesse treino!`;
    },
    getText: (a) => {
      const cal = Math.round(a.calories);
      return `${cal} calorias — pode comer!`;
    },
    category: 'Calorias',
  },

  {
    id: 'calories_pizzas',
    sportTypes: ['Run', 'Walk', 'Ride', 'Swim'],
    condition: (a) => a.calories >= 500,
    image: '/interativo/postTeste.svg',
    getTitle: (a, athlete) => {
      const slices = Math.round(a.calories / 250);
      const name = athlete?.firstname || 'Você';
      return `${name} queimou ${slices} fatia${slices !== 1 ? 's' : ''} de pizza nesse treino!`;
    },
    getText: (a) => {
      const cal = Math.round(a.calories);
      return `${cal} calorias — pizza merecida!`;
    },
    category: 'Calorias',
  },
];

/**
 * Seleciona o post interativo mais adequado para a atividade.
 * Usa o ID da atividade como semente para escolha determinística entre posts compatíveis.
 */
export function selectPost(activity) {
  if (!activity) return posts[0];

  const sportType = activity.sport_type || activity.type || 'Run';

  const matching = posts.filter(
    (p) => p.sportTypes.includes(sportType) && p.condition(activity)
  );

  if (!matching.length) {
    // Fallback: qualquer post cuja condição bate, sem filtro de esporte
    const fallback = posts.filter((p) => p.condition(activity));
    if (!fallback.length) return posts[0];
    const seed = Number(String(activity.id || 0).slice(-4)) || 0;
    return fallback[seed % fallback.length];
  }

  const seed = Number(String(activity.id || 0).slice(-4)) || 0;
  return matching[seed % matching.length];
}
