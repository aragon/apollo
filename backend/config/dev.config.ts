import { Config } from '../src/config/Configuration';

export const config: Config = {
    ethereum: {
        publicKey: '', // Add default EOA
        contracts: {
            GovernQueue: '', // Add deployment address can get calculated if deployed with create2
            GovernBaseFactory: ''
        },
        url: 'http://localhost:8545',
        blockConfirmations: 42
    }, 
    database: {
        user: 'govern-tx',
        host: 'localhost',
        password: 'tx-service',
        database: 'govern-tx',
        port: 5432
    },
    server: {
        host: '127.0.0.1',
        port: 4040
    }
} 
