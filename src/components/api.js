const baseURL = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";

export const dataApi = async () => {
  const CACHE_KEY = 'GET/items';
    try {
    const res = await fetch(`${baseURL}`);
    if (!res.ok) {
    console.error("failed", res.status);
      return;
    }
   
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("error : ", error);
  }
  
};