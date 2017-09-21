Meteor.subscribe("resolutions");

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

  Template.body.helpers({
    resolutions: function() {
      if(Session.get('hideFinished')) {
        return Resolutions.find({checked: {$ne: true}});
      } else {
        return Resolutions.find();
      }
    },
    hideFinished: function() {
      return Session.get('hideFinished');
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event) {
      if (!Meteor.userId()) {
        var title = event.target.title.value;
        Meteor.call('addResolutionAnynymous', title)
        event.target.title.value = '';
        alert('Saved as Anonymous. Login to save your Resolution with a user name');
        return false;
        

      } else {
        var title = event.target.title.value;
        Meteor.call('addResolution', title)
        event.target.title.value = '';
        return false;
      }
      
    },
    'change .hide-finished': function() {
      Session.set('hideFinished', event.target.checked);
    }
});




