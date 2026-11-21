import React, { useState, useEffect, useCallback } from 'react';
import bgImage from './assets/Gemini_Generated_Image_vpuajuvpuajuvpua.png';
import HologramTable from './components/HologramTable';
import { soundEffects } from './utils/soundEffects';
import './App.css';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(() => soundEffects.isSoundEnabled());

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Lỗi khi bật toàn màn hình:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Lỗi khi thoát toàn màn hình:', err);
      });
    }
  }, []);

  // Listen to fullscreen changes, window resize & keyboard shortcut 'F'
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = Boolean(
        document.fullscreenElement ||
        (window.innerHeight >= (window.screen.height - 25))
      );
      setIsFullscreen(isFull);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    // Check on initial mount
    handleFullscreenChange();

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('resize', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen]);

  return (
    <div 
      className={`bg-container ${isFullscreen ? 'mode-fullscreen' : 'mode-windowed'}`}
      onDoubleClick={toggleFullscreen}
      title="Nhấp đúp chuột để Bật / Thoát toàn màn hình"
    >
      {/* Background Image: untouched, filling full screen */}
      <img
        src={bgImage}
        alt="Spaceship Bridge Background"
        className="bg-image"
        draggable={false}
      />

      {/* Holographic 3D Angled Periodic Table */}
      <HologramTable isFullscreen={isFullscreen} />

      {/* Floating Glassmorphic Sound FX Toggle Button */}
      <button
        type="button"
        className="sound-toggle-btn"
        onClick={(e) => {
          e.stopPropagation();
          const nextState = soundEffects.toggleMute();
          setIsSoundOn(nextState);
          if (nextState) soundEffects.playTabSwitch();
        }}
        title={isSoundOn ? "Tắt âm thanh hiệu ứng (Mute)" : "Bật âm thanh hiệu ứng (Sound On)"}
        aria-label="Toggle Sound Effects"
      >
        {isSoundOn ? (
          /* Speaker High Icon */
          <svg
            className="icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          /* Speaker Muted Icon */
          <svg
            className="icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      {/* Floating Minimal Fullscreen Button */}
      <button
        type="button"
        className="fullscreen-btn"
        onClick={(e) => {
          e.stopPropagation();
          soundEffects.playTabSwitch();
          toggleFullscreen();
        }}
        title={isFullscreen ? "Thoát toàn màn hình (Phím F hoặc ESC)" : "Xem toàn màn hình (Phím F hoặc nhấp đúp)"}
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          /* Minimize Icon */
          <svg
            className="icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          /* Maximize Icon */
          <svg
            className="icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </button>
    </div>
  );
}
