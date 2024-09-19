import {AddressType, Keyring} from '../ts_src/hd/types';
import HDSimpleKey from '../ts_src/hd/simple';

// describe('Keyring', () => {
//     let keyring: Keyring<any>;

//     beforeEach(() => {
//         try {
//             // 传入私钥种子的方法 new HDSimpleKey(validPrivateKey)
//             // const validPrivateKey = crypto.getRandomValues(new Uint8Array(32));
//             //keyring = new HDSimpleKey(validPrivateKey);

//             // 传入助记词得我方法 mnemonic和password  password可以不传
//             const mnemonic: string = 'hello word my name is test today happy too maybe are sure';
//             const pwdStr: string = '';

//             keyring = new HDSimpleKey(mnemonic, pwdStr);
//             //AddressType可以修改类型
//             keyring.addressType = AddressType.P2PKH;
//             //是否隐藏根
//             keyring.hideRoot = false;
//         }  catch (error) {
//         console.error("Error initializing keyring:", error);
//         throw error;
//     }
//     });

//     describe('getAccounts', () => {
//         it('should return an array of accounts', () => {
//             const accounts = keyring.getAccounts();
//             console.log('aaaaaaaaaaaaaaAccounts:', accounts);
//         });
//     });
// });

describe('Keyring', () => {
    let keyring: Keyring<any>;

    beforeEach(() => {
        try {
            // const mnemonic: string = 'tone point gap void pause junk bundle wire chunk very sauce grocery';
            // const mnemonic: string = 'word remember service soldier time mass enable deny garment very unveil crouch';
            const mnemonic: string = 'robust lawn pelican alarm either divert exotic action rhythm fresh there scrub';
            const pwdStr: string = '';

            keyring = new HDSimpleKey(mnemonic,pwdStr);
            // 是否隐藏根
            keyring.hideRoot = false;
        } catch (error) {
            console.error("Error initializing keyring:", error);
            throw error;
        }
    });

    describe('getAccounts', () => {
        it('should return an array of accounts for all AddressType', () => {
            // 遍历所有 AddressType 枚举值
            for (const addressTypeKey in AddressType) {
                if (isNaN(Number(addressTypeKey))) {
                    try {
                        keyring.addressType = AddressType[addressTypeKey as keyof typeof AddressType];  // 设置每种地址类型
                        const accounts = keyring.getAccounts();
                        console.log(`Accounts for AddressType ${addressTypeKey}:`, accounts);
                    } catch (error) {
                        console.error(`Error generating accounts for AddressType ${addressTypeKey}:`, error);
                    }
                }
            }
        });
    });
});
