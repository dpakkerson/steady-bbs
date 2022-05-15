import React from "react";
import './ThreadTitle.css';

type Props = {
    title: string;
};

export default function Thread(props: Props) {
  const {title} = props;
  return <span className='thread-title'>{title}</span>
}