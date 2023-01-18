import { Activity, Prisma, Trip } from "@prisma/client";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { UserService } from "../auth/user.service";
import { PrismaService } from "../prisma.service";
import { TripService } from "../trip/trip.service";

@autoInjectable()
export class ActivityService {
  constructor(
    private tripService: TripService,
    private userService: UserService
  ) {}
  private prisma = PrismaService;

  /**
   * Fetches from database an activity by it's id.
   * @param actId activity id.
   * @param withRelation get results with relations or not.
   * @returns activity data.
   */
  async getActivityById(
    actId: string,
    withRelation?: boolean
  ): Promise<Activity & { trip: Trip }> {
    const foundActivity = await this.prisma.activity.findUnique({
      where: { id: actId },
      include: {
        trip: withRelation ?? false,
      },
    });

    if (!foundActivity)
      throw new NotFoundException(`Activity with id "${actId}" was not found.`);

    return foundActivity;
  }

  /**
   * Creates a new trip for a logged user.
   * @param activityDto activity data transfer object.
   * @param token auth string.
   * @returns activity data.
   */
  async createNewActivity(
    activityDto: Prisma.ActivityCreateManyInput,
    token: string
  ): Promise<Activity> {
    const foundTrip = await this.tripService.getTripById(
      { id: activityDto.tripId },
      token
    );
    if (!foundTrip) throw new UnauthorizedException();

    return this.prisma.activity.create({
      data: {
        ...activityDto,
        targetDate: activityDto.targetDate
          ? new Date(activityDto.targetDate)
          : null,
      },
    });
  }

  /**
   * Deletes a an activity by it's ID.
   * @param actId activity id.
   * @param token token for auth.
   */
  async deleteActivityById(actId: string, token: string): Promise<void> {
    const activity = await this.getActivityById(actId, true);
    const foundUser = await this.userService.getByUserToken(token);

    if (!activity) throw new BadRequestException();
    if (!foundUser) throw new UnauthorizedException();
    if (foundUser.id !== activity.trip.ownerId)
      throw new UnauthorizedException();

    await this.prisma.activity.delete({ where: { id: actId } });
  }
}
