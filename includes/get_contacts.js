var axios = require('axios');

  
const mc_config_get = {
  method: 'get',
  url: 'https://us20.api.mailchimp.com/3.0/lists/c9bf94e6b7/members/',
  headers: { 
    'Authorization': 'Bearer 53ee5bafaa04937267e7b24c2fd02c38-us20', 
  }
};

axios(mc_config_get)
.then(function (response) {
  const data = response.data
  //console.log('mailchimp resp:', data);
  Object.values(data.members).map(members => {
    const fields = {
     firstname: members.merge_fields.FNAME,
     lastname: members.merge_fields.LNAME,
     email: members.email_address,
     tags: members.tags
  }
    console.log(fields)
  })
})
.catch(function (error) {
  console.log(error);
});

