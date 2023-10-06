import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useEffect, useState } from 'react';
import './FollowMouse.css';

export const FollowMouse = () => {
  // En principio el seguimiento está desactivado
  const [enabled, setEnabled] = useState(false);
  // Posición Inicial del ball
  const [position, setPosition] = useState({ x: -50, y: -50 });

  // Pointer Move
  useEffect(() => {
    // Función para mover el cursor
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };
    // Si el enable es true, me suscribo al evento
    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }
    // Cleanup: Desuscribirse para que no se siga ejecutando
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled]);

  // Change ball className
  useEffect(() => {
    document.body.classList.toggle('noCursor', enabled);

    return () => {
      document.body.classList.remove('noCursor');
    };
  }, [enabled]);

  return (
    <>
      <div
        className={`ball ${enabled == false ? 'ballDisable' : 'ballEnable'}`}
        style={{
          transform: `translate(${position.x}px,${position.y}px)`,
        }}></div>
      <div className='app'>
        <h1>Mouse Follower Project</h1>
        <h2>[ Vite + React ]</h2>

        <a href='https://vitejs.dev' target='_blank' rel='nonopener noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='nonopener noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>

        <div>
          <button onClick={() => setEnabled(!enabled)}>
            {enabled ? 'Disable' : 'Enable'}
          </button>
        </div>
        <p className='read-the-docs'>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
};
