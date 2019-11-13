const request = require('request');

describe('test', function(){
  
  it('/', function(){
    let status = 2;
    const get_end_point = 'http://localhost:3000/students'

    request(get_end_point, (error, response, body) =>{
      expect(response.statusCode).toEqual(400);
      console.log(status);
    });

    
  });

  // it()
})