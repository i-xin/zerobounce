const fs = require("fs");
const request = require("request");
const constants = require("./constants");
const parse = require("csv-parse");

/**
 * Assume file is in same directory
 */
const sendFile = (filename) => {
  const name = filename ? filename : "test.csv";
  const formData = {
    file: {
      value: fs.createReadStream(name),
      options: {
        filename: name,
        contentType: "text/csv",
      },
    },
    api_key: constants.API_KEY,
    email_address_column: 1,
    return_url: constants.RETURN_URL,
  };

  request.post(
    constants.API_ENDPOINT + "/sendfile",
    {
      formData: formData,
    },
    (error, response, data) => {
      if (error) {
        console.error(`${error.code}: ${error.message}`);
      }
      console.log(data);
      // console.log("statusCode:", response && response.statusCode);
      const body = JSON.parse(response.body);
      console.log("Success:", body.success);
      console.log("File Id:", body.file_id);
    }
  );
};
exports.sendFile = sendFile;
//sendFile();

function requestCallback(err, res, body) {
  if (err) {
    console.error(err);
  }
  parse(
    body.trim(),
    {
      columns: true,
    },
    (err, records) => {
      const valid = records.filter(
        (row) => row["Email Address"] === "kevinzh1884@gmail.com"
      );
      console.log(`valid records are: ${JSON.stringify(valid)}`);
      console.log(`records are: ${JSON.stringify(records)}`);
    }
  );
}

const getFile = (fileId) => {
  request.get(
    constants.API_ENDPOINT + "/getfile",
    {
      qs: {
        api_key: constants.API_KEY,
        file_id: fileId,
      },
    },
    requestCallback
  );
};
exports.getFile = getFile;
getFile("4bbd4177-bd4d-4d64-aaaa-d1dd93fdb582");

exports.deleteFile = (fileId) => {
  request.get(
    constants.API_ENDPOINT + "/deletefile",
    {
      qs: {
        api_key: constants.API_KEY,
        file_id: fileId,
      },
    },
    requestCallback
  );
};
