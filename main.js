const moment = require("moment");
 
exports.handler = async (event) => {
  const startTime = moment().valueOf();

  let name = "you";
  let city = 'World';
  let time = 'day';
  let day = '';
  let responseCode = 200;
  console.log("request: " + JSON.stringify(event));
  
  if (event.queryStringParameters && event.queryStringParameters.name) {
      console.log("Received name: " + event.queryStringParameters.name);
      name = event.queryStringParameters.name;
  }
  
  if (event.queryStringParameters && event.queryStringParameters.city) {
      console.log("Received city: " + event.queryStringParameters.city);
      city = event.queryStringParameters.city;
  }
  
  if (event.headers && event.headers['day']) {
      console.log("Received day: " + event.headers.day);
      day = event.headers.day;
  }
  
  if (event.body) {
      let body = JSON.parse(event.body)
      if (body.time) 
          time = body.time;
  }
  if (process.env.isEnabled === true) {
    await sleep(process.env.Delay);
  }
  const endTime = moment().valueOf();
  let greeting = `Good ${time}, ${name} of ${city}. Start time: ${moment(startTime).format("DD MMM YYYY hh:mm:ss a")}. End time: ${moment(endTime).format("DD MMM YYYY hh:mm:ss a")}.`;
  if (day) greeting += ` Happy ${day}!`;

  let responseBody = {
      message: greeting,
      input: event
  };
  
  // The output from a Lambda proxy integration must be 
  // in the following JSON object. The 'headers' property 
  // is for custom response headers in addition to standard 
  // ones. The 'body' property  must be a JSON string. For 
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  let response = {
      statusCode: responseCode,
      headers: {
          "x-custom-header" : "my custom header value"
      },
      body: JSON.stringify(responseBody)
  };
  console.log("response: " + JSON.stringify(response))
  return response;
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};