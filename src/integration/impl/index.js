var log = require("../../util/LogService");
var StubbedFactory = require("./StubbedFactory");
var SimpleBotFactory = require("./simple_bot/SimpleBotFactory");
var RSSFactory = require("./rss/RSSFactory");
var IRCFactory = require("./irc/IRCFactory");

var mapping = {
    "complex-bot": {
        "rss": RSSFactory
    },
    "bridge": {
        "irc": IRCFactory
    }
};

var defaultFactories = {
    "complex-bot": null,
    "bot": SimpleBotFactory,
    "bridge": null
};

module.exports = {
    getFactory: (integrationConfig) => {
        var opts = mapping[integrationConfig.type];

        if (!opts) {
            log.verbose("IntegrationImpl", "No option set available for " + integrationConfig.type + " - will attempt defaults");
        }

        var factory = null;
        if (!opts) factory = defaultFactories[integrationConfig.type];
        else factory = opts[integrationConfig.integrationType];
        if (!factory) {
            log.verbose("IntegrationImpl", "No factory available for " + integrationConfig.type + " (" + integrationConfig.integrationType + ") - using stub");
            factory = StubbedFactory;
        }

        return factory;
    }
};