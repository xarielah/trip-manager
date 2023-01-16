import { Prisma, User } from "@prisma/client";
import { autoInjectable } from "tsyringe";
import { PrismaService } from "../prisma.service";
import { JwtService } from "./jwt.service";

@autoInjectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  private prisma = PrismaService;

  async get(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.prisma.user.update({ data, where });
  }

  async getByUserToken(token: string): Promise<User | null> {
    const jwtPayload = await this.jwtService.getPayload(token);
    return this.prisma.user.findUnique({
      where: { username: jwtPayload.username },
    });
  }
}
