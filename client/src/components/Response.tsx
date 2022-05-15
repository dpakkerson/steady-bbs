import React from "react";
import './Response.css';

type Props = {
    number: number;
    name: String;
    mail: String;
    timestamp: Date;
    content: String;
    hashId: String;
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
    <p className="ms-3">
        {props.content}
    </p>
  </div>
}