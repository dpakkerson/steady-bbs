import useSWR from 'swr';
import { getApiUrl } from './client';
import { Response, Thread } from './model';

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
    const {data, error, loading} = useAPI<Thread[]>(getApiUrl('/api/threads'));
    return {
        threads: data,
        error,
        loading,
    };
}

export function useThreadResponses(threadId: number) {
    const {data ,error, loading} = useAPI<Response[]>(getApiUrl(`/api/threads/${threadId}/responses`))
    return {
        responses: data,
        error,
        loading,
    };
}