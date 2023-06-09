import React from 'react';

function TableComponent({ headers, data }) {
    return (
        <div className="bg-gray-200 rounded-lg">
            <div className="grid grid-cols-3 border-b font-bold">
                {headers.map((value, index) => (
                    <div key={index} className="border border-black p-2">
                        {value} 
                        <span className="pl-2">↑↓</span>
                    </div>
                ))}
            </div>
            {data.map((row, index) => (
                <div className="grid grid-cols-3 border-black" key={index}>
                    <div className="border border-black p-2">{row.glosses}</div>
                    <div className="border border-black p-2">{row.property1}</div>
                    <div className="border border-black p-2">{row.property2}</div>
                </div>
            ))}
        </div>
    );
}

export default TableComponent;
