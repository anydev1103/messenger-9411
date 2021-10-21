const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");

// associations

Conversation.hasMany(Participant);
User.hasMany(Participant);
Participant.belongsTo(User);
Participant.belongsTo(Conversation);

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  Participant
};
