import { Activity, Prisma } from "@prisma/client";
import { NotFoundException } from "next-api-decorators";
import { PrismaService } from "../prisma.service";

export class ActivityService {
  private prisma = PrismaService;

  async getActivityById(actId: string): Promise<Activity> {
    const foundActivity = await this.prisma.activity.findUnique({
      where: { id: actId },
    });

    if (foundActivity) {
      return foundActivity;
    } else {
      throw new NotFoundException(`Activity with id "${actId}" was not found.`);
    }
  }

  async createNewActivity(
    activityDto: Prisma.ActivityCreateManyInput
  ): Promise<Activity> {
    return this.prisma.activity.create({ data: activityDto });
  }
}
