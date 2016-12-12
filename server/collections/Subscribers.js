import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.@,_-]/gim,"");
    return str.trim();
}

Meteor.methods({
    'subscribers.insert': function(name, email) {
        console.log(name);
        console.log(email);
        if (0 < name.length <= 255 && 0 < email.length <= 255) {
            console.log(2);
            Subscribers.insert({
                name: sanitizeString(name),
                email: sanitizeString(email)
            })
        }
    }
})

export default Subscribers = new Mongo.Collection('subscribers');
