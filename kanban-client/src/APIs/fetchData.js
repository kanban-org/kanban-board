const fetchJsonData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Network error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default fetchJsonData;
