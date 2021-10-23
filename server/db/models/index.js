const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");

// associations
Conversation.belongsToMany(User, { through: Participant });
User.belongsToMany(Conversation, { through: Participant });

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  Participant
};
