import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import InfoCards from "../infocards/InfoCards";
import "./IPLData.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
const IPLData = () => {
  const [iplData, setIplData] = useState();
  const [tossDecision, setTossDecision] = useState();
  const [matchLocation, setMatchLocation] = useState();
  const [winningType, setWinningType] = useState();
  const [winnerTeam, setWinnerTeam] = useState();
  const [results, setResults] = useState();
  const [venues, setVenues] = useState();
  const [infoCard1, setInfoCard1] = useState();
  const [matches, setMatches] = useState();

  useEffect(() => {
    handleReadRemoteFile();
    return () => {};
  }, []);

  useEffect(() => {
    if (iplData) {
      dataChart1(iplData);
      dataChart2(iplData);
      dataChart3(iplData);
      dataChart4(iplData);
      dataChart5(iplData);
      dataChart6(iplData);
      datainfoCard1(iplData);
    }
  }, [iplData]);

  const handleReadRemoteFile = () => {
    Papa.parse("/data/matches.csv", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function (result) {
        setIplData(result.data);
      },
    });
  };

  const dataChart1 = (data) => {
    let batCount = 0;
    data.forEach((element) => {
      if (element.toss_decision === "bat") {
        batCount++;
      }
    });
    setTossDecision({
      labels: ["Bat", "Field"],
      datasets: [
        {
          label: "Bat or Field Decision",
          data: [batCount, data.length - batCount],
          backgroundColor: ["rgba(121, 85, 72, 0.5)", "rgba(76, 175, 80, 0.5)"],
          borderColor: ["rgba(121, 85, 72,1)", "rgba(76, 175, 80, 1)"],
          borderWidth: 1,
        },
      ],
    });
  };
  function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const dataChart2 = (data) => {
    let locations = {};
    data.forEach((element) => {
      if (locations[element.city] !== undefined) {
        locations[element.city] += 1;
      } else {
        locations[element.city] = 1;
      }
    });
    const colors = Object.keys(locations).map(() => getRandomColor());
    setMatchLocation({
      labels: [...Object.keys(locations)],
      datasets: [
        {
          label: "Match Location",
          data: [...Object.values(locations)],
          backgroundColor: colors,
          borderColor: Object.keys(locations).map(() => getRandomColor()),
          borderWidth: 1,
        },
      ],
    });
  };
  const getOptions = (text, position = "top") => ({
    responsive: true,
    plugins: {
      legend: {
        position,
      },
      title: {
        display: true,
        text,
      },
    },
  });

  const dataChart3 = (data) => {
    const seasons = [];
    data.forEach((match) => {
      if (!seasons.includes(match.season)) {
        seasons.push(match.season);
      }
    });
    seasons.sort();
    const dataSetForWinByRuns = [];
    const dataSetForWinByWickets = [];
    seasons.map((season) => {
      const seasonData = data.filter((match) => match.season === season);
      let winByWickets = 0,
        winByRuns = 0;
      seasonData.forEach((match) => {
        if (match.win_by_wickets) winByWickets++;
        if (match.win_by_runs) winByRuns++;
      });
      dataSetForWinByRuns.push(winByRuns);
      dataSetForWinByWickets.push(winByWickets);
    });
    setWinningType({
      labels: seasons,
      datasets: [
        {
          label: "Win By Runs",
          data: dataSetForWinByRuns,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Win By Wickets",
          data: dataSetForWinByWickets,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  };

  const dataChart4 = (data) => {
    let winningTeam = {};
    data.forEach((element) => {
      if (winningTeam[element.winner] !== undefined) {
        winningTeam[element.winner] += 1;
      } else {
        winningTeam[element.winner] = 1;
      }
    });
    const colors = Object.keys(winningTeam).map(() => getRandomColor());
    setWinnerTeam({
      labels: [...Object.keys(winningTeam)],
      datasets: [
        {
          label: "Match Location",
          data: [...Object.values(winningTeam)],
          backgroundColor: colors,
          borderColor: Object.keys(winningTeam).map(() => getRandomColor()),
          borderWidth: 1,
        },
      ],
    });
  };

  const dataChart5 = (data) => {
    let resultType = {};
    data.forEach((elements) => {
      if (resultType[elements.result] !== undefined) {
        resultType[elements.result]++;
      } else {
        resultType[elements.result] = 1;
      }
    });

    setResults({
      labels: [...Object.keys(resultType)],
      datasets: [
        {
          label: "Match Type",
          data: [...Object.values(resultType)],
          backgroundColor: [
            "rgba(58, 55, 52,0.5)",
            "rgba(244, 67, 54, 0.5)",
            "rgba(9, 98, 234, 0.5)",
          ],
          borderColor: [
            "rgba(58, 55, 52,1.0)",
            "rgba(244, 67, 54,1)",
            "rgba(9, 98, 234, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const dataChart6 = (data) => {
    let venuesData = {};
    data.forEach((element) => {
      if (venuesData[element.venue] !== undefined) {
        venuesData[element.venue] += 1;
      } else {
        venuesData[element.venue] = 1;
      }
    });
    setVenues({
      labels: [...Object.keys(venuesData)],
      datasets: [
        {
          label: "Match Type",
          data: [...Object.values(venuesData)],
          backgroundColor: Object.keys(venuesData).map(() => getRandomColor()),
          borderColor: Object.keys(venuesData).map(() => getRandomColor()),
          borderWidth: 1,
        },
      ],
    });
  };

  const datainfoCard1 = (data) => {
    let superOvers = 0;
    let matchs = 0;
    data.forEach((element) => {
      if (element.result === "tie") {
        superOvers++;
      }
    });
    matchs = data.length - 1;
    setInfoCard1(superOvers);
    setMatches(matchs);
  };

  return (
    <>
      <div className="infoCards-container">
        <InfoCards
          title="Number of Superovers"
          data={infoCard1}
          text="Number of tie matches"
        />
        <InfoCards
          title="Number of Matches"
          data={matches}
          text="Number of matches played till now"
        />
      </div>
      <div className="chart-container">
        <div className="width-50">
          {tossDecision && (
            <Bar data={tossDecision} options={getOptions("Toss Result Data")} />
          )}
        </div>
        <div className="width-50">
          {winningType && (
            <Line data={winningType} options={getOptions("Winning Type")} />
          )}
        </div>
        <div className="width-50">
          {matchLocation && (
            <Doughnut data={matchLocation} options={getOptions("Match City")} />
          )}
        </div>
        <div className="width-50">
          {winnerTeam && (
            <Pie data={winnerTeam} options={getOptions("Winning Team")} />
          )}
        </div>
        <div className="width-50">
          {results && (
            <Pie data={results} options={getOptions("Result Type")} />
          )}
        </div>
        <div className="width-50">
          {venues && (
            <Pie data={venues} options={getOptions("Match Venue's")} />
          )}
        </div>
      </div>
    </>
  );
};

export default IPLData;
