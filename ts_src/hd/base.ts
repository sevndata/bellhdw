import {Network, networks, payments} from "belcoinjs-lib";
import {AddressType} from "./types";
import {toXOnly} from "../utils/util";

export class BaseWallet {
  addressType?: AddressType;
  network?: Network;

  setNetwork(network: Network) {
    this.network = network;
  }

  getAddress(publicKey: Uint8Array) {
    if (this.addressType === undefined)
      throw new Error("addressType of keyring is not specified");
    switch (this.addressType) {
      case AddressType.P2WPKH:
        return payments.p2wpkh({
          pubkey: Buffer.from(publicKey),
          network: this.network ?? networks.bellcoin,
        }).address;
      case AddressType.P2SH_P2WPKH:
        return payments.p2sh({
          redeem: payments.p2wpkh({
            pubkey: Buffer.from(publicKey),
            network: this.network ?? networks.bellcoin,
          }),
        }).address;
      case AddressType.P2PKH as any:
        return payments.p2pkh({
          pubkey: Buffer.from(publicKey),
          network: this.network ?? networks.bellcoin,
        }).address;
      case AddressType.P2TR:
        return payments.p2tr({
          internalPubkey: toXOnly(Buffer.from(publicKey)),
          network: this.network ?? networks.bellcoin,
        }).address;
      // case AddressType.M44_P2TR:
      //   return payments.({
      //     internalPubkey: toXOnly(Buffer.from(publicKey)),
      //     network: this.network ?? networks.bellcoin,
      //   }).address;
      // case AddressType.M44_P2WPKH:
      //   return payments.p2tr({
      //     internalPubkey: toXOnly(Buffer.from(publicKey)),
      //     network: this.network ?? networks.bellcoin,
      //   }).address;
      default:
        throw new Error("Invalid AddressType");
    }
  }
}
