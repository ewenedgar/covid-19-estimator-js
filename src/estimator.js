
const covid19ImpactEstimator = (data) => {
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
  function Days() {
    let numDays;
    if (data.periodType === 'weeks') {
      numDays = (7 * data.timeToElapse);
    } else if (data.periodType === 'months') {
      numDays = (30 * data.timeToElapse);
    } else {
      numDays = data.timeToElapse;
    }
    return numDays;
  }

  const impact = new function () {
    const currentlyInfected = data.reportedCases * 10;
    const infectionsByRequestedTime = (days(data.timeToElapse) * data.reportedCases * 10);
    const severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.trunc((
      (35 / 100) * data.totalHospitalBeds) - severeCasesByRequestedTime));
    const casesForICUByRequestedTime = (Math.floor((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = (Math.ceil(
      infectionsByRequestedTime * (2 / 100) - 0.2555
    ));
    const dollarsInFlight = Math.trunc(((
      infectionsByRequestedTime * data.region.avgDailyIncomePopulation * (
        data.region.avgDailyIncomeInUSD)) / (Days(data.timeToElapse))).toFixed());

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
    const infectionsByRequestedTime = days(data.timeToElapse) * data.reportedCases * 50;
    const severeCasesByRequestedTime = (Math.floor((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.trunc((
      (35 / 100) * data.totalHospitalBeds) - severeCasesByRequestedTime));
    const casesForICUByRequestedTime = Number(Math.floor((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = Number(Math.ceil(
      infectionsByRequestedTime * (2 / 100) - 0.255
    ));
    const dollarsInFlight = Math.trunc((
      infectionsByRequestedTime * data.region.avgDailyIncomePopulation * (
        data.region.avgDailyIncomeInUSD)) / (Days(data.timeToElapse)));

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
