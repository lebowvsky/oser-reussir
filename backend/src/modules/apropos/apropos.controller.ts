import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AproposService } from './apropos.service';
import { AproposContent } from './apropos.entity';
import { UpdateAproposDto } from './dto/update-apropos.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

interface UploadedFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@ApiTags('apropos')
@Controller('apropos')
export class AproposController {
  constructor(private readonly aproposService: AproposService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section a propos' })
  @ApiResponse({
    status: 200,
    description: 'Contenu a propos retourne avec succes',
    type: AproposContent,
  })
  async getApropos(): Promise<AproposContent> {
    return this.aproposService.getApropos();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section a propos' })
  @ApiResponse({
    status: 200,
    description: 'Contenu a propos mis a jour avec succes',
    type: AproposContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateApropos(@Body() dto: UpdateAproposDto): Promise<AproposContent> {
    return this.aproposService.updateApropos(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: "Uploader l'image de la section a propos" })
  @ApiBody({
    description: 'Image a uploader (max 2 Mo, formats: jpeg, jpg, png, webp)',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['image'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Image uploadee avec succes',
    type: AproposContent,
  })
  @ApiResponse({ status: 400, description: 'Fichier invalide' })
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|jpg|png|webp)$/ }),
        ],
      }),
    )
    file: UploadedFile,
  ): Promise<AproposContent> {
    return this.aproposService.saveImage(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Supprimer l'image de la section a propos" })
  @ApiResponse({
    status: 200,
    description: 'Image supprimee avec succes',
    type: AproposContent,
  })
  @ApiResponse({ status: 400, description: 'Aucune image a supprimer' })
  async deleteImage(): Promise<AproposContent> {
    return this.aproposService.deleteImage();
  }
}
