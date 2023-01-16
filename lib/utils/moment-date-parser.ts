import moment from "moment";

export function parseHumanDate(date: string | Date): string {
  return moment(date).format("DD/MM/YYYY");
}
