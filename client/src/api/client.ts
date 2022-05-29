import { useSWRConfig } from "swr";
import { APIResponse, APIThread } from "./model";

export function getApiUrl(apiPath: string): string {
  if (appConfig.publicUrl.endsWith("/")) {
    return (
      appConfig.publicUrl.substring(0, appConfig.publicUrl.length - 1) + apiPath
    );
  } else {
    return appConfig.publicUrl + apiPath;
  }
}

type PostThreadsPayload = {
  title: string;
  name: string;
  mail: string;
  content: string;
};

type PostThreadsResponse = {
  thread: APIThread;
  response: APIResponse;
};

export function usePostThreads() {
  const {mutate} = useSWRConfig();
  function postThreads(
    payload: PostThreadsPayload
  ): Promise<PostThreadsResponse> {
    return fetch(getApiUrl("/api/threads"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      mutate(getApiUrl("/api/threads"));
      return response.json();
    });
  }
  return {postThreads};  
}

type PostResponsePayload = {
  threadId: number;
  name: string;
  mail: string;
  content: string;
};

export function usePostResponse() {
  const {mutate} = useSWRConfig();
  function postResponse(payload: PostResponsePayload): Promise<APIResponse> {
    return fetch(getApiUrl("/api/responses"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => { 
      mutate(getApiUrl(`/api/threads/${payload.threadId}/responses`));
      mutate(getApiUrl("/api/threads"));  
      return response.json();
    });
  }
  return {postResponse};
}
