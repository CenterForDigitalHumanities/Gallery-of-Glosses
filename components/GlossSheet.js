import React from 'react';

function TableComponent({ headers, data }) {
    return (
        <div className="rounded-lg">
            <div className={`text-2xl bg-accent text-yellow-200 cursor-pointer grid grid-cols-${headers.length} border-black font-bold`}>
                {headers.map((value, index) => (
                    <div key={index} className="hover:bg-darkGrey transition flex border border-black p-2">
                        {value} 
                        <div className="pl-2 ml-auto">↑↓</div>
                    </div>
                ))}
            </div>
            {data.map((row, index) => (
                <div className={`grid grid-cols-${headers.length} border-black`}  key={index}>
                    {headers.map((header, i) => (
                        <div className="border border-black p-2" key={i}>{row[header]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default TableComponent;
