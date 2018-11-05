import express from "express";
import fs from "fs";

const app: express.Application = express();
let filePath = __dirname + "/api/events.json";

interface Event {
  type: string;
  events: Array<object>;
}

/* Events */
app.get("/api/events", function(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  let typeValues = req.query.type;

  /* Read Json */
  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    let jsondata: object = JSON.parse(data.toString("utf8"));
  });

  res.sendFile(filePath);
});

/* Start */
app.listen(8000, function() {
  let startDate = new Date(); //get start server date

  console.log("Example app listening on port 8000!");
});
