// import { expect } from 'chai';
import {AddressType, Keyring} from '../ts_src/hd/types';
import HDSimpleKey from '../ts_src/hd/simple';

describe('Keyring', () => {
    let keyring: Keyring<any>;

    beforeEach(() => {
        try {
            const validPrivateKey = crypto.getRandomValues(new Uint8Array(32));
            keyring = new HDSimpleKey(validPrivateKey);
            keyring.addressType = AddressType.P2WPKH;
            keyring.hideRoot = false;
        }  catch (error) {
        console.error("Error initializing keyring:", error);
        throw error;
    }
    });

    describe('getAccounts', () => {
        it('should return an array of accounts', () => {
            const accounts = keyring.getAccounts();
            console.log('Accounts:', accounts);
        });

        it('should return the correct number of accounts', () => {
            const accounts = keyring.getAccounts();
            console.log('Accounts:', accounts);
        });
    });
});
