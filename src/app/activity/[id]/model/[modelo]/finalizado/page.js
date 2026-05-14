'use client'
import { Facebook, Instagram, Upload } from "lucide-react";
import Link from "next/link";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { toPng } from 'html-to-image';
import { useImage } from "@/context/ImageContext";
import { selectPost } from "@/data/postsInterativos";

export default function FinalizadoPage({ params }) {
  const { id, modelo } = React.use(params);
  const { imageUrl, zoom, position, shapes, activity } = useImage();
  const [athlete, setAthlete] = useState(null);

  const PHONE_WIDTH = 230;
  const PHONE_HEIGHT = 479;
  const shapesArray = Array.isArray(shapes) ? shapes : [];
  const phoneContentRef = useRef(null);
  const interativoCardRef = useRef(null);

  useEffect(() => {
    if (modelo !== 'interativo') return;
    fetch('/api/athlete')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.athlete) setAthlete(data.athlete); })
      .catch(() => {});
  }, [modelo]);

  const selectedPost = modelo === 'interativo' ? selectPost(activity) : null;

  const handleDownload = useCallback((ref) => {
    if (!ref.current) return;
    toPng(ref.current, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'pace-na-tela.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Erro ao gerar imagem:', err));
  }, []);

  return (
    <div>
      {modelo === "customizavel" ? (
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Compartilhe o modelo que deseja!</h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="flex items-start flex-col gap-y-2">
              <h2 className="px-12 py-3 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Post Customizável</h2>
            </div>
            <div className="flex flex-col gap-y-8 items-center justify-center w-full">
              <div className="w-8/12">
                <div className="flex">
                  <div
                    className="relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[30px] bg-gray-600 w-full"
                    style={{ height: PHONE_HEIGHT }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
                    <div
                      ref={phoneContentRef}
                      className={`${imageUrl ? 'relative' : 'bg-gray-600'} overflow-hidden flex items-center justify-center`}
                      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
                    >
                      <img
                        src={imageUrl}
                        className="max-w-none"
                        alt=""
                        style={{
                          height: PHONE_HEIGHT,
                          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        }}
                      />
                      {shapesArray.map(shape => (
                        <div
                          key={shape.id}
                          style={{
                            position: 'absolute',
                            left: shape.x,
                            top: shape.y,
                            width: shape.width,
                            height: shape.height,
                          }}
                        >
                          <img src={shape.templateUrl} alt="" className="w-full h-full object-cover" draggable="false" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-center">
                <div className="size-2.5 rounded-full bg-white"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
              </div>
              <h3 className="text-white text-sm font-semibold italic">Compartilhe sua corrida - Tag @pacenatela</h3>
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Instagram className="text-blueMain" />
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <div className="flex items-center justify-center p-1 bg-blueMain rounded-full">
                      <Facebook className="text-white" fill="#ffffff" stroke="1" />
                    </div>
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <button onClick={() => handleDownload(phoneContentRef)} className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Upload className="text-blueMain" />
                  </button>
                  <span className="text-white text-xs font-semibold">Baixar</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => history.go(-1)} className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
          </button>
        </div>

      ) : modelo === "interativo" ? (
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Compartilhe o modelo que deseja!</h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="flex items-center flex-col gap-y-2">
              <h2 className="px-12 py-3 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Post Interativo</h2>
              {selectedPost && (
                <h3 className="italic text-[#013E9D] font-semibold">
                  Informações de <span className="underline">{selectedPost.category}</span>
                </h3>
              )}
            </div>

            <div className="flex flex-col gap-y-8 items-center justify-center w-full">
              {/* Post card — export ready */}
              <div
                ref={interativoCardRef}
                style={{
                  width: 300,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(2,39,124,0.25)',
                  background: 'white',
                  flexShrink: 0,
                }}
              >
                {/* Header — gradient */}
                <div style={{
                  background: 'linear-gradient(135deg, #02277C 0%, #1D6BC3 100%)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <img src="/logobranca-pacenatela.svg" alt="Pace na Tela" style={{ height: 26, width: 'auto' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {athlete?.profile ? (
                      <img
                        src={athlete.profile}
                        alt={athlete.firstname || ''}
                        style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.45)', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                    )}
                    <span style={{ color: 'white', fontSize: 13, fontWeight: 600, letterSpacing: '0.01em' }}>
                      {athlete ? `${athlete.firstname} ${athlete.lastname}` : '…'}
                    </span>
                  </div>
                </div>

                {/* Illustration */}
                <div style={{ background: 'white', padding: '28px 20px 20px', display: 'flex', justifyContent: 'center' }}>
                  {selectedPost && (
                    <img src={selectedPost.image} alt="" style={{ width: 190, height: 'auto' }} />
                  )}
                </div>

                {/* Content zone */}
                <div style={{ background: '#EEF3FF', padding: '18px 22px 22px' }}>
                  {selectedPost && activity ? (
                    <>
                      <p style={{ color: '#0F1B40', fontSize: 16, fontWeight: 800, lineHeight: 1.35, margin: 0, marginBottom: 8, textAlign: 'center' }}>
                        {selectedPost.getTitle(activity, athlete)}
                      </p>
                      <p style={{ color: '#6B7280', fontSize: 12, fontWeight: 400, margin: 0, marginBottom: 16, textAlign: 'center', lineHeight: 1.55 }}>
                        {selectedPost.getText(activity, athlete)}
                      </p>
                    </>
                  ) : (
                    <p style={{ color: '#9CA3AF', fontSize: 12, textAlign: 'center', margin: 0, marginBottom: 16 }}>
                      Carregando dados da atividade…
                    </p>
                  )}
                  {selectedPost && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <span style={{
                        background: '#02277C',
                        color: 'white',
                        fontSize: 9,
                        fontWeight: 700,
                        padding: '4px 13px',
                        borderRadius: 999,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                      }}>
                        {selectedPost.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{
                  background: 'white',
                  padding: '10px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #E5E7EB',
                }}>
                  <span style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 500, letterSpacing: '0.03em' }}>@pacenatela</span>
                  <img src="/logo-pacenatela.svg" alt="" style={{ height: 13, width: 'auto', opacity: 0.3 }} />
                </div>
              </div>

              <div className="flex gap-5 items-center justify-center">
                <div className="size-2.5 rounded-full bg-white"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
              </div>
              <h3 className="text-white text-sm font-semibold italic">Compartilhe sua corrida - Tag @pacenatela</h3>

              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Instagram className="text-blueMain" />
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <div className="flex items-center justify-center p-1 bg-blueMain rounded-full">
                      <Facebook className="text-white" fill="#ffffff" stroke="1" />
                    </div>
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <button
                    onClick={() => handleDownload(interativoCardRef)}
                    className="size-12 rounded-full flex items-center justify-center bg-white"
                  >
                    <Upload className="text-blueMain" />
                  </button>
                  <span className="text-white text-xs font-semibold">Baixar</span>
                </div>
              </div>
            </div>
          </div>

          <Link href={`/activity/${id}/`} className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
          </Link>
        </div>

      ) : (
        <p>Modelo desconhecido.</p>
      )}
    </div>
  );
}
