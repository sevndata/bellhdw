import {AddressType, Keyring} from '../ts_src/hd/types';
import HDSimpleKey from '../ts_src/hd/simple';

describe('Keyring', () => {
    let keyring: Keyring<any>;

    beforeEach(() => {
        try {
            // 传入私钥种子的方法 new HDSimpleKey(validPrivateKey)
            // const validPrivateKey = crypto.getRandomValues(new Uint8Array(32));
            //keyring = new HDSimpleKey(validPrivateKey);

            // 传入助记词得我方法 mnemonic和password  password可以不传
            const mnemonic: string = 'aaaaaaaaaaaa';
            keyring = new HDSimpleKey(mnemonic,"dsadsa");
            //AddressType可以修改类型
            keyring.addressType = AddressType.P2PKH;
            //是否隐藏根
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
    });
});
