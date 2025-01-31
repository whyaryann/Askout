const firebaseConfig = {
  apiKey: "AIzaSyAr8PVzuCeEJ8Vdpg6uFbOSScKDOnVobgA",
  authDomain: "askout-6ae7e.firebaseapp.com",
  projectId: "askout-6ae7e",
  storageBucket: "askout-6ae7e.firebasestorage.app",
  messagingSenderId: "467095134951",
  appId: "1:467095134951:web:0da127e4fbf5a6d37db842"
};

let app = firebase.initializeApp(firebaseConfig);
const getUserData = function () {
  "use strict";

  var module = {
    options: [],
    header: [
      navigator.platform,
      navigator.userAgent,
      navigator.appVersion,
      navigator.vendor,
      window.opera,
    ],
    dataos: [
      { name: "Windows Phone", value: "Windows Phone", version: "OS" },
      { name: "Windows", value: "Win", version: "NT" },
      { name: "iPhone", value: "iPhone", version: "OS" },
      { name: "iPad", value: "iPad", version: "OS" },
      { name: "Kindle", value: "Silk", version: "Silk" },
      { name: "Android", value: "Android", version: "Android" },
      { name: "PlayBook", value: "PlayBook", version: "OS" },
      { name: "BlackBerry", value: "BlackBerry", version: "/" },
      { name: "Macintosh", value: "Mac", version: "OS X" },
      { name: "Linux", value: "Linux", version: "rv" },
      { name: "Palm", value: "Palm", version: "PalmOS" },
    ],
    databrowser: [
      { name: "Chrome", value: "Chrome", version: "Chrome" },
      { name: "Firefox", value: "Firefox", version: "Firefox" },
      { name: "Safari", value: "Safari", version: "Version" },
      { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
      { name: "Opera", value: "Opera", version: "Opera" },
      { name: "BlackBerry", value: "CLDC", version: "CLDC" },
      { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
    ],
    init: function () {
      var agent = this.header.join(" "),
        os = this.matchItem(agent, this.dataos),
        browser = this.matchItem(agent, this.databrowser);

      return { os: os, browser: browser };
    },
    matchItem: function (string, data) {
      var i = 0,
        j = 0,
        html = "",
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, "i");
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
          matches = string.match(regexv);
          version = "";
          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + ".";
              } else {
                version += matches[j];
              }
            }
          } else {
            version = "0";
          }
          return {
            name: data[i].name,
            version: parseFloat(version),
          };
        }
      }
      return { name: "unknown", version: 0 };
    },
  };

  var e = module.init();
  let data = { os: {}, browser: {} };
  data.os.name = e.os.name;
  data.os.version = e.os.version;
  data.browser.version = e.browser.version;
  data.browser.name = e.browser.name;
  data.userAgent = navigator.userAgent;
  data.appVersion = navigator.appVersion;
  data.platform = navigator.platform;
  data.vendor = navigator.vendor;
  return data;
};
let userData = getUserData();

fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((responseJson) => {
    userData.apiData = responseJson;
    db.collection("Visitors").add(userData);
  });
const db = firebase.firestore();
const addNewEvent = () => {
  db.collection("Accepted")
    .add(userData)
    .then(() => {
      alert("you seriously tapped on yes, ofc why not :)");
    })
    .catch((err) => console.log(err));
};
