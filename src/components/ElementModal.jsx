import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ELEMENTS } from '../data/elements';
import { SPECIMENS } from '../data/specimens';
import { getElementShells, SHELL_LETTERS, getNeutronCount } from '../data/electronShells';
import { getElementProperties } from '../data/elementProperties';
import { getElementDossier } from '../data/elementDossiers';
import AtomBohrVisualizer from './AtomBohrVisualizer';
import './ElementModal.css';

export default function ElementModal({ element, onClose, onSelectElement }) {
  if (!element) return null;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'properties' | 'quantum'
  const rightColRef = useRef(null);

  const dossier = useMemo(() => getElementDossier(element.atomicNumber), [element.atomicNumber]);

  // Forward mouse wheel on left column to scroll the right column smoothly
  const handleLeftWheel = (e) => {
    if (rightColRef.current) {
      rightColRef.current.scrollTop += e.deltaY;
    }
  };

  // Reset image state and right column scroll when element changes
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    setIsLightboxOpen(false);
    if (rightColRef.current) {
      rightColRef.current.scrollTop = 0;
    }
  }, [element.atomicNumber]);

  // Reset scroll on tab switch
  useEffect(() => {
    if (rightColRef.current) {
      rightColRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Support ?tab=properties or ?tab=quantum for direct testing, and ?scroll=px
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['overview', 'properties', 'quantum'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    const scrollParam = params.get('scroll');
    if (scrollParam) {
      setTimeout(() => {
        if (rightColRef.current) {
          rightColRef.current.scrollTop = parseInt(scrollParam, 10);
        }
      }, 250);
    }
  }, []);

  // Navigate to previous/next element
  const handlePrev = useCallback(() => {
    const prevIndex = element.atomicNumber === 1 ? 118 : element.atomicNumber - 1;
    const prevEl = ELEMENTS.find((el) => el.atomicNumber === prevIndex);
    if (prevEl) onSelectElement(prevEl);
  }, [element, onSelectElement]);

  const handleNext = useCallback(() => {
    const nextIndex = element.atomicNumber === 118 ? 1 : element.atomicNumber + 1;
    const nextEl = ELEMENTS.find((el) => el.atomicNumber === nextIndex);
    if (nextEl) onSelectElement(nextEl);
  }, [element, onSelectElement]);

  // Keyboard navigation: Left/Right arrow and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (!isLightboxOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext, isLightboxOpen]);

  const specimen = SPECIMENS[element.atomicNumber];
  const hasSpecimen = Boolean(specimen && !imgError);
  const primaryName = element.name || element.nameEn;
  const hasAltName = element.nameVi && element.nameVi.toLowerCase() !== primaryName.toLowerCase();

  const shells = useMemo(() => getElementShells(element.atomicNumber), [element.atomicNumber]);
  const neutrons = useMemo(() => getNeutronCount(element.atomicNumber, element.atomicMass), [element.atomicNumber, element.atomicMass]);
  const valenceElectrons = shells[shells.length - 1];
  const wikiProps = useMemo(() => getElementProperties(element.atomicNumber), [element.atomicNumber]);

  return (
    <>
      <div 
        className="holo-modal-backdrop" 
        onClick={onClose}
        role="presentation"
      >
        <div 
          className={`holo-modal-card ${element.category}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết nguyên tố ${primaryName} (${element.nameVi})`}
        >
          {/* 4 Luminous Corner Markers */}
          <span className="corner-marker corner-tl" aria-hidden="true"></span>
          <span className="corner-marker corner-tr" aria-hidden="true"></span>
          <span className="corner-marker corner-bl" aria-hidden="true"></span>
          <span className="corner-marker corner-br" aria-hidden="true"></span>

          {/* Modal Top Header */}
          <div className="modal-header">
            <div className="modal-header-left">
              <span className="modal-category-chip">
                {element.subCategory || (element.category === 'metal' ? 'Kim loại' : element.category === 'nonmetal' ? 'Phi kim' : 'Khí hiếm')}
              </span>
              <span className="modal-standard-chip">IUPAC 2026</span>
              <span className="modal-state-badge">
                Trạng thái: <b>{element.standardState || 'Rắn'}</b>
              </span>
            </div>

            <div className="modal-header-nav">
              <button 
                type="button" 
                className="modal-nav-btn" 
                onClick={handlePrev}
                title="Nguyên tố trước (Phím ◄)"
              >
                ◄ Trước
              </button>
              <span className="modal-index-counter">#{element.atomicNumber} / 118</span>
              <button 
                type="button" 
                className="modal-nav-btn" 
                onClick={handleNext}
                title="Nguyên tố kế tiếp (Phím ►)"
              >
                Sau ►
              </button>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose}
                title="Đóng bảng mô tả (Phím ESC)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Main Content Layout */}
          <div className="modal-body-layout">
            
            {/* Left Column: Element Specimen / Hologram Tile */}
            <div className="modal-left-col" onWheel={handleLeftWheel}>
              <div 
                key={element.atomicNumber}
                className={`modal-element-tile ${element.category} ${hasSpecimen ? 'has-specimen' : 'no-specimen'}`}
              >
                {/* Top row: Atomic number & Atomic mass */}
                <div className="tile-top-row">
                  <span className="tile-num">{element.atomicNumber}</span>
                  <span className="tile-weight">{element.atomicMass} u</span>
                </div>

                {/* Middle Area: Real Specimen Photo OR Fallback Big Symbol */}
                {hasSpecimen ? (
                  <div className="specimen-zone">
                    <div 
                      className="specimen-card-frame"
                      onClick={() => setIsLightboxOpen(true)}
                      role="button"
                      tabIndex={0}
                      title="Nhấp để phóng to ảnh mẫu vật (ESC để đóng)"
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsLightboxOpen(true); }}
                    >
                      {/* Skeleton Shimmer */}
                      {!imgLoaded && (
                        <div className="specimen-skeleton" aria-hidden="true">
                          <span className="skeleton-wave"></span>
                        </div>
                      )}

                      {/* Specimen Real Image (Static Clean Hologram) */}
                      <img
                        key={element.atomicNumber}
                        src={specimen.src}
                        alt={`Mẫu vật ${primaryName} (${element.atomicNumber})`}
                        loading="lazy"
                        decoding="async"
                        className={`specimen-img ${imgLoaded ? 'loaded' : 'loading'}`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                      />

                      {/* Small Symbol Badge in Bottom-Left Corner */}
                      <span className="specimen-badge-symbol" aria-label={`Ký hiệu ${element.symbol}`}>
                        {element.symbol}
                      </span>
                    </div>

                    {/* Small Caption under Specimen */}
                    <div className="specimen-caption">
                      {specimen.note && (
                        <div className="specimen-note-text" title={specimen.note}>
                          Mẫu vật: <span>{specimen.note}</span>
                        </div>
                      )}
                      <div className="specimen-credit-text">
                        Ảnh: <a href={specimen.sourceUrl} target="_blank" rel="noopener noreferrer" title="Mở trang gốc Wikimedia Commons">
                          {specimen.credit}
                        </a> · <span>{specimen.license}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="fallback-symbol-zone">
                    <div className="tile-symbol">{element.symbol}</div>
                    <div className="no-specimen-notice">
                      {element.atomicNumber >= 93 
                        ? 'Nguyên tố nhân tạo / phóng xạ, chưa có mẫu vật' 
                        : 'Chưa có mẫu vật hình ảnh'}
                    </div>
                  </div>
                )}

                {/* Bottom names */}
                <div className="tile-names-group">
                  <div className="tile-name-main">{primaryName}</div>
                  {hasAltName && (
                    <div className="tile-name-sub">Tên thường gọi: {element.nameVi}</div>
                  )}
                </div>
              </div>

              {/* Electron Configuration */}
              <div className="modal-electron-box">
                <span className="spec-label">Cấu hình Electron</span>
                <span className="spec-value mono-val">{element.electronConfig || 'Đang cập nhật'}</span>
              </div>

              {/* Period & Group Info */}
              <div className="modal-quick-meta">
                <div className="meta-pair">
                  <span className="meta-k">Chu kỳ</span>
                  <span className="meta-v">{element.period}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-k">Phân nhóm</span>
                  <span className="meta-v">
                    {element.group ? `Nhóm ${element.group}` : (element.isLanthanide ? 'Lanthanide' : 'Actinide')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Tabbed Dossier Sections */}
            <div className="modal-right-col" ref={rightColRef}>
              
              {/* Tab Navigation Buttons */}
              <div className="modal-tabs-header" role="tablist" aria-label="Các phân mục thông tin nguyên tố">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'overview'}
                  className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  📖 Tổng quan & Không gian
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'properties'}
                  className={`modal-tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
                  onClick={() => setActiveTab('properties')}
                >
                  🔬 Tính chất Vật lý & Hóa học (Wiki)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'quantum'}
                  className={`modal-tab-btn ${activeTab === 'quantum' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quantum')}
                >
                  ⚛ Cấu trúc Lượng tử
                </button>
              </div>

              {/* Tab 1: Overview & Aerospace Applications */}
              {activeTab === 'overview' && (
                <div className="tab-pane-content tab-overview-content">
                  {/* Overview Description Section (Wikipedia Detailed Dossier) */}
                  <div className="modal-section-box dossier-section-box">
                    <div className="section-title-bar">
                      <span className="section-title">📖 MÔ TẢ ĐẶC TÍNH & NGUỒN GỐC (WIKIPEDIA)</span>
                    </div>

                    {/* Characteristics & Occurrence */}
                    <div className="dossier-sub-block">
                      <div className="dossier-sub-header">
                        <span className="dossier-tag tag-char">💎 Đặc tính & Phân bố tự nhiên</span>
                      </div>
                      <p className="modal-desc-text">
                        {dossier?.description || element.description}
                      </p>
                    </div>

                    {/* Historical Origin & Etymology */}
                    {(dossier?.origin || element.origin) && (
                      <div className="dossier-sub-block dossier-origin-block">
                        <div className="dossier-sub-header">
                          <span className="dossier-tag tag-origin">🏛️ Lịch sử khám phá & Nguồn gốc tên gọi</span>
                        </div>
                        <p className="modal-desc-text text-origin">
                          {dossier?.origin || element.origin}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Space Technology & Aerospace Applications */}
                  <div className="modal-section-box space-app-box">
                    <div className="section-title-bar">
                      <span className="section-title text-cyan">🚀 ỨNG DỤNG KHÔNG GIAN & CÔNG NGHỆ CAO</span>
                    </div>
                    <p className="modal-app-text">
                      {element.spaceApplications}
                    </p>
                  </div>

                  {/* Physical & Chemical Specifications Grid */}
                  <div className="modal-section-box">
                    <div className="section-title-bar">
                      <span className="section-title">📊 THÔNG SỐ VẬT LÝ & HÓA HỌC CƠ BẢN</span>
                    </div>

                    <div className="specs-data-grid">
                      <div className="spec-item">
                        <span className="spec-item-label">Khối lượng nguyên tử</span>
                        <span className="spec-item-val">{element.atomicMass} u</span>
                      </div>

                      <div className="spec-item">
                        <span className="spec-item-label">Độ âm điện (Pauling)</span>
                        <span className="spec-item-val">{element.electronegativity || 'N/A'}</span>
                      </div>

                      <div className="spec-item">
                        <span className="spec-item-label">Nhiệt độ nóng chảy</span>
                        <span className="spec-item-val">{element.meltingPoint || 'N/A'}</span>
                      </div>

                      <div className="spec-item">
                        <span className="spec-item-label">Nhiệt độ sôi</span>
                        <span className="spec-item-val">{element.boilingPoint || 'N/A'}</span>
                      </div>

                      <div className="spec-item">
                        <span className="spec-item-label">Mật độ / Khối lượng riêng</span>
                        <span className="spec-item-val">{element.density || 'N/A'}</span>
                      </div>

                      <div className="spec-item">
                        <span className="spec-item-label">Số oxi hóa phổ biến</span>
                        <span className="spec-item-val">{element.oxidationStates || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: In-depth Wikipedia Physical & Chemical Properties */}
              {activeTab === 'properties' && (
                <div className="tab-pane-content tab-properties-content">
                  {/* Detailed Physical Properties */}
                  <div className="modal-section-box wiki-box">
                    <div className="section-title-bar">
                      <span className="section-title text-cyan">🔬 TÍNH CHẤT VẬT LÝ CHI TIẾT (WIKIPEDIA)</span>
                    </div>

                    <div className="wiki-lead-block">
                      <span className="wiki-lead-label">🎨 Ngoại quan & Thù hình:</span>
                      <span className="wiki-lead-desc">{wikiProps.appearance}</span>
                    </div>

                    <div className="wiki-specs-grid">
                      <div className="wiki-spec-cell">
                        <span className="ws-key">🧊 Cấu trúc tinh thể</span>
                        <span className="ws-val">{wikiProps.crystalStructure}</span>
                      </div>
                      <div className="wiki-spec-cell">
                        <span className="ws-key">💎 Độ cứng Mohs</span>
                        <span className="ws-val">{wikiProps.mohsHardness || 'N/A'}</span>
                      </div>
                      <div className="wiki-spec-cell">
                        <span className="ws-key">📏 Bán kính nguyên tử</span>
                        <span className="ws-val">{wikiProps.atomicRadius}</span>
                      </div>
                      <div className="wiki-spec-cell">
                        <span className="ws-key">🧲 Từ tính & Trạng thái</span>
                        <span className="ws-val">{wikiProps.magneticOrder}</span>
                      </div>
                      <div className="wiki-spec-cell">
                        <span className="ws-key">⚡ Tính dẫn điện</span>
                        <span className="ws-val">{wikiProps.electricalConductivity || 'N/A'}</span>
                      </div>
                      <div className="wiki-spec-cell">
                        <span className="ws-key">🌡️ Độ dẫn nhiệt</span>
                        <span className="ws-val">{wikiProps.thermalConductivity || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Chemical Properties & Reactions */}
                  <div className="modal-section-box wiki-box chemical-box">
                    <div className="section-title-bar">
                      <span className="section-title text-cyan">🧪 TÍNH CHẤT HÓA HỌC & PHẢN ỨNG TIÊU BIỂU (WIKIPEDIA)</span>
                    </div>

                    <div className="wiki-lead-block">
                      <span className="wiki-lead-label">⚡ Mức độ hoạt động:</span>
                      <span className="wiki-lead-desc">{wikiProps.reactivity}</span>
                    </div>

                    <div className="wiki-reactions-list">
                      <div className="reaction-row">
                        <span className="rx-label">Tác dụng với Oxy / Khí quyển:</span>
                        <span className="rx-content">{wikiProps.reactionAir}</span>
                      </div>
                      <div className="reaction-row">
                        <span className="rx-label">Tác dụng với Nước:</span>
                        <span className="rx-content">{wikiProps.reactionWater}</span>
                      </div>
                      <div className="reaction-row">
                        <span className="rx-label">Tác dụng với Axit:</span>
                        <span className="rx-content">{wikiProps.reactionAcid}</span>
                      </div>
                      <div className="reaction-row-inline-grid">
                        <div className="rx-inline-item">
                          <span className="rx-mini-key">Năng lượng ion hóa thứ 1:</span>
                          <span className="rx-mini-val mono-val">{wikiProps.firstIonization}</span>
                        </div>
                        <div className="rx-inline-item">
                          <span className="rx-mini-key">Bản chất Oxit:</span>
                          <span className="rx-mini-val">{wikiProps.oxideNature}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Quantum Structure & Bohr Model */}
              {activeTab === 'quantum' && (
                <div className="tab-pane-content tab-quantum-content">
                  {/* Atomic Structure: Nucleus & Electron Shells (Mô hình Hạt nhân & Electron) */}
                  <div className="modal-section-box atom-structure-section">
                    <div className="section-title-bar">
                      <span className="section-title text-cyan">⚛ CẤU TRÚC HẠT NHÂN & CÁC LỚP ELECTRON (BOHR MODEL)</span>
                    </div>

                    <div className="atom-structure-layout">
                      <div className="atom-structure-visual">
                        <AtomBohrVisualizer element={element} size={180} />
                      </div>

                      <div className="atom-structure-info">
                        {/* Particles Stat Cards */}
                        <div className="particles-stat-row">
                          <div className="particle-stat-card card-proton">
                            <span className="p-num">{element.atomicNumber}</span>
                            <span className="p-label">Proton (p⁺)</span>
                            <span className="p-sub">Điện tích hạt nhân</span>
                          </div>
                          <div className="particle-stat-card card-neutron">
                            <span className="p-num">{neutrons}</span>
                            <span className="p-label">Neutron (n⁰)</span>
                            <span className="p-sub">Khối lượng ~{element.atomicMass} u</span>
                          </div>
                          <div className="particle-stat-card card-electron">
                            <span className="p-num">{element.atomicNumber}</span>
                            <span className="p-label">Electron (e⁻)</span>
                            <span className="p-sub">{shells.length} lớp vỏ orbit</span>
                          </div>
                        </div>

                        {/* Shell breakdown pills */}
                        <div className="shells-distribution-box">
                          <div className="shells-dist-header">
                            <span className="shells-title">Phân bố electron theo từng lớp (K, L, M, N...):</span>
                            <span className="valence-pill">e⁻ hóa trị ngoài cùng: <b>{valenceElectrons}</b></span>
                          </div>
                          <div className="shells-pills-list">
                            {shells.map((count, idx) => (
                              <div 
                                key={idx} 
                                className="shell-quantum-badge" 
                                title={`Lớp ${SHELL_LETTERS[idx]} (n = ${idx + 1}): ${count} electron`}
                              >
                                <span className="sq-name">Lớp {SHELL_LETTERS[idx]} <small>n={idx + 1}</small></span>
                                <span className="sq-val"><b>{count}</b> e⁻</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantum Configuration Meta Details */}
                  <div className="modal-section-box">
                    <div className="section-title-bar">
                      <span className="section-title">📐 CẤU HÌNH & CHU KỲ LƯỢNG TỬ</span>
                    </div>
                    <div className="quantum-meta-grid">
                      <div className="q-meta-card">
                        <span className="q-meta-k">Cấu hình electron nguyên tử</span>
                        <span className="q-meta-v mono-val">{element.electronConfig || 'Đang cập nhật'}</span>
                      </div>
                      <div className="q-meta-card">
                        <span className="q-meta-k">Số lớp electron</span>
                        <span className="q-meta-v">{shells.length} lớp (K..{SHELL_LETTERS[shells.length - 1]})</span>
                      </div>
                      <div className="q-meta-card">
                        <span className="q-meta-k">Electron lớp ngoài cùng</span>
                        <span className="q-meta-v">{valenceElectrons} electron</span>
                      </div>
                      <div className="q-meta-card">
                        <span className="q-meta-k">Chu kỳ / Phân nhóm</span>
                        <span className="q-meta-v">Chu kỳ {element.period} · {element.group ? `Nhóm ${element.group}` : (element.isLanthanide ? 'Lanthanide' : 'Actinide')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Modal Bottom Footer Strip */}
          <div className="modal-footer-strip">
            <span className="footer-keys-hint">Dùng phím ◄ / ► để duyệt qua các nguyên tố, ESC để đóng</span>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full-Size Specimen View */}
      {isLightboxOpen && hasSpecimen && (
        <div 
          className="specimen-lightbox-backdrop" 
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh phóng to mẫu vật ${primaryName}`}
        >
          <div 
            className="specimen-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              title="Đóng xem lớn (Phím ESC)"
            >
              ✕
            </button>
            
            <div className="lightbox-img-wrapper">
              <img 
                src={specimen.src} 
                alt={`Mẫu vật ${primaryName}`} 
                className="lightbox-img" 
              />
            </div>

            <div className="lightbox-footer">
              <div className="lightbox-title">
                <b>#{element.atomicNumber} {element.symbol} - {primaryName}</b> {hasAltName ? `(${element.nameVi})` : ''}
              </div>
              {specimen.note && <div className="lightbox-note">Mẫu vật: {specimen.note}</div>}
              <div className="lightbox-meta">
                Ảnh: <b>{specimen.credit}</b> · Giấy phép: <b>{specimen.license}</b> · <a href={specimen.sourceUrl} target="_blank" rel="noopener noreferrer">Xem trên Wikimedia Commons ↗</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
