const { Sequelize, Op } = require("sequelize");
const db = require("../db");
const Participant = require("./participant");

const Conversation = db.define("conversation", {
  isGroup: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// find conversation given two user Ids
Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      isGroup: false,
    },
    include: {
      model: Participant,
      attributes: [],
      where: {
        userId: {
          [Op.eq]: [user1Id],
        },
      },
      required: true,
    },
    include: {
      model: Participant,
      attributes: [],
      where: {
        userId: {
          [Op.eq]: [user2Id],
        },
      },
      required: true,
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

/**
 * Returns true if you have permission to see the conversation.
 * @param {number} conversationId Conversation ID
 * @param {number} user1Id User ID
 * @returns {bool} true if user have permission for this conversation, otherwise false.
 */
Conversation.hasPermission = async function (conversationId, user1Id) {
  const conversation = await Conversation.findByPk(conversationId);
  if (conversation?.user1Id !== user1Id && conversation?.user2Id !== user1Id)
    return false;

  return true;
};

module.exports = Conversation;
