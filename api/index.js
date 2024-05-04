import axios from "axios";
const key = process.env.EXPO_PUBLIC_API_KEY;
console.log("====================================");
console.log(key);
console.log("====================================");
const api_url = `https://pixabay.com/api/?key=${key}`;

const formatUrl = (params) => {
  let url = api_url + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log("====================================");
  console.log(url);
  console.log("====================================");
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    console.log("====================================");
    console.log(data.hits.length);
    console.log("====================================");
    if (data.hits.length === 0) {
      return { success: false, message: "Sorry, No results found" };
    }
    return { success: true, data };
  } catch (err) {
    console.log("Got error", err.message);
    return { success: false, message: err.message };
  }
};
