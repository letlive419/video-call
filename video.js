const {connect} = require("twilio-video");
const {token} = require(`./server`)

connect(token.toJwt(), { name:`cool-room`}).then(room => {
    console.log(`Successfully joined the Room: ${room}`);
    room.on(`participantConnected`, participant => {
        console.log(`A remote Participant connected: ${participant}`)
    });
}, error => {
    console.error(`Unable to connect to room: ${error.message}`)
});
