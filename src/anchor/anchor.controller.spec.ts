import { Test, TestingModule } from '@nestjs/testing';
import { AnchorController } from './anchor.controller';
import { AnchorService } from './anchor.service';
import { AnchorLibProvider } from './anchorlib.provider';

const sampleWalletAddress = 'nomatter';

describe('AnchorController', () => {
  let anchorController: AnchorController;
  let anchorService: AnchorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnchorController],
      providers: [AnchorService, AnchorLibProvider],
    }).compile();

    anchorController = module.get<AnchorController>(AnchorController);
    anchorService = module.get<AnchorService>(AnchorService);
  });

  it('should be defined', () => {
    expect(anchorController).toBeDefined();
    expect(anchorService).toBeDefined();
  });

  describe('getApy', () => {
    it('returned value should have a property apy', async () => {
      const apy = 1;
      jest.spyOn(anchorService, 'getApy').mockImplementation(async () => apy);

      expect(await anchorController.getApy()).toMatchObject({
        apy,
      });
    });
  });

  describe('getCollateralValue', () => {
    it('returned value should have a property collateralValue', async () => {
      const collateralValue = 1;
      jest
        .spyOn(anchorService, 'getCollateralValue')
        .mockImplementation(async () => collateralValue);

      expect(
        await anchorController.getCollateralValue(sampleWalletAddress),
      ).toMatchObject({
        collateralValue,
      });
    });

    it('should throw an error if the wallet address does not exist', async () => {
      const collateralValue = null;
      jest
        .spyOn(anchorService, 'getCollateralValue')
        .mockImplementation(async () => collateralValue);

      await expect(
        anchorController.getBorrowedValue(sampleWalletAddress),
      ).rejects.toThrow();
    });
  });

  describe('getBorrowedValue', () => {
    it('should return number', async () => {
      const borrowedValue = 1;
      jest
        .spyOn(anchorService, 'getBorrowedValue')
        .mockImplementation(async () => borrowedValue);

      expect(
        await anchorController.getBorrowedValue(sampleWalletAddress),
      ).toMatchObject({
        borrowedValue,
      });
    });

    it('should throw an error if the wallet address does not exist', async () => {
      const borrwedValue = null;
      jest
        .spyOn(anchorService, 'getBorrowedValue')
        .mockImplementation(async () => borrwedValue);

      await expect(
        anchorController.getBorrowedValue(sampleWalletAddress),
      ).rejects.toThrow();
    });
  });

  describe('getLtv', () => {
    it('should return number', async () => {
      const fakeValue = 1;
      jest
        .spyOn(anchorService, 'getBorrowLimit')
        .mockImplementation(async () => fakeValue);
      jest
        .spyOn(anchorService, 'getBorrowedValue')
        .mockImplementation(async () => fakeValue);
      jest
        .spyOn(anchorService, 'getLtv')
        .mockImplementation(async () => fakeValue);

      expect(await anchorController.getLtv(sampleWalletAddress)).toMatchObject({
        borrowLimit: fakeValue,
        borrowedValue: fakeValue,
        ltv: fakeValue,
      });
    });

    it('should throw an error if the wallet address does not exist', async () => {
      const fakeValue = null;
      jest
        .spyOn(anchorService, 'getBorrowLimit')
        .mockImplementation(async () => fakeValue);
      jest
        .spyOn(anchorService, 'getBorrowedValue')
        .mockImplementation(async () => fakeValue);
      jest
        .spyOn(anchorService, 'getLtv')
        .mockImplementation(async () => fakeValue);

      await expect(
        anchorController.getLtv(sampleWalletAddress),
      ).rejects.toThrow();
    });
  });
});
