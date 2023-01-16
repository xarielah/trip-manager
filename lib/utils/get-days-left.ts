import moment from "moment";

type DateReturnType = number | null;
type DateArg = string | number | Date;

export function getDaysLeft(startDate: DateArg): DateReturnType {
  let date: DateReturnType = null;
  try {
    const today = moment(new Date(Date.now()));
    const diffDate = moment(new Date(startDate));

    date = diffDate.diff(today, "days");
    return date;
  } catch (error) {
    throw new Error("Cannot cast that value to date");
  }
}
