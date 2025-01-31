export const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/website-portfolio' : '';
  return `${basePath}${path}`;
} 