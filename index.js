var axios = require("axios");
const http = require("http");

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
let port = process.env.PORT ? 8080 : 8080
server.listen(port);
console.log('server is running on', port)

// Convert hours to milliseconds
var hours = 3;
var milliseconds = hours * 60 * 60 * 1000;

// PUT Method
function ADD_UPDATE_CONTACTS() {
  var gform_config = {
    method: "get",
    url: "https://blackhawk.group/wp-json/gf/v2/forms/1/entries",
    headers: {
      Authorization:
        "Basic Y2tfZTJiZjg1N2E1ZWM1MTdkMmYxZmU3ODAzOTQ5NTBhOTNmZDllYmExNjpjc19iNTA3N2FlZmIxZmU4OWY3OTZlNTQ0N2ZjYzdjNjMwMGUyMDQ0ZjRl",
    },
  };
  let mc_data = () => {
    axios(gform_config)
      .then(function (response) {
        let resp = JSON.stringify(response.data);
        let data = JSON.parse(resp);
        //console.log(data.entries);
        let results = data.entries;
        results.map((contacts, gform_data) => {
          let email = contacts["3"];
          let status = "subscribed";
          let firstname = contacts["1.3"];
          let lastname = contacts["1.6"];
          let tags = contacts["7"];

          let mcData = JSON.parse(
            JSON.stringify({
              email_address: email,
              status_if_new: status,
              merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
              },
              tags: [tags],
            })
          );

          const mc_config_put = {
            method: "put",
            url: `https://us20.api.mailchimp.com/3.0/lists/c9bf94e6b7/members/${email}`,
            headers: {
              Authorization: "Bearer 53ee5bafaa04937267e7b24c2fd02c38-us20",
              "Content-Type": "application/json",
            },
            data: mcData,
          };
          console.log("mcdata", mcData);

          axios(mc_config_put)
            .then(function (response) {
              const data = JSON.parse(JSON.stringify(response.data));
              console.log("put", data);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  mc_data();
}

console.log("milliseconds", milliseconds);
setInterval(ADD_UPDATE_CONTACTS, milliseconds);
