import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { postResponse, postThreads } from "../api/client";

type Props = {
  threadId?: number;
};

export function NewResponseForm(props: Props) {
  const isCreatingThread = props.threadId === undefined;
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function onClickPostButton() {
    let postResult;
    if (props.threadId === undefined) {
      postResult = postThreads({
        title,
        name,
        mail,
        content,
      });
    } else {
      postResult = postResponse({
        threadId: props.threadId,
        name,
        mail,
        content,
      });
    }
    postResult.then(() => {
        setTitle('');
        setName('');
        setMail('');
        setContent('');
    })
  }

  return (
    <Form className="m-3">
      {isCreatingThread && (
        <Form.Control
          className="mb-3"
          type="text"
          value={title}
          placeholder="スレッドタイトル"
          onChange={(event: any) => setTitle(event.target.value)}
        />
      )}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            value={name}
            placeholder="名前"
            onChange={(event: any) => setName(event.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={mail}
            placeholder="メール"
            onChange={(event: any) => setMail(event.target.value)}
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          value={content}
          placeholder="本文"
          onChange={(event) => setContent(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={onClickPostButton}>
        {isCreatingThread ? "新規スレッド作成" : "書き込む"}
      </Button>
    </Form>
  );
}
