const fs = require("fs");
const request = require("request");

const apiEndpoint = "https://bulkapi.zerobounce.net/v2";
const apiKey = "";
const fileId = "";
function sendFile() {
  const formData = {
    file: {
      value: fs.createReadStream("/tmp/test.csv"),
      options: {
        filename: "test.csv",
        contentType: "text/csv",
      },
    },
    api_key: apiKey,
    email_address_column: 1,
    return_url: "https://www.example.com",
  };

  request.post(
    apiEndpoint + "/sendfile",
    {
      formData: formData,
    },
    (error, response, data) => {
      if (error) {
        console.error(`${error.code}: ${error.message}`);
      }
      console.log(response.error);
      console.log(data);
      console.log("statusCode:", response && response.statusCode);
      const body = JSON.parse(response.body);
      console.log("body:", body.success);
      console.log("data:", body.file_id);
    }
  );
}

function getFile() {
  request.get(
    apiEndpoint + "/getfile",
    {
      queryString: {
        api_key: apiKey,
        file_id: fileId,
      },
    },
    requestCallback
  );
}

function requestCallback(err, res, body) {
  console.error(err);
  console.log(JSON.parse(body));
  console.log(res.statusCode);
  console.log(res.statusMessage);
}

function deleteFile() {
  request.get(
    apiEndpoint + "/deletefile",
    {
      qs: {
        api_key: apiKey,
        file_id: fileId,
      },
    },
    requestCallback
  );
}
