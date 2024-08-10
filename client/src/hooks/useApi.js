import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import useToastHook from '../components/Common/Toast';
import { destroyToken, handlerErrors } from '../utils/helpers';
import { useNavigate } from "react-router-dom";

const useApi = () => {
    const toast = useToastHook();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const latestRequestRef = useRef(null);

    const callApi = useCallback(async ({ url, method = 'GET', body = null }) => {
        setLoading(true);
        setError(null);

        latestRequestRef.current = { url, method, body };

        try {
            url = process.env.REACT_APP_BASEURL + url;
            const response = await axios({
                url,
                method,
                data: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setData(response.data);
        } catch (err) {
            if (err.response.status === 401) {
                destroyToken(navigate);
            } else {
                toast(handlerErrors(err), "error");
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }, [navigate, toast]);

    const refetch = useCallback(() => {
        if (latestRequestRef.current) {
            callApi(latestRequestRef.current);
        }
    }, [callApi]);

    return { data, loading, error, callApi, refetch };
};

export default useApi;
