const BASE_URL = "http://localhost:5000/api/v1/";

const fetchData = async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Merge additional headers (e.g., authentication)
      },
      ...(body ? { body: JSON.stringify(body) } : {}), // Only add body if needed
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Try parsing JSON, fallback to null
      throw new Error(errorData?.message || `HTTP ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return { error: error.message }; // Return error message instead of null
  }
};

// ✅ Export specific API calls
export const fetchPopularBooks = () => fetchData("novels/latest/getLatestNovels");
export const fetchNewReleases = () => fetchData("novels/latest/getLatestNovels");
export const fetchCarouselImages = () => fetchData("novels/latest/getLatestNovels");

// ✅ Generic function for dynamic API calls
export const apiRequest = (endpoint, options = {}) => fetchData(endpoint, options);

// ✅ Example Usage:
// apiRequest("user/login", { method: "POST", body: { email, password } });
apiRequest("novels/latest/getLatestNovels", { method: "GET"});
