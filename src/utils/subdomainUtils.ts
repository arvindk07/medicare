
export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // For localhost development, we'll check for specific ports or use query params
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const urlParams = new URLSearchParams(window.location.search);
    const tenant = urlParams.get('tenant');
    return tenant || 'main';
  }
  
  // For production, extract subdomain
  if (parts.length > 2) {
    return parts[0];
  }
  
  return 'main';
};

export const getTenantType = () => {
  const subdomain = getSubdomain();
  
  switch (subdomain) {
    case 'organization':
    case 'org':
      return 'organization';
    case 'user':
    case 'patient':
      return 'patient';
    case 'therapist':
    case 'therapy':
      return 'therapist';
    case 'master':
    case 'admin':
      return 'master';
    default:
      return 'main';
  }
};
