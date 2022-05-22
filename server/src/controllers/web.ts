import express from "express";
import bodyParser from "body-parser";
import { listThreadResponses, postResponse } from "../models/response";
import { createThread, getThread, listThreads } from "../models/thread";
import { calculateHashId } from "./hash";
import Encoding from 'encoding-japanese';
import iconv from "iconv-lite";

export const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
  })
);

function parseUrlEncodedShiftJIS(encoded: string): string {
  const urlDecoded = Encoding.urlDecode(encoded);
  const codepoints = Encoding.convert(urlDecoded, {
    from: 'SJIS',
    to: 'UNICODE',
  });
  return Encoding.codeToString(codepoints);
}

app.post("/test/bbs.cgi", (req, res, next) => {
  const { FROM: nameEncoded, mail: mailEncoded, MESSAGE: contentEncoded } = req.body;
  const name = parseUrlEncodedShiftJIS(nameEncoded);
  const mail = parseUrlEncodedShiftJIS(mailEncoded);
  const content = parseUrlEncodedShiftJIS(contentEncoded);
  const hashId = calculateHashId(req);

  let result;
  if ("subject" in req.body) {
    const title = req.body.subject;
    // thread
    result = createThread(title)
      .then((thread) => {
        const threadId = thread.id;
        return postResponse({
          threadId,
          name,
          mail,
          content,
          hashId,
        });
      })
  } else if ("key" in req.body) {
    const threadId = parseInt(req.body.key, 10);
    // response
    result = postResponse({
      threadId,
      name,
      mail,
      content,
      hashId,
    })
  } else {
    result = Promise.reject('failed to parse request');
  }
  return result
    .then(() => {
      res.status(200);
      // I don't know why but Jane Style only works with the following code.
      res.set('Content-Type', 'text/html; charset=EUC-JP');
      const body = `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="EUC-JP">
        </head>
        <body>
          書きこみが終りました。
        </body>
      </html>`;
      const buffer = iconv.encode(body, 'EUC-JP');
      res.set("Content-Type", "text/html; charset=EUC-JP");
      res.send(buffer);
    })
    .catch(next);
});

app.get("/subject.txt", (req, res, next) => {
  return listThreads()
    .then((threads) => {
      const body = threads
        .map((thread) => {
          const { id, title } = thread;
          return `${id}.dat<>${title} (${thread._count.Response})`;
        })
        .join("\r\n") + "\r\n";
        const buffer = iconv.encode(body, 'shift_jis');
        res.set("Content-Type", "text/plain; charset=shift_jis");
        res.send(buffer);
    })
    .catch(next);
});

app.get("/dat/:id.dat", (req, res, next) => {
  const { id: threadId } = req.params;
  Promise.all([
    getThread(Number(threadId)),
    listThreadResponses(Number(threadId)),
  ])
    .then(([thread, responses]) => {
      if (!thread) {
        res.status(404).send(`Thread ${threadId} not found.`);
        return;
      }
      const body = responses
        .map((response) => {
          const { name, mail, postedAt, hashId, content, number } = response;
          // todo: serialize postedAt
          return `${name}<>${mail}<>${postedAt} ${hashId}<>${content.replaceAll('\r\n', ' <br> ').replaceAll('\n', ' <br> ')}<>${
            number === 1 ? thread.title : ""
          }`;
        })
        .join("\r\n") + "\r\n";
      const buffer = iconv.encode(body, 'shift_jis');
      res.set("Content-Type", "text/plain; charset=shift_jis");
      res.send(buffer);
    })
    .catch(next);
});
