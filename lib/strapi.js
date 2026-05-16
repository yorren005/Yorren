const STRAPI_URL = 'https://inviting-fireworks-bcc4e8bcf5.strapiapp.com';

export { STRAPI_URL };

export async function fetchPosts(section) {
  const endpoint = section === 'grand-picture' ? 'the-grand-pictures' : 'the-syntax-of-minds';
  const res = await fetch(
    `${STRAPI_URL}/api/${endpoint}?populate=*&sort=Date:desc&publicationState=live`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchPost(section, id) {
  const endpoint = section === 'grand-picture' ? 'the-grand-pictures' : 'the-syntax-of-minds';
  const res = await fetch(
    `${STRAPI_URL}/api/${endpoint}/${id}?populate=*`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export function getImageUrl(post) {
  const imageData = post?.attributes?.Image?.data || post?.Image?.data || post?.Image;
  if (!imageData) return null;
  const img = Array.isArray(imageData) ? imageData[0] : imageData;
  if (!img) return null;
  const url = img.attributes?.url || img.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}
