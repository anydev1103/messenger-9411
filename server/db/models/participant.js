const db = require("../db");
const Sequelize = require("sequelize");

const Participant = db.define("participant", {
    lastReadMessageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Participant;
