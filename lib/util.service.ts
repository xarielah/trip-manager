import { BadRequestException } from "next-api-decorators";
import { RelationQuery } from "./types/relation-query.type";

export class UtilService {
  relationQuery(value: RelationQuery): void {
    if (value && value !== "true" && value !== "false") {
      throw new BadRequestException(
        "Relation query must by string of true or false"
      );
    }
  }
}
