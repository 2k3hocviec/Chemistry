import React, { useMemo } from 'react';
import { getElementShells, SHELL_LETTERS, getNeutronCount } from '../data/electronShells';
import './AtomBohrVisualizer.css';

/**
 * AtomBohrVisualizer:
 * Renders an animated atomic model with glowing central nucleus (hạt nhân)
 * and electrons (các electron) orbiting along concentric quantum shells.
 */
export default function AtomBohrVisualizer({ 
  element, 
  size = 200, 
  showLegend = false, 
  mode = 'bohr', // 'bohr' or '3d'
  className = '' 
}) {
  if (!element) return null;

  const shells = useMemo(() => {
    return getElementShells(element.atomicNumber);
  }, [element.atomicNumber]);

  const numShells = shells.length;
  const protons = element.atomicNumber;
  const neutrons = useMemo(() => {
    return getNeutronCount(element.atomicNumber, element.atomicMass);
  }, [element.atomicNumber, element.atomicMass]);

  // Color scheme by element category
  const themeColor = useMemo(() => {
    if (element.category === 'nonmetal') return '#ff4fa3';
    if (element.category === 'noble') return '#ffc83d';
    return '#2de2e6';
  }, [element.category]);

  // Calculate orbital radii dynamically so all shells fit inside the viewBox
  // Base viewBox: -150 to +150 (width 300)
  const maxRadius = 135;
  const minRadius = numShells === 1 ? 75 : 42;
  const radiusStep = numShells > 1 ? (maxRadius - minRadius) / (numShells - 1) : 0;

  // Nucleus radius
  const nucleusRadius = numShells <= 2 ? 26 : numShells <= 4 ? 24 : 22;

  return (
    <div className={`atom-visualizer-container ${element.category} ${className}`}>
      <svg 
        className="atom-svg" 
        viewBox="-150 -150 300 300" 
        width={size} 
        height={size}
        role="img"
        aria-label={`Mô hình hạt nhân và electron nguyên tử ${element.name || element.symbol}`}
      >
        <defs>
          {/* Glowing filter for central nucleus */}
          <filter id={`nucleusGlow-${element.atomicNumber}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glowing filter for electrons */}
          <filter id="electronGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for glowing nucleus orb */}
          <radialGradient id={`nucleusGrad-${element.atomicNumber}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor={themeColor} stopOpacity="0.95" />
            <stop offset="80%" stopColor="#031628" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#010a14" stopOpacity="1" />
          </radialGradient>

          {/* Corona plasma aura */}
          <radialGradient id={`coronaGrad-${element.atomicNumber}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={themeColor} stopOpacity="0.45" />
            <stop offset="70%" stopColor={themeColor} stopOpacity="0.12" />
            <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Energy Corona */}
        <circle 
          cx="0" 
          cy="0" 
          r={nucleusRadius * 2.2} 
          fill={`url(#coronaGrad-${element.atomicNumber})`} 
          className="atom-corona-pulse"
        />

        {/* Orbit Rings & Orbiting Electrons */}
        {shells.map((count, shellIdx) => {
          const r = numShells === 1 ? minRadius : minRadius + shellIdx * radiusStep;
          const shellLetter = SHELL_LETTERS[shellIdx] || `n=${shellIdx + 1}`;
          
          // Rotation duration: inner shell faster, outer shell slower
          const duration = (5 + shellIdx * 3.5).toFixed(1);
          const isReverse = shellIdx % 2 === 1;

          // Generate electron positions evenly along this shell's perimeter
          const electronPositions = [];
          for (let i = 0; i < count; i++) {
            const angle = (2 * Math.PI * i) / count;
            const cx = (r * Math.cos(angle)).toFixed(2);
            const cy = (r * Math.sin(angle)).toFixed(2);
            electronPositions.push({ cx, cy, angle });
          }

          return (
            <g key={`shell-${shellIdx}`} className="orbit-shell-group">
              {/* Static Orbit Ring */}
              <circle
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={themeColor}
                strokeWidth="1.2"
                strokeDasharray={shellIdx % 2 === 0 ? 'none' : '4 3'}
                strokeOpacity="0.32"
                className="orbit-track"
              />

              {/* Shell Letter Marker at Top of Ring */}
              <text
                x="0"
                y={-r - 3}
                textAnchor="middle"
                fill={themeColor}
                fillOpacity="0.75"
                fontSize="8"
                fontFamily="'Orbitron', sans-serif"
                fontWeight="700"
                className="shell-letter-tag"
              >
                {shellLetter}
              </text>

              {/* Rotating Group for Electrons on this shell */}
              <g 
                className={`electrons-revolving-ring ${isReverse ? 'rev-counter' : 'rev-clock'}`}
                style={{
                  animationDuration: `${duration}s`,
                  transformOrigin: '0px 0px'
                }}
              >
                {electronPositions.map((pos, eIdx) => (
                  <g key={`e-${shellIdx}-${eIdx}`}>
                    {/* Glowing outer halo of electron */}
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r="4.2"
                      fill={themeColor}
                      opacity="0.6"
                      filter="url(#electronGlow)"
                    />
                    {/* Solid high-energy electron core */}
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r="2.4"
                      fill="#ffffff"
                      stroke={themeColor}
                      strokeWidth="0.8"
                    />
                  </g>
                ))}
              </g>
            </g>
          );
        })}

        {/* Central Atomic Nucleus (Hạt Nhân) */}
        <g className="atomic-nucleus-group">
          {/* Outer glowing aura */}
          <circle
            cx="0"
            cy="0"
            r={nucleusRadius}
            fill={`url(#nucleusGrad-${element.atomicNumber})`}
            stroke={themeColor}
            strokeWidth="1.8"
            filter={`url(#nucleusGlow-${element.atomicNumber})`}
            className="nucleus-core"
          />

          {/* Nucleus Symbol / Content */}
          <text
            x="0"
            y={numShells >= 5 ? 4 : 3}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize={nucleusRadius * 0.75}
            fontFamily="'Chakra Petch', 'Orbitron', monospace"
            fontWeight="800"
            filter="drop-shadow(0 0 4px #000)"
          >
            {element.symbol}
          </text>

          {/* Mini Atomic Number Badge inside Nucleus */}
          <text
            x="0"
            y={nucleusRadius * 0.58}
            textAnchor="middle"
            fill={themeColor}
            fontSize="7"
            fontFamily="monospace"
            fontWeight="700"
          >
            {protons}+
          </text>
        </g>
      </svg>

      {/* Optional Shell Count Legend underneath */}
      {showLegend && (
        <div className="atom-shells-legend">
          <div className="legend-pills-row">
            {shells.map((count, idx) => (
              <span key={idx} className="shell-pill" title={`Lớp ${SHELL_LETTERS[idx] || idx + 1}: ${count} electron`}>
                <b className="shell-pill-name">{SHELL_LETTERS[idx]}</b>
                <span className="shell-pill-count">{count}e⁻</span>
              </span>
            ))}
          </div>
          <div className="legend-particles-meta">
            <span className="part-meta-tag part-p"><b>{protons}</b> p⁺ (Proton)</span>
            <span className="part-meta-tag part-n"><b>{neutrons}</b> n⁰ (Neutron)</span>
            <span className="part-meta-tag part-e"><b>{protons}</b> e⁻ (Electron)</span>
          </div>
        </div>
      )}
    </div>
  );
}
