import useSWR, { mutate } from 'swr';
import { getApiUrl } from './client';
import { APIResponse, APIThread } from './model';

export function useAPI<T>(path: string) {
    // @ts-ignore
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {data, error} = useSWR<T>(path, fetcher);
    return {
        data,
        error,
        loading: !error && !data,
    };
}

export function useThreads() {
    const {data, error, loading} = useAPI<(APIThread & {_count: {Response: number}})[]>(getApiUrl('/api/threads'));
    if (data) {
        data.forEach(thread => {
            mutate(getApiUrl(`/api/threads/${thread.id}`), thread, false);
        })
    }
    return {
        threads: data,
        error,
        loading,
    };
}

export function useThread(threadId: number) {
    const {data, error, loading} = useAPI<APIThread>(getApiUrl(`/api/threads/${threadId}`));
    return {
        thread: data,
        error,
        loading,
    };
}

export function useThreadResponses(threadId: number) {
    const {data ,error, loading} = useAPI<APIResponse[]>(getApiUrl(`/api/threads/${threadId}/responses`))
    return {
        responses: data,
        error,
        loading,
    };
}