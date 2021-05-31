const api = "http://api.football-data.org/v2/competitions";

$(document).ready(function () {
  getData();
});

function getData() {
  $.ajax({
    url: api,
    type: "GET",
    beforeSend: function () {
      console.log("carregando ...");
    },
  })
    .done(function (data) {
      let competitions = formatCompetitions(data);
      showCompetitions(competitions);
      showBrazilianCompetitions(competitions);
    })
    .fail(function (msg) {
      console.log(msg);
    });
}

function showCompetitions(competitions) {
  for (let i = 0; i < competitions.length; i++) {
    $("#competition-data").append("<tr>");
    $("#competition-data").append(
      "<td>" + competitions[i].countryName + "</td>"
    );
    $("#competition-data").append(
      "<td>" + competitions[i].competitionName + "</td>"
    );
    competitions[i].informations !== null
      ? $("#competition-data").append(
          "<td>" + competitions[i].informations.startDate + "</td>"
        )
      : $("#competition-data").append("<td>" + "Sem data definida" + "</td>");
    $("#competition-data").append("</tr>");
  }
}

function showBrazilianCompetitions(competitions) {
  const brazilianCompetitions = competitions.filter(
    (competition) => competition.countryName === "Brazil"
  );

  console.log(brazilianCompetitions);

  for (let i = 0; i < brazilianCompetitions.length; i++) {
    $("#competition-brazil").append("<tr>");
    $("#competition-brazil").append(
      "<td>" + brazilianCompetitions[i].countryName + "</td>"
    );
    $("#competition-brazil").append(
      "<td>" + brazilianCompetitions[i].competitionName + "</td>"
    );
    brazilianCompetitions[i].informations !== null
      ? $("#competition-brazil").append(
          "<td>" + brazilianCompetitions[i].informations.startDate + "</td>"
        )
      : $("#competition-brazil").append("<td>" + "Sem data definida" + "</td>");
    $("#competition-brazil").append("</tr>");
  }
}

function formatCompetitions(data) {
  let formatedCompetitions = [];
  for (let i = 0; i < data.count; i++) {
    let competition = {
      countryName: data.competitions[i].area.name,
      competitionName: data.competitions[i].name,
      informations: data.competitions[i].currentSeason,
    };
    formatedCompetitions.push(competition);
  }
  return formatedCompetitions;
}
