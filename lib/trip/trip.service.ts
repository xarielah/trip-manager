import { Prisma, Trip } from "@prisma/client";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "next-api-decorators";
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
    token: string,
    withActivities?: RelationQuery
  ): Promise<Trip | undefined> {
    const foundUser = await this.userService.getByUserToken(token);

    if (foundUser) {
      const foundTrip = await this.prisma.trip.findUnique({
        where: whereUniqueTripId,
        include: {
          activities:
            withActivities === "true"
              ? {
                  include: {
                    type: true,
                  },
                }
              : false,
        },
      });

      if (foundTrip) {
        if (foundTrip.ownerId === foundUser.id) {
          return foundTrip;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new NotFoundException(
          `Trip id "${whereUniqueTripId.id}" was not found.`
        );
      }
    }
  }

  /**
   * Get all trips by user id.
   * @param {String} userId user id.
   * @returns trip data.
   */
  async getAllTripsByUserId(userId: string): Promise<Trip[]> {
    return await this.prisma.trip.findMany({ where: { ownerId: userId } });
  }

  /**
   * Get trip by unique username.
   * @param {String} username username string.
   * @returns trip data.
   */
  async getTripsByUsername(
    username: string,
    token: string
  ): Promise<Trip[] | undefined> {
    if (!token || token === "") {
      throw new UnauthorizedException();
    }

    if (token) {
      const foundUser = await this.userService.get({ username: username });
      const authUser = await this.userService.getByUserToken(token);

      if (foundUser && authUser) {
        if (foundUser.id === authUser.id || foundUser.rule === "ADMIN") {
          return await this.prisma.trip.findMany({
            where: { ownerId: foundUser.id },
          });
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new BadRequestException();
      }
    }
  }

  /**
   * Deleting a trip by its id.
   * @param tripId trip id
   */
  async deleteTripById(
    tripId: Prisma.TripWhereUniqueInput,
    token: string
  ): Promise<void> {
    const foundUser = await this.userService.getByUserToken(token);
    const foundTrip = await this.getTripById(tripId, token);

    if (foundUser && foundTrip) {
      if (foundUser.id === foundTrip.ownerId) {
        await this.prisma.trip.delete({ where: tripId });
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
