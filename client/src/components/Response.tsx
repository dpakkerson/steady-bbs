import React from "react";
import { Link } from "react-router-dom";
import './Response.css';

type Props = {
    number: number;
    name: String;
    mail: String;
    timestamp: Date;
    content: String;
    hashId: String;
    threadId: number;
};

export default function Response(props: Props) {
  return <div>
    <div className="response-header">
      <span>{props.number + ' 名前: '}</span>
      {props.mail.length > 0 ? 
        <a href={`mailto:${props.mail}`} className="response-name-hasmail">{props.name}</a>
        :
        <span className="response-name-nomail">{props.name}</span>        
      }
      <span>{` : ${props.timestamp} ID: ${props.hashId}`}</span>
    </div>
    <p className="ms-3 response-body">
        {props.content.split('\n').map(line => {
          return <>
            {line.split(/(>>\d+)/g).map(token => {
              if (token.match(/^>>\d+$/)) {
                return <Link to={`/threads/${props.threadId}/${parseInt(token.substring(2), 10)}`}>{token}</Link>;
              } else {
                return token;
              }
            })}
            <br />
          </>
        })}
    </p>
  </div>
}