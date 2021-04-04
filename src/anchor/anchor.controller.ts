import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnchorService } from './anchor.service';

// Interfaces
import {
  GetYearApyResponse,
  GetCollateralValueResponse,
  GetBorrowedValueResponse,
  GetLtvResponse,
  ErrorResponse,
} from './interfaces/controller-responses.interface';

@Controller('anchor')
export class AnchorController {
  constructor(private anchorService: AnchorService) {}

  @Get('year_apr')
  async getYearApy(): Promise<GetYearApyResponse | ErrorResponse> {
    try {
      const yearApy: number = await this.anchorService.getYearApy();

      return {
        yearApy,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('collateral_value/:walletAddress')
  async getCollateralValue(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetCollateralValueResponse | ErrorResponse> {
    try {
      const collateralValue: number = await this.anchorService.getCollateralValue(
        walletAddress,
      );

      if (collateralValue === null) throw new Error('There is no the wallet');

      return {
        collateralValue,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('borrowed_value/:walletAddress')
  async getBorrowedValue(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetBorrowedValueResponse | ErrorResponse> {
    try {
      const borrowedValue: number = await this.anchorService.getBorrowedValue(
        walletAddress,
      );

      if (borrowedValue === null) throw new Error('There is no the wallet');

      return {
        borrowedValue,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('ltv/:walletAddress')
  async getLtv(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetLtvResponse | ErrorResponse> {
    try {
      const borrowedValue: number = await this.anchorService.getBorrowedValue(
        walletAddress,
      );
      if (borrowedValue === null) throw new Error('There is no the wallet');

      const borrowLimit: number = await this.anchorService.getBorrowLimit(
        walletAddress,
      );
      if (borrowLimit === null) throw new Error('There is no the wallet');

      const ltv = await this.anchorService.calculateLtv(
        borrowLimit,
        borrowedValue,
      );

      return {
        borrowLimit,
        borrowedValue,
        ltv,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
