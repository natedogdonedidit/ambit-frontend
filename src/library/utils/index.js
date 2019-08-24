const monthToFloat = month => {
  if (month === 'Jan') return 0.01;
  if (month === 'Feb') return 0.02;
  if (month === 'Mar') return 0.03;
  if (month === 'Apr') return 0.04;
  if (month === 'May') return 0.05;
  if (month === 'Jun') return 0.06;
  if (month === 'Jul') return 0.07;
  if (month === 'Aug') return 0.08;
  if (month === 'Sep') return 0.09;
  if (month === 'Oct') return 0.1;
  if (month === 'Nov') return 0.11;
  if (month === 'Dec') return 0.12;
  return 0;
};

// order experiences
const sortExperiences = (a, b) => {
  const yearAs = a.startDateYear;
  const monthAs = monthToFloat(a.startDateMonth);
  const yearAe = a.endDateYear;
  const monthAe = monthToFloat(a.endDateMonth);
  // if its your current role, sort by start date, else sort by end date
  const totalA = a.currentRole ? 5000 + yearAs + monthAs : yearAe + monthAe;

  const yearBs = b.startDateYear;
  const monthBs = monthToFloat(b.startDateMonth);
  const yearBe = b.endDateYear;
  const monthBe = monthToFloat(b.endDateMonth);
  // if its your current role, sort by start date, else sort by end date
  const totalB = b.currentRole ? 5000 + yearBs + monthBs : yearBe + monthBe;

  if (totalA > totalB) {
    return -1;
  }

  return 1;
};

export { monthToFloat };
export { sortExperiences };
