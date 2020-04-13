
const covid19ImpactEstimator = () => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 7,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  function days() {
    let numDays;
    if (data.periodType === 'weeks') {
      numDays = Math.floor(7 * data.timeToElapse);
    } else if (data.periodType === 'months') {
      numDays = Math.floor(30 * data.timeToElapse);
    } else {
      numDays = data.timeToElapse;
    }
    const rate = Math.floor(numDays / 3);
    const infectionRate = 2 ** rate;
    return infectionRate;
  }

  const impact = new function () {
    const currentlyInfected = data.reportedCases * 10;
    const infectionsByRequestedTime = (days(data.timeToElapse) * currentlyInfected);
    const severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.floor(severeCasesByRequestedTime - (
      (35 / 100) * data.totalHospitalBeds)));
    const casesForICUByRequestedTime = (Math.floor((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = (Math.floor((2 / 100) * infectionsByRequestedTime));
    const dollarsInFlight = parseFloat((infectionsByRequestedTime * 0.65 * (
      data.region.avgDailyIncomeInUSD) * (days(data.timeToElapse))).toFixed(2));

    this.currentlyInfected = currentlyInfected;
    this.infectionsByRequestedTime = infectionsByRequestedTime;
    this.severeCasesByRequestedTime = severeCasesByRequestedTime;
    this.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime;
    this.casesForICUByRequestedTime = casesForICUByRequestedTime;
    this.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime;
    this.dollarsInFlight = dollarsInFlight;
  }();

  const severeImpact = new function () {
    const currentlyInfected = data.reportedCases * 50;
    const infectionsByRequestedTime = days(data.timeToElapse) * currentlyInfected;
    const severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.floor(severeCasesByRequestedTime - (
      (35 / 100) * data.totalHospitalBeds)));
    const casesForICUByRequestedTime = (Math.floor((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = (Math.floor((0.2) * infectionsByRequestedTime));
    const dollarsInFlight = parseFloat((infectionsByRequestedTime * 0.65 * (
      data.region.avgDailyIncomeInUSD) * (days(data.timeToElapse))).toFixed(2));

    this.currentlyInfected = currentlyInfected;
    this.infectionsByRequestedTime = infectionsByRequestedTime;
    this.severeCasesByRequestedTime = severeCasesByRequestedTime;
    this.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime;
    this.casesForICUByRequestedTime = casesForICUByRequestedTime;
    this.casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTime;
    this.dollarsInFlight = dollarsInFlight;
  }();
  // const estimate = { impact, severeImpact };

  return { data, impact, severeImpact };
};

// console.log(covid19ImpactEstimator(data));

// const covid19ImpactEstimator = (data) => data;

export default covid19ImpactEstimator;
