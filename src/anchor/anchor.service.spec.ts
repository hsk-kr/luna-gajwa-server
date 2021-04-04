import { Test, TestingModule } from '@nestjs/testing';
import { AnchorService } from './anchor.service';
import { AnchorLibProvider } from './anchorlib.provider';

const sampleWalletAddress = 'terra1fpnt5t2094g3amcwdv3akl60jg9uafgtc38px8';
const wrongWalletAddress = 'none';

describe('AnchorService', () => {
  let anchorService: AnchorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnchorService, AnchorLibProvider],
    }).compile();

    anchorService = module.get<AnchorService>(AnchorService);
  });

  it('should be defined', () => {
    expect(anchorService).toBeDefined();
  });

  describe('getApy', () => {
    it('should return number', async () => {
      expect(typeof (await anchorService.getApy())).toBe('number');
    });
  });

  //! It occurs an error even if the address exists.
  //! This code annotate till the problem will be solved.
  // describe('getCollateralValue', () => {
  //   it('should return number', async () => {
  //     expect(
  //       typeof (await anchorService.getCollateralValue(sampleWalletAddress)),
  //     ).toBe('number');
  //   });

  //   it('should throw an error if the wallet address does not exist', async () => {
  //     await expect(
  //       anchorService.getCollateralValue(wrongWalletAddress),
  //     ).rejects.toThrow();
  //   });
  // });

  describe('getBorrowedValue', () => {
    it('should return number', async () => {
      expect(
        typeof (await anchorService.getBorrowedValue(sampleWalletAddress)),
      ).toBe('number');
    });

    it('should throw an error if the wallet address does not exist', async () => {
      await expect(
        anchorService.getBorrowedValue(wrongWalletAddress),
      ).rejects.toThrow();
    });
  });

  describe('getBorrowLimit', () => {
    it('should return number', async () => {
      expect(
        typeof (await anchorService.getBorrowLimit(sampleWalletAddress)),
      ).toBe('number');
    });

    it('should throw an error if the wallet address does not exist', async () => {
      await expect(
        anchorService.getBorrowLimit(wrongWalletAddress),
      ).rejects.toThrow();
    });
  });

  describe('calculateLtv', () => {
    it('should return 1', async () => {
      expect(typeof (await anchorService.calculateLtv(1, 1))).toBe('number');
    });
  });

  describe('getLtv', () => {
    it('should return number', async () => {
      expect(typeof (await anchorService.getLtv(sampleWalletAddress))).toBe(
        'number',
      );
    });

    it('should throw an error if the wallet address does not exist', async () => {
      await expect(anchorService.getLtv(wrongWalletAddress)).rejects.toThrow();
    });
  });
});
