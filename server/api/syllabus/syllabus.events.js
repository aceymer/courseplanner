/**
 * Syllabus model events
 */

'use strict';

import {EventEmitter} from 'events';
var Syllabus = require('./syllabus.model');
var SyllabusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SyllabusEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Syllabus.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SyllabusEvents.emit(event + ':' + doc._id, doc);
    SyllabusEvents.emit(event, doc);
  }
}

export default SyllabusEvents;
