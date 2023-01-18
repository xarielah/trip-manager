import { ActivityType } from "@prisma/client";
import {
  Body,
  createHandler,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { ActivityTypeDto } from "../../../lib/activitytype/activity-type.dto";
import { ActivityTypeService } from "../../../lib/activitytype/activity-type.service";
import type { RelationQuery } from "../../../lib/types/relation-query.type";
import { UtilService } from "../../../lib/util.service";

@autoInjectable()
class ActivityTypeHandler {
  constructor(
    private activityTypeService: ActivityTypeService,
    private utilService: UtilService
  ) {}

  @Get()
  async getAllActivityTypes(
    @Query("relation") relationQuery: RelationQuery
  ): Promise<ActivityType[]> {
    /*
     * Todo: add here an Admin middleware.
     * Only admins can create Activity Types.
     */
    this.utilService.relationQuery(relationQuery);
    return await this.activityTypeService.getAllActivityTypes(relationQuery);
  }

  @Post()
  async createNewActivityType(
    @Body(ValidationPipe) actType: ActivityTypeDto
  ): Promise<ActivityType> {
    return this.activityTypeService.createNewActivityType(actType);
  }
}

export default createHandler(ActivityTypeHandler);
