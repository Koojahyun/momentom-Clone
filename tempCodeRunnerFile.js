.then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let sidoName = json.administrative_area_level_1;
      console.log(sidoName);
      if (sidoName === "서울특별시") {
        sidoName = "서울";
      } else if (sidoName === "경기도") {