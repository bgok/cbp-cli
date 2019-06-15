const { AuthenticatedClient } = require("coinbase-pro");

const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const getClient = ({ key, secret, passphrase }) => new AuthenticatedClient(key, secret, passphrase, apiURI);

async function testToken(token) {
    const result = {
        tokenType: token.name,
        viewAllowed: false,
        tradeAllowed: false,
        transferAllowed: false,
    };

    const client = getClient(token);

    await client.getAccounts()
        .then((stuff) => result.viewAllowed = true)
        .catch(({ response: { statusCode } }) => result.viewAllowed = statusCode !== 403)

    await client.buy({ price: '100.00', size: '1', product_id: 'BTC-USD' })
        .then((stuff) => result.tradeAllowed = true)
        .catch(({ response: { statusCode } }) => result.tradeAllowed = statusCode !== 403)

    await client.withdrawPayment({ amount: 1, currency: 'USD', payment_method_id: "aaaabbbbccccdddd" })
        .then((stuff) => result.transferAllowed = true)
        .catch(({ response: { statusCode } }) => result.transferAllowed = statusCode !== 403)

    return result;
}

(async () => {
    console.log(await testToken(transferToken));
    console.log(await testToken(viewToken));
    console.log(await testToken(tradeToken));
})()
