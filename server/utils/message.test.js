var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        var from = 'Brenna';
        var text = 'Hello dad!';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
           from: from,
           text: text 
        });
    });
});