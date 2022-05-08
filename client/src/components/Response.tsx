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
        {`${props.number}: ${props.name} ${props.timestamp} ID: ${props.hashId}`}
    </div>
    <p>
        {props.content}
    </p>
  </div>
}