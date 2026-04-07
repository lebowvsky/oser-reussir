import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion administrateur' })
  @ApiResponse({ status: 200, description: 'Connexion reussie' })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects' })
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    return this.authService.login(user);
  }

  @Put('credentials')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour les identifiants administrateur' })
  @ApiResponse({
    status: 200,
    description: 'Identifiants mis a jour avec succes',
  })
  @ApiResponse({
    status: 401,
    description: 'Mot de passe actuel incorrect',
  })
  async updateCredentials(
    @Request() req: { user: { id: string } },
    @Body() dto: UpdateCredentialsDto,
  ): Promise<{ message: string }> {
    return this.authService.updateCredentials(req.user.id, dto);
  }
}
