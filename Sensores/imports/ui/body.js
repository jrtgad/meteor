import { Template } from 'meteor/templating';
import { Data } from '../api/data.js';

import './body.html';

Template.body.helpers({

    Data() {
        return Data.find({});
    }
});
