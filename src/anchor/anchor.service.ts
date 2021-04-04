import { Injectable } from '@nestjs/common';
import { MARKET_DENOMS } from '@anchor-protocol/anchor.js';
import { AnchorLibProvider } from './anchorlib.provider';

@Injectable()
export class AnchorService {
  constructor(private anchorLibProvider: AnchorLibProvider) {}

  async getApy(): Promise<number> {
    const apy = await this.anchorLibProvider.anchor.earn.getAPY({
      market: MARKET_DENOMS.UUSD,
    });

    return apy;
  }

  async getCollateralValue(walletAddress: string): Promise<number | null> {
    try {
      const collateralValue: number = Number(
        await this.anchorLibProvider.anchor.borrow.getCollateralValue({
          market: MARKET_DENOMS.UUSD,
          address: walletAddress,
        }),
      );

      // If collateralValue is not a string number, returns null.
      if (isNaN(collateralValue)) return null;

      return collateralValue;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getBorrowedValue(walletAddress: string): Promise<number | null> {
    const borrowedValue: number = Number(
      await this.anchorLibProvider.anchor.borrow.getBorrowedValue({
        market: MARKET_DENOMS.UUSD,
        address: walletAddress,
      }),
    );

    // If borrowedValue is not a string number, returns null.
    if (isNaN(borrowedValue)) return null;

    return borrowedValue;
  }

  async getBorrowLimit(walletAddress: string): Promise<number | null> {
    const borrowLimit: number = Number(
      await this.anchorLibProvider.anchor.borrow.getBorrowLimit({
        market: MARKET_DENOMS.UUSD,
        address: walletAddress,
      }),
    );

    // If borrowLimit is not a string number, returns null.
    if (isNaN(borrowLimit)) return null;

    return borrowLimit;
  }

  async calculateLtv(
    borrowLimit: number,
    borrowedValue: number,
  ): Promise<number> {
    const ltv: number = borrowedValue / borrowLimit;

    return ltv;
  }

  async getLtv(walletAddress: string): Promise<number> {
    const borrowLimit: number = await this.getBorrowLimit(walletAddress);
    const borrowedValue: number = await this.getBorrowedValue(walletAddress);

    return this.calculateLtv(borrowLimit, borrowedValue);
  }
}
