const https = require("https");

exports.handler = async function (event) {
  const apiKey = "aa3a9619af6b7bbc7d7de265173fa642";
  const category = event.queryStringParameters.category || "general";
  const query = event.queryStringParameters.query;

  // Search ya headlines — dono handle hoga
  const url = query
    ? `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${apiKey}`
    : `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&apikey=${apiKey}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: data,
        });
      });
    });
  });
};