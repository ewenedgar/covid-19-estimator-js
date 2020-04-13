const data = {
  region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 28,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const covid19ImpactEstimator = (data)=>{

  function days(num) {
    let day = 1,
      numDays,
      numWeeks, nMonths;
    if (data.periodType === 'weeks') {
      numDays = Math.floor(7 * num);
    }
    if (data.periodType === 'months') {
      numDays = Math.floor(30 * num);

    } else {
      numDays = num;
    }
    let rate = Math.floor(numDays / 3);
    let infectionRate = 1;
    while (day <= rate) {
      infectionRate *= 2;
      day++;
    }
    return infectionRate;
  }

  const impact = new function () {
    let currentlyInfected = data.reportedCases * 10;
    let infectionsByRequestedTime = (days(data.timeToElapse) * currentlyInfected);
    let severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    let hospitalBedsByRequestedTime = (Math.floor(severeCasesByRequestedTime - ((35 / 100) * data.totalHospitalBeds)));
    let casesForICUByRequestedTime = (Math.floor((05 / 100) * infectionsByRequestedTime));
    let casesForVentilatorsByRequestedTime = (Math.floor((02 / 100) * infectionsByRequestedTime));
    let dollarsInFlight = parseFloat((infectionsByRequestedTime * 0.65 * (data.region.avgDailyIncomeInUSD) * (days(data.timeToElapse))).toFixed(2));

    this.currentlyInfected = currentlyInfected;
    this.infectionsByRequestedTime = infectionsByRequestedTime;
    this.severeCasesByRequestedTime = severeCasesByRequestedTime;
    this.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime;
    this.casesForICUByRequestedTime = casesForICUByRequestedTime;
    this.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime;
    this.dollarsInFlight = dollarsInFlight;

  };

  const severeImpact = new function () {
    let currentlyInfected = data.reportedCases * 50;
    let infectionsByRequestedTime = days(data.timeToElapse) * currentlyInfected;
    let severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    let hospitalBedsByRequestedTime = (Math.floor(severeCasesByRequestedTime - ((35 / 100) * data.totalHospitalBeds)));
    let casesForICUByRequestedTime = (Math.floor((05 / 100) * infectionsByRequestedTime));
    let casesForVentilatorsByRequestedTime = (Math.floor((02 / 100) * infectionsByRequestedTime));
    let dollarsInFlight = parseFloat((infectionsByRequestedTime * 0.65 * (data.region.avgDailyIncomeInUSD) * (days(data.timeToElapse))).toFixed(2));

    this.currentlyInfected = currentlyInfected;
    this.infectionsByRequestedTime = infectionsByRequestedTime;
    this.severeCasesByRequestedTime = severeCasesByRequestedTime;
    this.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime;
    this.casesForICUByRequestedTime = casesForICUByRequestedTime;
    this.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime;
    this.dollarsInFlight = dollarsInFlight;
  };
  let estimate = { impact, severeImpact };

    return {data, impact, severeImpact };

   // return  { data, estimate };

} 

 console.log(covid19ImpactEstimator(data));

 // const covid19ImpactEstimator = (data) => data;

 export default covid19ImpactEstimator;
