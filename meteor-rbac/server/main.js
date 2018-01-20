import { Meteor } from 'meteor/meteor';

import '../imports/api';
import { initFixture } from '../imports/models/fixtures';

Meteor.startup(() => {
    // code to run on server at startup
    initFixture();
});
