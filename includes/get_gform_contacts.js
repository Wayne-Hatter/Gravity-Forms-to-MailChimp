var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://blackhawk.group/wp-json/gf/v2/forms/1/entries',
  headers: {
    'Authorization': 'Basic Y2tfZTJiZjg1N2E1ZWM1MTdkMmYxZmU3ODAzOTQ5NTBhOTNmZDllYmExNjpjc19iNTA3N2FlZmIxZmU4OWY3OTZlNTQ0N2ZjYzdjNjMwMGUyMDQ0ZjRl'
  }
};
const GformContacts = (gform_data) => {
  axios(config)
    .then(function(response) {
      let resp = JSON.stringify(response.data)
      let data = JSON.parse(resp)
      //console.log(data.entries);
      let results = data.entries
      results.map((contacts, gform_data) => {
        let email = contacts['3']
        let status = 'subscribed'
        let firstname = contacts['1.3']
        let lastname = contacts['1.6']
        let tags = contacts['7']
        var gform_data = JSON.parse(JSON.stringify({
          "email_address": email,
          "status_if_new": status,
          "merge_fields": {
            "FNAME": firstname,
            "LNAME": lastname
          },
          "tags": [
            tags
          ]
        }))
        console.log(gform_data)
        //return gform_data
      })
    })
    .catch(function(error) {
      console.log(error);
    });

}
module.exports = {GformContacts}
