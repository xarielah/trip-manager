import { jwtVerify } from "jose";

export async function jwtPayload(token: string): Promise<any> {
  try {
    const secretKey = process.env.JWT_SECRET;
    const result = await jwtVerify(token, new TextEncoder().encode(secretKey));
    return result.payload;
  } catch (error) {
    return null;
  }
}
