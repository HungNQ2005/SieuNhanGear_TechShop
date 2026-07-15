import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { View, Text, ActivityIndicator } from 'react-native';
import TextIntl from '../../common/TextIntl';
import { useLocalization } from '../../providers/LocalizationProvider';
import api from '../../services/api';
import { styles } from './ViewShowroom.styles';
import { TEXT_NO_PRODUCTS, TEXT_SHOWROOM_LABEL, TEXT_SHOWROOM_SUBLABEL, TEXT_SHOWROOM_ERROR_LOAD } from '../../constants/i18nKeys';
import { API } from '../../constants/apiURL';
import { EXTERNAL_CONSTANTS } from '../../constants/externalConstants';







function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;',
  }[c]));
}

export default function ViewShowroom() {
  useLocalization();
  const [loading, setLoading] = useState(true);
  const [showrooms, setShowrooms] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const tNoProducts = TEXT_NO_PRODUCTS;
  const tErrorLoad = TEXT_SHOWROOM_ERROR_LOAD;


  const listRef = useRef(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedId, setSelectedId] = useState(null);



  const getPopupContent = (r) => {
    if (!L) return '';

    const name = escapeHtml(r.name);
    const address = escapeHtml(r.address || '');
    const phone = escapeHtml(r.phone || '');
    const website = r.website
      ? `<br>🌐 <a href="${escapeHtml(r.website)}" target="_blank" style="color:#2563eb; text-decoration:none;">${escapeHtml(r.website)}</a>`
      : '';

    return `<b>${name}</b><br>${address}<br>☎️ ${phone}${website}`;
  };

  const centerOnShowroom = (r) => {
    if (!mapInstanceRef.current) return;
    if (!r?.latitude || !r?.longitude) return;

    mapInstanceRef.current.setView([r.latitude, r.longitude], 15);

    const idx = markersRef.current.findIndex((m) => m.__showroomId === r.id);
    if (idx >= 0) markersRef.current[idx].openPopup();
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.get(API.GET_SHOWROOM);

      const data = Array.isArray(res.data) ? res.data : [];
      if (!Array.isArray(res.data)) {
        console.error('ViewShowroom: unexpected response shape', typeof res.data, res.data);
      }

      setShowrooms(data);

      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    } catch (err) {
      console.error('ViewShowroom fetch error:', err?.response?.status, err?.response?.data || err?.message);
      setErrorMsg(tErrorLoad);

      setShowrooms([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Leaflet loaded via bundle; only load showroom data here
    loadData();
  }, []);


  useEffect(() => {
    if (!L) return;

    if (mapInstanceRef.current) return;

    const tryInit = () => {
      if (!mapRef.current) return;

      const center = [16.047079, 108.206230];
      const map = L.map(mapRef.current).setView(center, 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

      mapInstanceRef.current = map;
    };

    // mapRef.current có thể chưa sẵn ở lần effect đầu tiên (react-native-web)
    if (mapRef.current) {
      tryInit();
      return;
    }

    let attempts = 0;
    const intervalId = setInterval(() => {
      attempts += 1;
      if (mapInstanceRef.current) {
        clearInterval(intervalId);
        return;
      }
      if (attempts >= 80) {
        // ~4s max
        clearInterval(intervalId);
        return;
      }
      tryInit();
    }, 50);

    return () => clearInterval(intervalId);
  }, []);





  useEffect(() => {
    if (!L) return;
    const map = mapInstanceRef.current;

    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Use HTML-based marker to avoid missing leaflet image assets in bundler/web environment
    const markerIconHtml = `
      <div
        style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;"
        title="Showroom">
        <div style="background:#fff;border:2px solid #2563eb;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>
    `;

    const markerIcon = L.divIcon({
      className: 'sn-gear-marker-wrapper',
      html: markerIconHtml,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });


    showrooms.forEach((r) => {
      if (!r?.latitude || !r?.longitude) return;

      const marker = L.marker([r.latitude, r.longitude], { icon: markerIcon })
        .addTo(map)
        .bindPopup(getPopupContent(r));

      marker.__showroomId = r.id;
      markersRef.current.push(marker);
    });


    const selected = showrooms.find((s) => s.id === selectedId) || showrooms[0];
    if (selected) centerOnShowroom(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showrooms, selectedId]);

  const listItems = useMemo(() => {
    return showrooms.map((r) => {
      const isActive = String(r.id) === String(selectedId);
      return (
        <div
          key={r.id}
          className={isActive ? 'branch branchActive' : 'branch'}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#F1F5F9',
            backgroundColor: isActive ? '#EFF6FF' : '#FFFFFF',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedId(r.id)}
        >
          <Text style={{ fontWeight: '700', color: '#0F172A', fontSize: 14, marginBottom: 4 }}>
            {r.name}
          </Text>
          <br></br>
          <Text style={{ color: '#475569', fontSize: 12, marginBottom: 2 }}>{r.address || ''}</Text>
          <br></br>
          <Text style={{ color: '#475569', fontSize: 12 }}>☎️ {r.phone || ''}</Text>
        </div>
      );
    });
  }, [showrooms, selectedId]);

  if (loading) {
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <TextIntl tx={TEXT_SHOWROOM_LABEL} style={styles.title} />
          <TextIntl tx={TEXT_SHOWROOM_SUBLABEL} style={styles.subtitle} />
        </View>
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TextIntl tx={TEXT_SHOWROOM_LABEL} style={styles.title} />
        <TextIntl tx={TEXT_SHOWROOM_SUBLABEL} style={styles.subtitle} />
      </View>

      <View style={styles.content}>
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        {!errorMsg && showrooms.length === 0 ? (
          <View>
            <TextIntl tx={tNoProducts} />
          </View>
        ) : (
          <View style={styles.grid}>
            <div
              ref={listRef}
              style={{ width: 340, maxWidth: '40%', backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}
            >
              {listItems}
            </div>

            <div ref={mapRef} style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', minHeight: 520 }} />
          </View>
        )}
      </View>
    </View>
  );
}

