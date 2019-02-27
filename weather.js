const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const WEATHER_API_KEY = "32c316718dc7acbcc167e3db6ab5c7ee";

const airpollution = document.querySelector(".js-air");
const AIR_API_KEY =
  "iLYuVs8WYcDOzn9JW6GMSd7DHVVon2A52yMPRs7fkEzQfXGasXiNySwup6teqbgGqLFZgKsgTpSnNGS6yineyg%3D%3D";

const LOCATION_API_KEY = "AIzaSyBEPuOLDxq6dcpImC3GAtrGzKfo3ivMcv0";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
  getSido(latitude, longitude);
}

function handleGeoError(position) {
  console.log("user denied providing location info");
}
function getSido(lat, lon) {
  // let sidoName;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${LOCATION_API_KEY}&result_type=administrative_area_level_1&language=ko`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      var filtered_array = json.results[0].address_components.filter(function(address_component) {
        return address_component.types.includes("administrative_area_level_1");
      });

      let sidoName = filtered_array.length ? filtered_array[0].long_name : "";
      console.log(sidoName);

      if (sidoName === `서울특별시`) {
        sidoName = `서울`;
      } else if (sidoName === `경기도`) {
        sidoName = `경기`;
      } else if (sidoName === "부산광역시") {
        sidoName = "부산";
      } else if (sidoName === "대구광역시") {
        sidoName = "대구";
      } else if (sidoName === "충청남도") {
        sidoName = "충남";
      } else if (sidoName === "인천광역시") {
        sidoName = "인천";
      } else if (sidoName === "충청북도") {
        sidoName = "충북";
      } else if (sidoName === "광주광역시") {
        sidoName = "광주";
      } else if (sidoName === "대전광역시") {
        sidoName = "대전";
      } else if (sidoName === "강원도") {
        sidoName = "강원";
      } else if (sidoName === "울산광역시") {
        sidoName = "울산";
      } else if (sidoName === "전라북도") {
        sidoName = "전북";
      } else if (sidoName === "전라남도") {
        sidoName = "전남";
      } else if (sidoName === "경상북도") {
        sidoName = "경북";
      } else if (sidoName === "경상남도") {
        sidoName = "경남";
      } else if (sidoName === "제주도") {
        sidoName = "제주";
      }
      getAir(sidoName);
    });
}
function getAir(sidoName) {
  fetch(
    `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=1&numOfRows=10&ServiceKey=${AIR_API_KEY}&ver=1.3&_returnType=json`
  )
    // $.ajax({
    //   url: `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=1&numOfRows=10&ServiceKey=${AIR_API_KEY}&ver=1.3&_returnType=json`,
    //   datatype: "jsonp",

    //   success: function(data) {
    //     const air = data.list[0].pm25Grade1h;
    //     console.log(air);
    //     if (air === "1") {
    //       airpollution.innerHTML = `미세먼지 농도 좋음`;
    //     } else if (air === "2") {
    //       airpollution.innerHTML = `미세먼지 농도 보통`;
    //     } else if (air === "3") {
    //       airpollution.innerHTML = `미세먼지 농도 나쁨`;
    //     } else if (air === "4") {
    //       airpollution.innerHTML = `미세먼지 농도 매우나쁨`;
    //     }
    //   },
    //   error: function(xhr) {
    //     console.log("failed", xhr);
    //   }
    // });
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // var filtered_array = json.list[0].properties.pm10Grade1(function(properties) {
      //   return properties.item.includes("pm10Grade1H");
      // });
      // const air = filtered_array.length ? filtered_array[0].pm10Grade1H : "";
      // const air = json.pm10Grade1H;
      const air = json.list[0].pm25Grade1h;
      console.log(air);
      if (air === "1") {
        airpollution.innerHTML = `미세먼지 농도 좋음`;
      } else if (air === "2") {
        airpollution.innerHTML = `미세먼지 농도 보통`;
      } else if (air === "3") {
        airpollution.innerHTML = `미세먼지 농도 나쁨`;
      } else if (air === "4") {
        airpollution.innerHTML = `미세먼지 농도 매우나쁨`;
      }
    })
    .catch(function(error) {
      console.log("Request Failed", error);
    });
  // var xhr = new XMLHttpRequest();
  // xhr.open(
  //   "GET",
  //   `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=1&numOfRows=10&ServiceKey=${AIR_API_KEY}&ver=1.3&_returnType=json`,
  //   true
  // );
  // console.log("success");
  // xhr.send();
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //getWeather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
    getSido(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
