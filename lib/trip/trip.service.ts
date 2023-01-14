import { Prisma, Trip } from "@prisma/client";
import { NotFoundException } from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import trip from "../../pages/api/trip/[[...params]]";
import { UserService } from "../auth/user.service";
import { PrismaService } from "../prisma.service";
import { RelationQuery } from "../types/relation-query.type";
import { TripDto } from "./dto/trip.dto";

@autoInjectable()
export class TripService {
  constructor(private userService: UserService) {}
  private prisma = PrismaService;

  /**
   * Create a new trip by data.
   * @param data data object.
   * @returns {Trip} trip object.
   */
  async createNewTrip(data: Prisma.TripCreateManyInput): Promise<Trip> {
    return this.prisma.trip.create({ data });
  }

  /**
   * Gets a trip object from db by it's id.
   * @param whereUniqueTripId object with unique value.
   * @param withActivities boolean or null.
   * @returns {Trip | null} trip data or null.
   */
  async getTripById(
    whereUniqueTripId: Prisma.TripWhereUniqueInput,
    withActivities?: RelationQuery
  ): Promise<Trip | null> {
    const foundTrip = await this.prisma.trip.findUnique({
      where: whereUniqueTripId,
      include: {
        activities: withActivities === "true" ? true : false,
      },
    });

    if (foundTrip) {
      return foundTrip;
    } else {
      throw new NotFoundException(
        `Trip id "${whereUniqueTripId.id}" was not found.`
      );
    }
  }

  async getAllTripsByUserId(userId: string): Promise<Trip[]> {
    return await this.prisma.trip.findMany({ where: { ownerId: userId } });
  }
}
