if(Meteor.isClient) {
    Template.resolution.helpers({
        isOwner: function() {
          return this.owner === Meteor.userId();
        },
        getUser: function(user) {

          if (user) {
            //console.log(user);
              return user
          } else {
            
              return "Anonymous"
          }
      }
    });
    
    Template.resolution.events({
      'click .toggle-checked': function() {
        Meteor.call('updateResolution', this._id, this.checked)
      },
      'click .delete': function() {
        Meteor.call('deleteResolution', this._id);
      },
      'click .toggle-private': function() {
        Meteor.call('setPrivate', this._id, !this.private);
      },
   });
}

