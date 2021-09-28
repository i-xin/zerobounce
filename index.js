const fs = require("fs");
const request = require("request");

const apiEndpoint = "https://bulkapi.zerobounce.net/v2";

// const formData = {
//   file: {
//     value: fs.createReadStream("/tmp/test.csv"),
//     options: {
//       filename: "test.csv", //"test.csv",
//       contentType: "text/csv",
//     },
//   },
//   api_key: "your-api-key", // this._getApiKey(),
//   email_address_column: 1,
//   return_url: "https://www.example.com",
// };

// request.post(
//   apiEndpoint + "/sendfile",
//   {
//     formData: formData,
//   },
//   (error, response, data) => {
//     if (error) {
//       console.error(`${error.code}: ${error.message}`);
//     }
//     console.log(response.error);
//     console.log(data);
//     console.log("statusCode:", response && response.statusCode);
//     const body = JSON.parse(response.body);
//     console.log("body:", body.success);
//     console.log("data:", body.file_id);
//   }
// );
// request.get(
//   apiEndpoint + "/getfile",
//   {
//     qs: {
//       api_key: "your-api-key",
//       file_id: "020fe5b4-19e1-46c8-a767-7be51aa53ba1",
//     },
//   },
//   requestCallback
// );

function requestCallback(err, res, body) {
  console.error(err);
  console.log(JSON.parse(body));
  console.log(res.statusCode);
  console.log(res.statusMessage);
}

request.get(
  apiEndpoint + "/deletefile",
  {
    qs: {
      api_key: "your-api-key",
      file_id: "020fe5b4-19e1-46c8-a767-7be51aa53ba1",
    },
  },
  requestCallback
);
