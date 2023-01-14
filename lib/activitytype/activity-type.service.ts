import { ActivityType, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { RelationQuery } from "../types/relation-query.type";

export class ActivityTypeService {
  private prisma = PrismaService;

  /**
   * Get all activity type availabe.
   * @returns activity types array
   */
  async getAllActivityTypes(
    relationQuery: RelationQuery
  ): Promise<ActivityType[]> {
    return await this.prisma.activityType.findMany({
      include: { activities: relationQuery === "true" },
    });
  }

  /**
   * Creates new Activity Type record.
   * @param {Prisma.ActivityTypeCreateInput} actTypeDto activity type data.
   * @returns activity type data.
   */
  async createNewActivityType(
    actTypeDto: Prisma.ActivityTypeCreateInput
  ): Promise<ActivityType> {
    return this.prisma.activityType.create({ data: actTypeDto });
  }
}
