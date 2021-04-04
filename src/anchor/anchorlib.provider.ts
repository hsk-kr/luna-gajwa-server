import { Injectable } from '@nestjs/common';
import { LCDClient } from '@terra-money/terra.js';
import {
  Anchor,
  columbus4,
  AddressProviderFromJson,
  AddressProvider,
} from '@anchor-protocol/anchor.js';

@Injectable()
export class AnchorLibProvider {
  anchor = undefined;

  constructor() {
    const addressProvider: AddressProvider = new AddressProviderFromJson(
      columbus4,
    );
    const lcd = new LCDClient({
      URL: 'https://lcd.terra.dev',
      chainID: 'columbus-4',
    });

    this.anchor = new Anchor(lcd, addressProvider);
  }
}
