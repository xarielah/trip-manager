import { Trip } from "@prisma/client";
import {
  Body,
  createHandler,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Query,
  UnauthorizedException,
  ValidationPipe,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { UserService } from "../../../lib/auth/user.service";
import { TripDto } from "../../../lib/trip/dto/trip.dto";
import { TripService } from "../../../lib/trip/trip.service";
import type { RelationQuery } from "../../../lib/types/relation-query.type";
import { UtilService } from "../../../lib/util.service";

@autoInjectable()
class TripHandler {
  constructor(
    private tripService: TripService,
    private userService: UserService,
    private utilService: UtilService
  ) {}

  @Post()
  async createNewTrip(
    @Body(ValidationPipe) tripDto: TripDto,
    @Header("Authorization") token: string
  ): Promise<Trip> {
    const user = await this.userService.getByUserToken(token);
    if (!user || user === null) throw new UnauthorizedException();

    return await this.tripService.createNewTrip(tripDto, user, token);
  }

  @Get("/all/:id")
  async getAllTripsByUserId(@Param("id") userId: string) {
    return await this.tripService.getAllTripsByUserId(userId);
  }

  @Get("/:id")
  async getTripById(
    @Param("id") tripId: string,
    @Query("relation") relationQuery: RelationQuery,
    @Header("Authorization") token: string
  ): Promise<Trip | undefined> {
    this.utilService.relationQuery(relationQuery);
    return this.tripService.getTripById({ id: tripId }, token, relationQuery);
  }

  @Delete("/:id")
  async deleteTripById(
    @Param("id") tripId: string,
    @Header("Authorization") token: string
  ): Promise<void> {
    await this.tripService.deleteTripById({ id: tripId }, token);
  }

  @Get("/user/:username")
  async getTripsByUsername(
    @Param("username") username: string,
    @Header("Authorization") token: string
  ): Promise<Trip[] | undefined> {
    return this.tripService.getTripsByUsername(username, token);
  }
}

export default createHandler(TripHandler);
