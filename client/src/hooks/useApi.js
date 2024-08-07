import { useState, useCallback } from 'react';
import axios from 'axios';
import useToastHook from '../components/Common/Toast';
import { handlerErrors } from '../constants/helpers';

const useApi = () => {
    const toast = useToastHook();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async ({ url, method = 'GET', body = null }) => {
        setLoading(true);
        setError(null);

        try {
            url = process.env.REACT_APP_BASEURL + url
            const response = await axios({
                url,
                method,
                data: body,
            });

            setData(response.data);
        } catch (err) {
            toast(handlerErrors(err), "error");
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, callApi };
};

export default useApi;
