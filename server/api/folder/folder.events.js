/**
 * Folder model events
 */

'use strict';

import {EventEmitter} from 'events';
var Folder = require('./folder.model');
var FolderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FolderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Folder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FolderEvents.emit(event + ':' + doc._id, doc);
    FolderEvents.emit(event, doc);
  }
}

export default FolderEvents;
