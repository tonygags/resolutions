Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isServer) {
Meteor.methods({
    addResolution: function(title) {
        Resolutions.insert({
        title: title,
        createdAt: new Date(),
        owner: Meteor.user()._id,
        createdBy: Meteor.user(this._id).username
      });  
    },
    addResolutionAnynymous: function(title) {
      Resolutions.insert({
      title: title,
      createdAt: new Date(),
      owner: "Anonymous",
      createdBy: "Anonymous"
    });  
  },
    updateResolution: function(id, checked) {
        var res = Resolutions.findOne(id);
        if(res.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
      Resolutions.update(id, {
        $set: {
          checked: !checked
        }
      });
    },
    deleteResolution: function(id) {
        var res = Resolutions.findOne(id);
        if(res.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
      Resolutions.remove(id);
    },
    setPrivate: function(id, private) {
      var res = Resolutions.findOne(id);

      if(res.owner !== Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

      Resolutions.update(id, {
        $set: {
          private: private
        }
      });
    },
    
  });
}
