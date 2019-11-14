const rp = require('request-promise');

describe('test', function(){

  const getEndPoint = {
    method: 'GET',
    uri: 'http://localhost:3000/students',
    resolveWithFullResponse: true
  };

  const postEndPoint = {
    method: 'POST',
    uri: 'http://localhost:3000/students',
    form: {
      "name": "opara festus",
      "age": 30,
      "class": "500L",
      "guardian_contact": "57 New Umuahia Road Aba",
      "admission_date": "Feb 2011"
    },
    headers: {
      'content-type': 'application/json'
    },
    resolveWithFullResponse: true
  }

  /*
  / Status code for the API endpoints
  */ 
  let getStatusCode = 0;
  let postStatusCode = 0;

  beforeEach(async function(){
    await rp(getEndPoint).then((res) => {
      getStatusCode = res.statusCode;
    })

    await rp(postEndPoint).then((res) => {
      postStatusCode = res.statusCode;
    })
  });
  
  it('get verb', function(){
    expect(status).toBe(200);
  });

  it('post verb', function(){
    expect(postStatus).toBe(200);
  })
})