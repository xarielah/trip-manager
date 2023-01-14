import { Activity } from "@prisma/client";
import {
  Body,
  createHandler,
  Get,
  Param,
  Post,
  ValidationPipe,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { ActivityDto } from "../../../lib/activity/activity.dto";
import { ActivityService } from "../../../lib/activity/activity.service";

@autoInjectable()
class ActivityHandler {
  constructor(private activityService: ActivityService) {}

  @Get("/:id")
  async getActivityById(@Param("id") actId: string): Promise<Activity> {
    return this.activityService.getActivityById(actId);
  }

  @Post()
  async createNewActivity(
    @Body(ValidationPipe) activityDto: ActivityDto
  ): Promise<Activity> {
    return this.activityService.createNewActivity(activityDto);
  }
}

export default createHandler(ActivityHandler);
