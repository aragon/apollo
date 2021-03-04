import { isAddress } from '@ethersproject/address';
import Database from '../../../src/db/Database';
import Whitelist, { ListItem } from '../../../src/db/Whitelist';
import AddItemAction from '../../../src/whitelist/AddItemAction';


// Mocks
jest.mock('../../../src/db/Whitelist')
jest.mock('@ethersproject/address')

/**
 * AddItemAction test
 */
describe('AddItemActionTest', () => {
    let addItemAction: AddItemAction,
    whitelistMock: Whitelist

    const request = {
        body : {
            message: {
                publicKey: '0x00',
                txLimit: 1
            },
            signature: ''
        }
    }

    beforeEach(() => {
        new Whitelist({} as Database)
        whitelistMock = (Whitelist as jest.MockedClass<typeof Whitelist>).mock.instances[0]
    })

    it('calls validateRequest and returns the expected values', () => {
        (isAddress as jest.MockedFunction<typeof isAddress>).mockReturnValueOnce(true)

        addItemAction = new AddItemAction(whitelistMock, request as any)

        expect(isAddress).toHaveBeenNthCalledWith(1, '0x00')
    })

    it('calls validateRequest and throws because of a invalid ethereum address', () => {
        (isAddress as jest.MockedFunction<typeof isAddress>).mockReturnValueOnce(false)

        expect(() => {
            addItemAction = new AddItemAction(whitelistMock, request as any)
        }).toThrow('Invalid public key passed!')

        expect(isAddress).toHaveBeenNthCalledWith(1, '0x00')
    })

    it('calls validateRequest and throws because of a invalid rate limit', () => {
        (isAddress as jest.MockedFunction<typeof isAddress>).mockReturnValueOnce(true)

        request.body.message.txLimit = 0;

        expect(() => {
            addItemAction = new AddItemAction(whitelistMock, request as any)
        }).toThrow('Invalid rate limit passed!')

        expect(isAddress).toHaveBeenNthCalledWith(1, '0x00')

        request.body.message.txLimit = 1;
    })

    it('calls execute and returns the expected result', async () => {
        (isAddress as jest.MockedFunction<typeof isAddress>).mockReturnValueOnce(true);

        (whitelistMock.addItem as jest.MockedFunction<typeof whitelistMock.addItem>).mockReturnValueOnce(Promise.resolve({} as ListItem));
        
        addItemAction = new AddItemAction(whitelistMock, request as any)
        
        await expect(addItemAction.execute()).resolves.toEqual({})

        expect(whitelistMock.addItem).toHaveBeenNthCalledWith(1, '0x00', 1)
    })

    it('calls execute and throws as expected', async () => {
        (isAddress as jest.MockedFunction<typeof isAddress>).mockReturnValueOnce(true);

        (whitelistMock.addItem as jest.MockedFunction<typeof whitelistMock.addItem>).mockReturnValueOnce(Promise.reject('NOPE'));
        
        addItemAction = new AddItemAction(whitelistMock, request as any)
        
        await expect(addItemAction.execute()).rejects.toEqual('NOPE')

        expect(whitelistMock.addItem).toHaveBeenNthCalledWith(1, '0x00', 1)
    })
})
