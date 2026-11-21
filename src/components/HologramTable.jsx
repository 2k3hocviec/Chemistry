import React, { useState, useEffect, useMemo } from 'react';
import { ELEMENTS } from '../data/elements';
import ElementModal from './ElementModal';
import { soundEffects } from '../utils/soundEffects';
import './HologramTable.css';

export default function HologramTable({ isFullscreen = false }) {
  const [selectedElement, setSelectedElement] = useState(null);

  // Debug Panel Mode (?debug in URL)
  const [isDebug, setIsDebug] = useState(false);
  const [debugParams, setDebugParams] = useState({
    left: 14,
    top: 5,
    width: 84,
    height: 96,
    rotateY: 18,
    rotateX: 1,
    perspective: 1600,
    scale: 0.93
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsDebug(params.has('debug'));
    const elNum = parseInt(params.get('element'), 10);
    if (elNum) {
      const found = ELEMENTS.find((e) => e.atomicNumber === elNum);
      if (found) setSelectedElement(found);
    }
  }, []);

  // Split elements for main 7 rows and f-block bottom rows
  const { mainElements, lanthanides, actinides } = useMemo(() => {
    const lanth = [];
    const act = [];
    const main = [];

    ELEMENTS.forEach((el) => {
      if (el.isLanthanide) {
        lanth.push(el);
      } else if (el.isActinide) {
        act.push(el);
      } else {
        main.push(el);
      }
    });

    return { mainElements: main, lanthanides: lanth, actinides: act };
  }, []);

  // Keyboard shortcut ESC to deselect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedElement(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler for element cell keydown (Enter / Space)
  const handleCellKeyDown = (e, el) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedElement(el);
    }
  };

  // Copy CSS to clipboard
  const handleCopyCss = () => {
    const cssText = `left: ${debugParams.left}%;
top: ${debugParams.top}%;
width: ${debugParams.width}%;
height: ${debugParams.height}%;
transform: perspective(${debugParams.perspective}px) rotateY(${debugParams.rotateY}deg) rotateX(${debugParams.rotateX}deg);
transform-origin: left center;
transform-style: preserve-3d;`;

    navigator.clipboard.writeText(cssText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    console.log('--- Căn chỉnh CSS Hologram Panel ---');
    console.log(cssText);
  };

  // Dynamic style: Fullscreen mode keeps the exact parameters; Windowed mode scales down so all 9 rows are fully visible
  const panelStyle = isDebug
    ? {
        left: `${debugParams.left}%`,
        top: `${debugParams.top}%`,
        width: `${debugParams.width}%`,
        height: `${debugParams.height}%`,
        transform: `perspective(${debugParams.perspective}px) rotateY(${debugParams.rotateY}deg) rotateX(${debugParams.rotateX}deg) scale(${debugParams.scale || 1})`,
        transformOrigin: 'left top',
        transformStyle: 'preserve-3d'
      }
    : isFullscreen
    ? {
        left: '14%',
        top: '3.5%',
        width: '84%',
        height: '89%',
        transform: 'perspective(1600px) rotateY(18deg) rotateX(1deg)',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d'
      }
    : {
        left: '14%',
        top: '5%',
        width: '84%',
        height: '96%',
        transform: 'perspective(1600px) rotateY(18deg) rotateX(1deg) scale(0.85, 0.93)',
        transformOrigin: 'left top',
        transformStyle: 'preserve-3d'
      };

  return (
    <>
      <div 
        className={`hologram-panel ${isFullscreen ? 'panel-fullscreen' : 'panel-windowed'}`}
        style={panelStyle}
        role="region" 
        aria-label="Bảng tuần hoàn Hologram"
      >
        
        {/* 4 Luminous Corner Markers */}
        <span className="corner-marker corner-tl" aria-hidden="true"></span>
        <span className="corner-marker corner-tr" aria-hidden="true"></span>
        <span className="corner-marker corner-bl" aria-hidden="true"></span>
        <span className="corner-marker corner-br" aria-hidden="true"></span>

        {/* Header Bar */}
        <div className="holo-header">
          <div className="holo-icons" aria-hidden="true">
            <span className="icon-badge" title="Menu">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </span>
            <span className="icon-badge" title="Mạng lượng tử">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <circle cx="12" cy="20" r="1" fill="currentColor"/>
              </svg>
            </span>
            <span className="icon-badge" title="Camera quang học">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </span>
            <span className="icon-badge" title="Thiết lập hệ thống">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </span>
          </div>

          <h1 className="holo-title">BẢNG TUẦN HOÀN CÁC NGUYÊN TỐ HÓA HỌC</h1>

          <div className="holo-indicators" aria-hidden="true">
            <span className="telemetry-bar"></span>
            <span className="dot dot-amber"></span>
            <span className="dot dot-cyan"></span>
          </div>
        </div>

        {/* Upper Void Zone: Carbon Example Callout */}
        <div className="callout-display-zone">
          <div className="carbon-callout-cluster">
            
            {/* Tag 1: Số hiệu nguyên tử (top-left) */}
            <div className="pointer-item item-atomic-num">
              <span className="pointer-pill">Số hiệu nguyên tử</span>
              <span className="pointer-line"></span>
            </div>

            {/* Tag 2: Khối lượng nguyên tử (bottom-left) */}
            <div className="pointer-item item-mass">
              <span className="pointer-pill">Khối lượng nguyên tử</span>
              <span className="pointer-line"></span>
            </div>

            {/* Center Carbon Box (Clickable to open Carbon #6 details) */}
            <div 
              className="carbon-box"
              onClick={() => setSelectedElement(ELEMENTS.find(e => e.atomicNumber === 6))}
              onMouseEnter={() => soundEffects.playHover()}
              role="button"
              tabIndex={0}
              title="Nhấp để xem mô tả chi tiết nguyên tố Carbon"
            >
              <span className="carbon-num">6</span>
              <span className="carbon-sym">C</span>
              <span className="carbon-name">Carbon</span>
              <span className="carbon-mass">12</span>
            </div>

            {/* Tag 3: Kí hiệu hoá học (top-right) */}
            <div className="pointer-item item-symbol">
              <span className="pointer-line"></span>
              <span className="pointer-pill">Kí hiệu hoá học</span>
            </div>

            {/* Tag 4: Tên nguyên tố (bottom-right) */}
            <div className="pointer-item item-name">
              <span className="pointer-line"></span>
              <span className="pointer-pill">Tên nguyên tố</span>
            </div>

          </div>
        </div>

        {/* Main Table Container */}
        <div className="table-stage-grid">
          
          {/* Left Vertical "Chu kỳ" Label */}
          <div className="period-vertical-strip" aria-hidden="true">
            <span>Chu kỳ</span>
          </div>

          {/* 18-Column Grid (aspect-ratio driven rows) */}
          <div className="elements-18-grid">
            
            {/* Group Column Headers */}
            <div className="group-col-header col-1">Nhóm 1</div>
            <div className="group-col-header col-2">IIA</div>
            <div className="group-col-header col-3">IIIB</div>
            <div className="group-col-header col-4">IVB</div>
            <div className="group-col-header col-5">VB</div>
            <div className="group-col-header col-6">VIB</div>
            <div className="group-col-header col-7">VIIB</div>
            <div className="group-col-header col-8-10">VIIIB</div>
            <div className="group-col-header col-11">IB</div>
            <div className="group-col-header col-12">IIB</div>
            <div className="group-col-header col-13">IIIA</div>
            <div className="group-col-header col-14">IVA</div>
            <div className="group-col-header col-15">VA</div>
            <div className="group-col-header col-16">VIA</div>
            <div className="group-col-header col-17">VIIA</div>
            <div className="group-col-header col-18">Nhóm 18</div>

            {/* Main 7 Rows Elements */}
            {mainElements.map((el) => {
              const cellStyle = {
                gridColumn: el.group,
                gridRow: el.period + 1 // +1 for the header row
              };

              const primaryName = el.name || el.nameEn;
              const hasAltName = el.nameVi && el.nameVi.toLowerCase() !== primaryName.toLowerCase();

              return (
                <div
                  key={el.atomicNumber}
                  className={`element-cell ${el.category} ${selectedElement?.atomicNumber === el.atomicNumber ? 'is-active' : ''}`}
                  style={cellStyle}
                  onClick={() => setSelectedElement(el)}
                  onMouseEnter={() => soundEffects.playHover()}
                  onKeyDown={(e) => handleCellKeyDown(e, el)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${el.symbol}, ${primaryName}${hasAltName ? ` (${el.nameVi})` : ''}, Số hiệu ${el.atomicNumber}, Khối lượng ${el.atomicMass}`}
                >
                  <span className="cell-num">{el.atomicNumber}</span>
                  <span className="cell-sym">{el.symbol}</span>
                  <span className="cell-name">{primaryName}</span>
                  <span className="cell-mass">{el.atomicMass}</span>

                  {/* Hover Tooltip */}
                  <div className="cell-tooltip" role="tooltip">
                    <b>{primaryName}</b>{hasAltName ? ` (${el.nameVi})` : ''}<br/>
                    Khối lượng: {el.atomicMass}
                  </div>
                </div>
              );
            })}

            {/* Special Marker Slot: 57–71 Lanthanide (Row 6, Col 3) */}
            <div className="element-cell series-marker metal" style={{ gridColumn: 3, gridRow: 7 }}>
              <span className="marker-range">57–71</span>
              <span className="marker-title">Lanthanide</span>
            </div>

            {/* Special Marker Slot: 89–103 Actinide (Row 7, Col 3) */}
            <div className="element-cell series-marker nonmetal" style={{ gridColumn: 3, gridRow: 8 }}>
              <span className="marker-range">89–103</span>
              <span className="marker-title">Actinide</span>
            </div>

          </div>

          {/* Separated Lanthanides & Actinides Rows */}
          <div className="f-block-subtable">
            
            {/* Lanthanide Row */}
            <div className="f-row">
              <div className="f-row-header">Lanthanide</div>
              <div className="f-cells-strip">
                {lanthanides.map((el) => {
                  const primaryName = el.name || el.nameEn;
                  const hasAltName = el.nameVi && el.nameVi.toLowerCase() !== primaryName.toLowerCase();
                  return (
                    <div
                      key={el.atomicNumber}
                      className={`element-cell ${el.category} ${selectedElement?.atomicNumber === el.atomicNumber ? 'is-active' : ''}`}
                      onClick={() => setSelectedElement(el)}
                      onMouseEnter={() => soundEffects.playHover()}
                      onKeyDown={(e) => handleCellKeyDown(e, el)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${el.symbol}, ${primaryName}${hasAltName ? ` (${el.nameVi})` : ''}, Số hiệu ${el.atomicNumber}`}
                    >
                      <span className="cell-num">{el.atomicNumber}</span>
                      <span className="cell-sym">{el.symbol}</span>
                      <span className="cell-name">{primaryName}</span>
                      <span className="cell-mass">{el.atomicMass}</span>
                      <div className="cell-tooltip" role="tooltip">
                        <b>{primaryName}</b>{hasAltName ? ` (${el.nameVi})` : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actinide Row */}
            <div className="f-row">
              <div className="f-row-header">Actinide</div>
              <div className="f-cells-strip">
                {actinides.map((el) => {
                  const primaryName = el.name || el.nameEn;
                  const hasAltName = el.nameVi && el.nameVi.toLowerCase() !== primaryName.toLowerCase();
                  return (
                    <div
                      key={el.atomicNumber}
                      className={`element-cell ${el.category} ${selectedElement?.atomicNumber === el.atomicNumber ? 'is-active' : ''}`}
                      onClick={() => setSelectedElement(el)}
                      onMouseEnter={() => soundEffects.playHover()}
                      onKeyDown={(e) => handleCellKeyDown(e, el)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${el.symbol}, ${primaryName}${hasAltName ? ` (${el.nameVi})` : ''}, Số hiệu ${el.atomicNumber}`}
                    >
                      <span className="cell-num">{el.atomicNumber}</span>
                      <span className="cell-sym">{el.symbol}</span>
                      <span className="cell-name">{primaryName}</span>
                      <span className="cell-mass">{el.atomicMass}</span>
                      <div className="cell-tooltip" role="tooltip">
                        <b>{primaryName}</b>{hasAltName ? ` (${el.nameVi})` : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Left Legend */}
          <div className="hologram-legend" aria-label="Chú giải phân loại">
            <div className="legend-entry">
              <span className="legend-chip chip-metal" aria-hidden="true"></span>
              <span className="legend-text">Kim loại</span>
            </div>
            <div className="legend-entry">
              <span className="legend-chip chip-nonmetal" aria-hidden="true"></span>
              <span className="legend-text">Phi kim</span>
            </div>
            <div className="legend-entry">
              <span className="legend-chip chip-noble" aria-hidden="true"></span>
              <span className="legend-text">Khí hiếm</span>
            </div>
          </div>

        </div>

      </div>

      {/* Debug Controls Panel (Only visible when URL has ?debug) */}
      {isDebug && (
        <aside className="debug-controls-panel" aria-label="Bảng điều khiển căn chỉnh">
          <div className="debug-title">⚙️ CĂN CHỈNH LAYOUT (?debug)</div>
          
          <div className="debug-row">
            <label>Left: <span>{debugParams.left}%</span></label>
            <input 
              type="range" min="0" max="40" step="0.5" 
              value={debugParams.left} 
              onChange={(e) => setDebugParams(p => ({ ...p, left: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>Top: <span>{debugParams.top}%</span></label>
            <input 
              type="range" min="0" max="30" step="0.5" 
              value={debugParams.top} 
              onChange={(e) => setDebugParams(p => ({ ...p, top: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>Width: <span>{debugParams.width}%</span></label>
            <input 
              type="range" min="40" max="100" step="0.5" 
              value={debugParams.width} 
              onChange={(e) => setDebugParams(p => ({ ...p, width: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>Height: <span>{debugParams.height}%</span></label>
            <input 
              type="range" min="50" max="98" step="0.5" 
              value={debugParams.height} 
              onChange={(e) => setDebugParams(p => ({ ...p, height: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>RotateY: <span>{debugParams.rotateY}°</span></label>
            <input 
              type="range" min="0" max="40" step="0.5" 
              value={debugParams.rotateY} 
              onChange={(e) => setDebugParams(p => ({ ...p, rotateY: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>Perspective: <span>{debugParams.perspective}px</span></label>
            <input 
              type="range" min="600" max="2400" step="50" 
              value={debugParams.perspective} 
              onChange={(e) => setDebugParams(p => ({ ...p, perspective: parseInt(e.target.value) }))}
            />
          </div>

          <div className="debug-row">
            <label>Scale: <span>{debugParams.scale}</span></label>
            <input 
              type="range" min="0.6" max="1.2" step="0.01" 
              value={debugParams.scale} 
              onChange={(e) => setDebugParams(p => ({ ...p, scale: parseFloat(e.target.value) }))}
            />
          </div>

          <button 
            type="button" 
            className={`debug-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyCss}
          >
            {copied ? '✓ ĐÃ SAO CHÉP CSS!' : '📋 SAO CHÉP CSS'}
          </button>
        </aside>
      )}

      {/* Full Detailed Element Description Modal */}
      {selectedElement && (
        <ElementModal 
          element={selectedElement} 
          onClose={() => setSelectedElement(null)} 
          onSelectElement={setSelectedElement}
        />
      )}
    </>
  );
}
