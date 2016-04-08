/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Syllabus from '../api/syllabus/syllabus.model';

Syllabus.find({}).removeAsync()
  .then(() => {
    Syllabus.createAsync({
        _id: '5677bcec37407aa60754252b',
        academy: 'Business Academy SouthWest',
        year: 2016,
        title: 'JS Web Apps',
        education: 'Computer Science, 4th semester, Spring',
        lecturer: 'Lars Juul Bilde',
        iconurl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Meanstack-624x250.jpg',
        owner: '569e69cc1ab998358d37667d',
        objectives: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
        weekplans: [{
          week: 4,
          summary: 'Awesome week',
          topics: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
          literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
          teaser: 'Introduction, get the IDE up and running. Activities and views'
        }, {
          week: 5,
          summary: 'Awesome week 5',
          topics: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
          literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
          assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
          teaser: 'Introduction, get the IDE up and running. Activities and views'
        }],
      }, {
        _id: '569d2d9b9f72ae8586bdad04',
        academy: 'ErhvervsAkademi SydVest',
        iconurl: 'http://www.canon.dk/Images/Android-logo_tcm81-1232684.png',
        year: 2016,
        title: 'Android Development',
        education: 'Computer Science, 4th semester, Spring',
        owner: '569e69cc1ab998358d37667e',
        objectives: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
      })
      .then(() => {
        console.log('finished populating syllabuses');
      });

      var syllaArray = [];
      for (var i = 1; i < 5000; i++) {
        syllaArray.push({
          academy: 'Business Academy SouthWest',
          year: i,
          title: 'JS Web Apps - ' + i,
          education: 'Computer Science, 4th semester, Spring',
          lecturer: 'Lars Juul Bilde',
          iconurl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Meanstack-624x250.jpg',
          owner: '569e69cc1ab998358d37667d',
          objectives: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
          weekplans: [{
            week: 4,
            summary: 'Awesome week',
            topics: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
            literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
            videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
            assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
            teaser: 'Introduction, get the IDE up and running. Activities and views'
          }, {
            week: 5,
            summary: 'Awesome week 5',
            topics: '<ul><li>Go to this page&nbsp;<a href="http://google.com">http://google.com</a><a href="http://google.com"></a></li><li>Do this</li><li>Then This</li><li>Drink this.</li><li>I like cheese.</li></ul>',
            literature: '<p style=\"text-align: center; \"><img style=\"width: 25%;\" src=\"http://crackberry.com/sites/crackberry.com/files/styles/large/public/topic_images/2013/ANDROID.png?itok=xhm7jaxS\"></p><p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
            videos: '<p style=\"text-align: center; \"><iframe frameborder=\"0\" src=\"//www.youtube.com/embed/FrTxjO6waNs\" width=\"640\" height=\"360\" class=\"note-video-clip\"></iframe><br></p>',
            assignments: '<ul><li>Find the day</li><li>Run over here!</li></ul><p style="text-align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/FrTxjO6waNs" width="640" height="360" class="note-video-clip"></iframe><br></p>',
            teaser: 'Introduction, get the IDE up and running. Activities and views'
          }]
        });
      }
      Syllabus.createAsync(syllaArray)
      .then(() => {
        console.log('finished populating crazy lots of syllabuses');
      });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
        _id: '569e69cc1ab998358d37667e',
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        role: ['user'],
        password: 'test'
      }, {
        _id: '569e69cc1ab998358d37667d',
        provider: 'local',
        role: ['admin', 'user', 'superAdmin'],
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });
