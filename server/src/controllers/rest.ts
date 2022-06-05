import express from "express";
import { getLocalRule } from "../models/config";
import { listThreadResponses, postResponse } from "../models/response";
import { createThread, getThread, listThreads } from "../models/thread";
import { calculateHashId } from "./hash";

export const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "rest app route." });
});

app.post("/threads", (req, res, next) => {
  const hashId = calculateHashId(req);
  const { title, name, mail, content } = req.body;
  createThread(title)
    .then((thread) => {
      const threadId = thread.id;
      return Promise.all([
        Promise.resolve(thread),
        postResponse({
          threadId,
          name,
          mail,
          content,
          hashId,
        }),
      ]);
    })
    .then(([thread, response]) => {
      res.json({
        thread,
        response,
      });
    })
    .catch(next);
});

app.get("/threads", (req, res, next) => {
  listThreads()
    .then((threads) => {
      res.json(threads);
    })
    .catch(next);
});

app.get("/threads/:id", (req, res, next) => {
  const { id } = req.params;
  getThread(Number(id))
    .then((thread) => {
      if (thread === null) {
        res.status(404).json({
          message: "not found.",
        });
      } else {
        res.json(thread);
      }
    })
    .catch(next);
});

app.get("/threads/:id/responses", (req, res, next) => {
  const { id } = req.params;
  listThreadResponses(Number(id))
    .then((responses) => {
      res.json(responses);
    })
    .catch(next);
});

app.post("/responses", (req, res, next) => {
  const hashId = calculateHashId(req);
  const { threadId, name, mail, content } = req.body;
  postResponse({
    threadId,
    name,
    mail,
    content,
    hashId,
  })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

app.get("/config/localrule", (req, res) => {
  return res.json({ body: getLocalRule() });
})