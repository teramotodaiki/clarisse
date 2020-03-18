const fetch = require('node-fetch');

exports.getRegionName = async ip => {
  const url = `http://api.ipinfodb.com/v3/ip-city/?key=${process.env.IPINFODB_API_KEY}&ip=${ip}&format=json`;
  const response = await fetch(url);
  const json = await response.text();
  const result = JSON.parse(json);
  return result.regionName;
};
