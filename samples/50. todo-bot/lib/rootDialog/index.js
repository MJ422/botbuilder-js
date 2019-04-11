"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_dialogs_adaptive_1 = require("botbuilder-dialogs-adaptive");
const recognizer_1 = require("./recognizer");
const schema_1 = require("../schema");
const addToDo_1 = require("./addToDo");
const deleteToDo_1 = require("./deleteToDo");
const clearToDos_1 = require("./clearToDos");
const showToDos_1 = require("./showToDos");
class RootDialog extends botbuilder_dialogs_adaptive_1.AdaptiveDialog {
    constructor() {
        super('main');
        // Bind to production/development recognizer
        this.recognizer = recognizer_1.getRecognizer();
        // Handle recognized intents
        this.addRule(new botbuilder_dialogs_adaptive_1.IntentRule(schema_1.intents.AddToDo, [
            new addToDo_1.AddToDo()
        ]));
        this.addRule(new botbuilder_dialogs_adaptive_1.IntentRule(schema_1.intents.DeleteToDo, [
            new deleteToDo_1.DeleteToDo()
        ]));
        this.addRule(new botbuilder_dialogs_adaptive_1.IntentRule(schema_1.intents.ClearToDos, [
            new clearToDos_1.ClearToDos()
        ]));
        this.addRule(new botbuilder_dialogs_adaptive_1.IntentRule(schema_1.intents.ShowToDos, [
            new showToDos_1.ShowToDos()
        ]));
        this.addRule(new botbuilder_dialogs_adaptive_1.UnknownIntentRule([
            new botbuilder_dialogs_adaptive_1.IfCondition(`user.greeted != true`, [
                new botbuilder_dialogs_adaptive_1.SendActivity(`Hi! I'm a ToDo bot. Say "add a todo named first one" to get started.`),
                new botbuilder_dialogs_adaptive_1.SetProperty(`user.greeted`, `true`)
            ]).else([
                new botbuilder_dialogs_adaptive_1.SendActivity(`Say "add a todo named first one" to get started.`)
            ])
        ]));
        // Define rules to handle cancel events
        this.addRule(new botbuilder_dialogs_adaptive_1.EventRule(schema_1.events.CancelAdd, [
            new botbuilder_dialogs_adaptive_1.SendActivity(`Ok... Cancelled adding new alarm.`)
        ]));
        this.addRule(new botbuilder_dialogs_adaptive_1.EventRule(schema_1.events.CancelDelete, [
            new botbuilder_dialogs_adaptive_1.SendActivity(`Ok...`)
        ]));
        // Define rules for handling errors
        this.addRule(new botbuilder_dialogs_adaptive_1.EventRule(schema_1.events.Error, [
            new botbuilder_dialogs_adaptive_1.SendActivity(`Oops. An error occurred: {message}`)
        ]));
    }
}
exports.RootDialog = RootDialog;
//# sourceMappingURL=index.js.map