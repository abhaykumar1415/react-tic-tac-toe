import firebase from './firebase.js';

let receivedPlayerDetails = JSON.parse(window.localStorage.getItem('received player'));
let currentPlayerDetails = JSON.parse(window.localStorage.getItem('current player'));
let notifiedPlayerDetails = JSON.parse(window.localStorage.getItem('notified player'));

let database = firebase.database().ref();
let match = database.child('matches');
let user = database.child('users');
let isMatchStarted = false;
const MatchOperations = {

  createUserMatchId: () => {
    //create random matchid
    return new Promise((resolve) => {
      user.once('value', snap => {
        let matchid = "42hvl5236548271n800000000";
        snap.forEach(child => {
          if ((currentPlayerDetails.email !== "") && (notifiedPlayerDetails.email !== "")) {

            if (currentPlayerDetails.email === child.val().email) {
              user.child(child.key).child('matchId').set(matchid);
              user.child(child.key).child('player').set("x");
              console.log("addeed....1");

            }
            else if (notifiedPlayerDetails.email === child.val().email) {
              user.child(child.key).child('matchId').set(matchid);
              user.child(child.key).child('player').set("o");
              console.log("addeed....2");
            }
          } else {
            console.log("local storage is null");
          }
          resolve(matchid);
        })
      })
    })
  },
  createNewMatch: (matchid) => {
    //creating random chance
    console.log("hello", matchid);
    return new Promise((resolve) => {
      let newmatch = {
        x: currentPlayerDetails.email,
        o: notifiedPlayerDetails.email,
        matchId: matchid,
        chance: 'x'
      }
      console.log('newmatch :', newmatch);
      // match.push(newmatch);
      match.child(matchid).set(newmatch);
      console.log('Match added successfully');
      resolve(matchid);
    })
  },

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
      console.log("Inside start game ", userMatchId);
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
    return new Promise(async (resolve, reject) => {
      if (isMatchStarted === true) {
        let resultarr = {};
        await match.child(childkey).once('value', function (result) {
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
          updateDB('matches/' + childkey, array, chance === 'x' ? 'o' : 'x').then(res => {
            console.log('updated successfully');
            console.log('array in db', result.val().values);
            resultarr = { chance: chance === 'x' ? 'o' : 'x', values: res }
            console.log("chnace", resultarr.chance);
          })
        }).then(res => {
          console.log('resultarr test :', resultarr);
          console.log('res :', res);
          console.log('resultarr test :', resultarr);
          resolve(resultarr);
        })
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
  return new Promise((resolve, reject) => {
    if (chance === 'atStart') {

    } else {
      console.log("chance in update", chance);
      console.log("result", chance);
      database.child(url).update({ chance: chance });
    }
    database.child(url).update({ values: data });
    console.log("values array inserted.....");
    resolve(data);
  })
}

let findMatchId = (async (snap, userInput, operation) => {
  console.log('operation :', operation);
  let resultObj = {};
  let found = false;
  await snap.forEach((child) => {
    if (operation === 'match') {
      var matchId = child.key;
      // var { matchId } = child.val();
      // console.log("matches match id", matchId);
      // console.log("input matchid", userInput.matchId);
      if (userInput.matchId === matchId) {
        isMatchStarted = true;
        let values = ["", "", "", "", "", "", "", "", ""];
        resultObj.x = child.val().x;
        resultObj.o = child.val().o;
        resultObj.childkey = child.key;
        updateDB('matches/' + child.key, values, 'atStart').then(res => {
          resultObj.chance = child.val().chance;
          resultObj.values = res;
          console.log("array in find match id", res);
          found = true;
        })

      }
    }
    else {
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

