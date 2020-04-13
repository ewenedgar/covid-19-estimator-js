
const covid19ImpactEstimator = (data) => {
  function days() {
    let numDays;
    if (data.periodType === 'weeks') {
      numDays = Math.trunc(7 * data.timeToElapse);
    } else if (data.periodType === 'months') {
      numDays = Math.trunc(30 * data.timeToElapse);
    } else {
      numDays = data.timeToElapse;
    }
    const rate = Math.trunc(numDays / 3);
    const infectionRate = 2 ** rate;
    return infectionRate;
  }

  const impact = new function () {
    const currentlyInfected = data.reportedCases * 10;
    const infectionsByRequestedTime = (days(data.timeToElapse) * data.reportedCases * 10);
    const severeCasesByRequestedTime = (Math.trunc((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.trunc((
      (35 / 100) * data.totalHospitalBeds)) - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = (Math.trunc((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = (Math.trunc(
      (2) * infectionsByRequestedTime
    ));
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
    const infectionsByRequestedTime = days(data.timeToElapse) * data.reportedCases * 50;
    const severeCasesByRequestedTime = (Math.trunc((15 / 100) * infectionsByRequestedTime));
    const hospitalBedsByRequestedTime = (Math.trunc((
      (35 / 100) * data.totalHospitalBeds)) - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = (Math.trunc((5 / 100) * infectionsByRequestedTime));
    const casesForVentilatorsByRequestedTime = (Math.trunc(
      (2) * infectionsByRequestedTime
    ));
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
