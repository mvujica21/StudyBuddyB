import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

interface JwtPayload {
    sub: string;
    username: string;
  }
  
  interface UserInfo {
    userId: string;
    username: string;
  }
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
      constructor() {
          super({
              jwtFromRequest: ExtractJwt.fromExtractors([
                  (req: Request): string | null => {
                      return req?.cookies?.jwt || null;
                  },
                  ExtractJwt.fromAuthHeaderAsBearerToken(),
              ]),
              ignoreExpiration: false,
              secretOrKey: process.env.JWT_SECRET!
          });
      }
      
      async validate(payload: JwtPayload): Promise<UserInfo> {
          return { userId: payload.sub, username: payload.username };
      }
  }