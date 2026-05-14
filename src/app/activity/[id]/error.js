'use client'
import { useEffect } from 'react';

export default function ActivityError({ error, reset }) {
  useEffect(() => {
    console.error('Erro no segmento de atividade:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-6 font-inter px-8">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-y-4">
        <h2 className="text-blueMain font-bold text-lg italic text-center">Algo deu errado</h2>
        <p className="text-red-600 text-sm text-center">
          {error?.message || 'Não foi possível carregar a atividade. Verifique sua conexão e tente novamente.'}
        </p>
        <div className="flex gap-x-4">
          <button
            onClick={reset}
            className="bg-blueMain text-white px-6 py-2 rounded-2xl font-semibold text-sm"
          >
            Tentar novamente
          </button>
          <button
            onClick={() => history.go(-1)}
            className="text-blueMain font-semibold italic text-sm"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
