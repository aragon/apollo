import { EthereumOptions } from '../../../../src/config/Configuration'
import Provider from '../../../../src/provider/Provider'
import * as challengeABI from '../../../../src/transactions/challenge/challenge.json'
import ChallengeTransaction from '../../../../src/transactions/challenge/ChallengeTransaction'
import Whitelist from '../../../../src/db/Whitelist';

// Mocks
jest.mock('../../../../lib/transactions/AbstractTransaction')

/**
 * ChallengeTransaction test
 */
describe('ChallengeTransactionTest', () => {
    let challengeTransaction: ChallengeTransaction

    beforeEach(() => {
        challengeTransaction = new ChallengeTransaction(
            {} as EthereumOptions,
            {} as Provider,
            {} as Whitelist,
            {} as any
        )
    })

    it('has the correct contract defined', () => {
        //@ts-ignore
        expect(challengeTransaction.contract).toEqual('GovernQueue')
    })

    it('has the correct function abi defined', () => {
        //@ts-ignore
        expect(challengeTransaction.functionABI).toEqual(challengeABI)
    })
})
