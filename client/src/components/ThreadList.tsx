import { Link } from "react-router-dom";
import { useThreads } from "../api/useAPI";
import { LoadingIndicator } from "./LoadingIndicator";

type Props = {
    maxThreadCount?: number;
};

export default function ThreadList(props: Props) {
  const {threads, loading} = useThreads();
  return <div>
    {threads?.map(thread => {
      return <Link to={`/threads/${thread.id}`} className='ms-3' key={thread.id}>{`${thread.title} (${thread._count.Response})`}</Link>
    })}
    {loading ? <LoadingIndicator /> : null}
  </div>
}