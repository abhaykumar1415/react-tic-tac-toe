import firebase from './firebase.js';

let database = firebase.database().ref();
let match = database.child('matches');
let user = database.child('users');
let isMatchStarted = false;
const MatchOperations = {

  getMatchId: (userInput) => {
    return new Promise((resolve, reject) => {
      console.log("IN promise");
      user.once('value', snap => {
        console.log("values", snap);
        findMatchId(snap, userInput, 'user').then(found => {
          console.log('found for email match', found);
          if (found)
            resolve(found);
          else
            reject("Doenst found");
        })
      })
    })
  },

  startGame: (userMatchId) => {
    return new Promise((resolve, reject) => {
      match.once('value', snap => {
        findMatchId(snap, userMatchId, 'match')
          .then(found => {
            console.log(' found for match id:', found);
            resolve(found);
          })
      })
    })
  },

  onGridClick: (childkey, inputindex) => {
    return new Promise((resolve, reject) => {
      console.log('childkey :', childkey);
      console.log('Index of clicked block is', inputindex);
      if (isMatchStarted === true) {
        let resultarr = {};
        console.log(' in If isMatchStarted :', isMatchStarted);
        match.child(childkey).once('value', function (result) {
          let chance = result.val().chance;
          console.log('once', result.val().chance);

          let array = result.val().values;
          console.log('old array', array);
          array.map((data, index) => {
            if (index === inputindex) {
              chance === 'x' ? array[index] = 'x' : array[index] = 'o';
            }
          })
          console.log('new array', array);
          updateDB('matches/' + childkey, array, chance === 'x' ? 'o' : 'x');
          console.log('updated successfully');
          console.log('after');
          console.log('array in db', result.val().values);
          resultarr = { chance: chance === 'x' ? 'o' : 'x', values: array }
        })
        resolve(resultarr);
      }
    })
  },
  checkWinningCondition: (array) => {

  }
  // listenChild: (async () => {
  //   let resultObj;
  //   await match.on('value', snap => {
  //     console.log("snap", snap);
  //     snap.forEach(child => {
  //       console.log("updated chance", child.val().chance);
  //       console.log("updated array", child.val().values);
  //       checkWinningCondition();
  //       valueArr = { chance: child.val().chance, val: child.val().values }
  //       resultObj = { chance: child.val().chance, val: child.val().values }
  //     })
  //   }
  //   )
  // }),
  // listenChild: async () => {
  //   let resultObj;
  //   await match.once('value', snap => {
  //     console.log("snap", snap);
  //     snap.forEach(child => {
  //       console.log("updated chance", child.val().chance);
  //       console.log("updated array", child.val().values);
  //       checkWinningCondition();
  //       valueArr = { chance: child.val().chance, val: child.val().values }
  //       resultObj = { chance: child.val().chance, val: child.val().values }
  //     })
  //   }
  //   )
  //   return resultObj;
  // },
  // returnValueArr: () => {
  //   return valueArr;
  // }
}

let updateDB = (url, data, chance) => {
  if (chance === 'atStart') {

  } else {
    console.log("chance in update", chance);
    console.log("result", chance);
    database.child(url).update({ chance: chance });
  }
  database.child(url).update({ values: data });
}

let findMatchId = (async (snap, userInput, operation) => {
  console.log('operation :', operation);
  let resultObj = {};
  let found = false;
  await snap.forEach((child) => {
    if (operation === 'match') {
      var { matchId } = child.val();
      console.log("matches match id", matchId);
      if (userInput.matchId === matchId) {
        isMatchStarted = true;
        let values = ["", "", "", "", "", "", "", "", ""];
        resultObj.x = child.val().x;
        resultObj.o = child.val().o;
        resultObj.childkey = child.key;
        updateDB('matches/' + child.key, values, 'atStart');
        resultObj.chance = child.val().chance;
        resultObj.values = child.val().values;
        console.log("array in find match id", child.val().values);
        found = true;
      }
    } else {
      snap.forEach(function (child) {
        var { email } = child.val();
        var matchId;
        if (userInput === email) {
          matchId = child.val().matchId;
          resultObj.matchId = matchId;
          console.log('User Result :', matchId);
          found = true;
        }
      })
    }
  })
  console.log('found :', found);
  return found === true ? resultObj : found;
});

const Matches = MatchOperations;

export default Matches;

