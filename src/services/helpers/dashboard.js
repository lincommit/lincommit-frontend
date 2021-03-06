import moment from "moment-timezone";

const IntervalType = {
  ANY_TIME: "ANY_TIME",
  LAST_WEEK: "LAST_WEEK",
  LAST_MONTH: "LAST_MONTH",
  LAST_QUARTER: "LAST_QUARTER",
  LAST_YEAR: "LAST_YEAR",
  NONE: "NONE"
};

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

function buildIntervalQueryParams(interval) {
  let end = moment();
  let start;
  let group;
  let queryParams = {};

  switch (interval) {
    case IntervalType.LAST_WEEK:
      start = moment(end).add(-1, "weeks");
      group = "day";
      break;
    case IntervalType.LAST_MONTH:
      start = moment(end).add(-1, "months");
      group = "day";
      break;
    case IntervalType.LAST_QUARTER:
      start = moment(end)
        .add(-1, "quarters")
        .startOf("quarter");
      group = "month";
      break;
    case IntervalType.LAST_YEAR:
      start = moment(end).add(-1, "years");
      group = "month";
      break;
    case IntervalType.ANY_TIME:
      group = "quarter";
      break;
    case IntervalType.NONE:
      group = "none";
  }

  queryParams.group = group;
  if (start && end) {
    queryParams.start = formatDate(start);
    queryParams.end = formatDate(end);
  }

  return queryParams;
}

export { buildIntervalQueryParams };
