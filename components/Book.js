import { useState, useEffect } from "react";
import axios from "axios";

const Book = () => {
    const [textData, setData] = useState([]);

    const fetch = async () => {
        const response = await axios.get('https://store.rerum.io/v1/id/610c54deffce846a83e70625')
        setData(response.data.itemListElement)
    } 
    
    return (
        <div className="py-4">
            {textData.map((data, index) => (
                <div key={index}> {data.label} </div>
            ))}
        </div>

    );
};

export default Book;