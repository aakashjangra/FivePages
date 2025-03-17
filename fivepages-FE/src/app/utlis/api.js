const BASE_URL = "http://localhost:5000/api";

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};

export const fetchCarouselImages = async () => fetchData("/carousel-images");
export const fetchPopularBooks = async () => fetchData("/popular-books");
export const fetchNewReleases = async () => fetchData("/new-releases");
