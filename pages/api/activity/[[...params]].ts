import { Activity } from "@prisma/client";
import {
  Body,
  createHandler,
  Delete,
  Get,
  Header,
  Param,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { ActivityDto } from "../../../lib/activity/activity.dto";
import { ActivityService } from "../../../lib/activity/activity.service";
import { UserService } from "../../../lib/auth/user.service";

@autoInjectable()
class ActivityHandler {
  constructor(private activityService: ActivityService) {}

  //! Check if this is needed.
  @Get("/:id")
  async getActivityById(@Param("id") actId: string): Promise<Activity> {
    return this.activityService.getActivityById(actId);
  }

  @Post()
  async createNewActivity(
    @Body(ValidationPipe) activityDto: ActivityDto,
    @Header("Authorization") token: string
  ): Promise<Activity> {
    if (!token) throw new UnauthorizedException();

    return await this.activityService.createNewActivity(activityDto, token);
  }

  @Delete("/:id")
  async deleteActivityById(
    @Param("id") actId: string,
    @Header("Authorization") token: string
  ): Promise<void> {
    await this.activityService.deleteActivityById(actId, token);
  }
}

export default createHandler(ActivityHandler);
