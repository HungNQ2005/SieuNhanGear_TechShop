import { API } from '../constants/apiURL';

export function getAvatarUri(url) {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }
  const baseUrl = API.BASE_API_URL.endsWith('/')
    ? API.BASE_API_URL.slice(0, -1)
    : API.BASE_API_URL;
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${path}`;
}
