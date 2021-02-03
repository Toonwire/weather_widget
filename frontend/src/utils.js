/**
 * Maps wind degrees on a 16-wind compass rose to its wind-direction.
 * Includes cardinal-/intercardinal directions and bisection of principal winds
 * @see {@link https://en.wikipedia.org/wiki/Points_of_the_compass}
 * @param {number} deg - The number of degrees
 */
const degToDir = (deg) => {
  // only process positive degrees within compass bounds
  deg = Math.abs(deg % 360); 
  if (deg <= 11.25) return 'N'; 
  deg -= 11.25; 

  // all 16 direction on a 16-wind compass
  var allDirections = [
    'NNE', 'NE', 'ENE', 'E',
    'ESE', 'SE', 'SSE', 'S',
    'SSW', 'SW', 'WSW', 'W', 
    'WNW', 'NW', 'NNW', 'N'
  ]; 

  // degrees per direction on wind compass: 360/16 = 22.5 deg
  var index = Math.floor(deg/22.5);
  return allDirections[index] ? allDirections[index] : 'N';
}

/**
 * Mapper function for translating between abbreviated
 * english 16-wind compass directions and their full names in danish 
 * @param {string} dir - Abbreviated international 16-wind compass direction 
 * @example
 * compassDirNameDK('NE') // results in 'Nordøst'
 */
const compassDirNameDK = (dir) => {
  const dirToDKName = {
    "NNE": 	"Nordnordøst",
    "NE": 	"Nordøst",
    "ENE": 	"Østnordøst",
    "E": 	  "Øst",
    "ESE": 	"Østsydøst",
    "SE": 	"Sydøst",
    "SSE": 	"Sydsydøst",
    "S": 	  "Syd",
    "SSW": 	"Sydsydvest",
    "SW": 	"Sydvest",
    "WSW": 	"Vestsydvest",
    "W": 	  "Vest",
    "WNW": 	"Vestnordvest",
    "NW": 	"Nordvest",
    "NNW": 	"Nordnordvest",
    "N": 	  "Nord"
  }
  return dirToDKName[dir];
}

/**
 * Reads the requested parameter of search parameters in the URL. 
 * @returns {string} The requested query parameter value if it exists
 */
const readParamFromUrl = (param) => {
  const queryParams = (new URL(document.location)).searchParams;
  return queryParams.has(param) ? queryParams.get(param) : undefined; 
}

/**
 * Transforms the first n letters into capital letters.
 * @param {string} str - The string to capitalize
 * @param {number} n - The number of capital letters
 * @returns {string} A formatted string of `str` with the first `n` letters capitalized.
 * @example
 * capitalize("checklist", 5) // Results in "CHECKlist"
 */
function capitalize(str, n) {
  return str.slice(0, n).toUpperCase() + str.slice(n);
}

export default {
  degToDir,
  compassDirNameDK,
  readParamFromUrl,
  capitalize
}
