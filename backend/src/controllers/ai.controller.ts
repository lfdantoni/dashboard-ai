import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GeminiService } from '../services/gemini.service';
import { AiAnalysisRequest } from '../entities/ai-analysis-request.entity';
import { AiAnalysisResponse } from '../entities/ai-analysis-response.entity';

@Controller('ai')
@ApiTags('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('analyze')
  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Analyze a prompt using Gemini AI with optional image support (requires Google authentication)',
  })
  @ApiResponse({
    status: 200,
    description: 'Analysis completed successfully',
    type: AiAnalysisResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid or empty prompt',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  async analyzePrompt(
    @Body() request: AiAnalysisRequest,
    @CurrentUser() user: any,
  ): Promise<AiAnalysisResponse> {
    const result = await this.geminiService.analyzePrompt(
      request.prompt,
      request.imageBase64,
      request.mimeType,
    );
    return {
      result,
      timestamp: new Date().toISOString(),
    };
  }
}
