import express from "express";
import bodyParser from "body-parser";
import { listThreadResponses, postResponse } from "../models/response";
import { createThread, getThread, listThreads } from "../models/thread";
import { calculateHashId } from "./hash";
import iconv from "iconv-lite";

export const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded",
  })
);

app.post("/test/bbs.cgi", (req, res, next) => {
  const { FROM: name, mail, MESSAGE: content } = req.body;
  const hashId = calculateHashId(req);
  if ("subject" in req.body) {
    const title = req.body.subject;

    // thread
    createThread(title)
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
      .then(() => {
        res.send("success!");
      })
      .catch(next);
  } else if ("key" in req.body) {
    const threadId = req.body.key;
    // response
    postResponse({
      threadId,
      name,
      mail,
      content,
      hashId,
    })
      .then(() => {
        res.send("success!");
      })
      .catch(next);
  }
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
