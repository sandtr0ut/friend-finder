var friends = require('../data/friends/');

module.exports = app => {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    const bestMatch = {
      name: '',
      photo: '',
      scoreDifference: 0
    };

    const userData = req.body;
    const userScores = userData.scores;

    let totalDifference;
    var scoreDifference = bestMatch.scoreDifference;

    friends.forEach((e, i, arr) => {
      let currentFriend = friends[i];
      totalDifference = 0;

      const friendScores = currentFriend.scores;
      console.log('currentFriend= ' + currentFriend.name);
      friendScores.forEach((item, j, array) => {
        let currentFriendScore = currentFriend.scores[j];
        let currentUserScore = userScores[j];

        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      });
      console.log('totalDifference= ' + totalDifference);
      console.log('scoreDifference= ' + scoreDifference);

      if (totalDifference <= scoreDifference || scoreDifference === 0) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        scoreDifference = totalDifference;
      }
      console.log(bestMatch.name);

      console.log(bestMatch);
    });

    friends.push(userData);
    res.json(bestMatch);
  });
};
