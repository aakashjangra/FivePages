const BASE_URL = "http://localhost:5000/api/v1/";

const fetchData = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error fetching ${endpoint}: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return null; // Return null for better error handling
  }
};

// Export functions to fetch specific data
export const fetchPopularBooks = async () => fetchData("popular-books");
export const fetchNewReleases = async () => fetchData("new-releases");
export const fetchCarouselImages = async () =>
  fetchData("novels/getLatestNovels");




// const BASE_URL = "http://localhost:5000/api/v1/";

// const fetchData = async (endpoint) => {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("API Fetch Error:", error);
//     return [];
//   }
// };

// // export const fetchCarouselImages = async () => fetchData("/carousel-images");
// export const fetchCarouselImages = async () => fetchData("/novels/getLatestNovels");
// export const fetchPopularBooks = async () => fetchData("/popular-books");
// export const fetchNewReleases = async () => fetchData("/new-releases");
