import useSWR from 'swr';
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
    const {data, error, loading} = useAPI<APIThread[]>(getApiUrl('/api/threads'));
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