import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string)
    {
        const user = await this.usersService.findOne(email);

        if (user && user.password === password) {
            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName
            };

            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        }

        return null;
    }
}