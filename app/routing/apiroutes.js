var friends = require('../data/friends');

module.exports = app => {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    const bff = {
      name: '',
      photo: '',
      scoreDifference: 0
    };

    const userData = req.body;
    const userScores = userData.scores;

    let totalDifference;
    var scoreDifference = bff.scoreDifference;

    friends.forEach((e, i, arr) => {
      let currentFriend = friends[i];
      totalDifference = 0;

      const friendScores = currentFriend.scores;

      friendScores.forEach((item, j, array) => {
        let currentFriendScore = currentFriend.scores[j];
        let currentUserScore = userScores[j];

        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      });

      if (totalDifference <= scoreDifference || scoreDifference === 0) {
        bff.name = currentFriend.name;
        bff.photo = currentFriend.photo;
        scoreDifference = totalDifference;
      }
    });

    friends.push(userData);
    res.json(bff);
  });
};
