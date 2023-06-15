import { useState, useEffect } from "react";
import axios from "axios";

const getFetchData = (url) => {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            const totalCount = response.data.numberOfItems;
            const totalPagesCalc = Math.ceil(totalCount / 12);
            setData(response.data.itemListElement);
            setTotalPages(totalPagesCalc);
        };

        fetchData();
    }, [url]);

    return { data, setData, totalPages, setTotalPages };
};

export default getFetchData;
