import React from "react";
import ReactDOM from "react-dom";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Database () {
    
    const data = [
        {id: 1, light: 10, humidity: 4, ultrasound: 20, temperature: 26 },
        {id: 2, light: 11, humidity: 5, ultrasound: 22, temperature: 24 },
        {id: 3, light: 12, humidity: 4, ultrasound: 22, temperature: 28 }
    ];

    const camelCase = (str) =>  {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    };

    const filterColumns = (data) => {
        // Get column names
        const columns = Object.keys(data[0]);

        // Remove by key (firstname)
        const filterColsByKey = columns.filter(c => c !== 'id');

        // OR use the below line instead of the above if you want to filter by index
        // columns.shift()

        return filterColsByKey // OR return columns
    };

    return (
        <div className="App">
            <ExcelFile filename="test">
                <ExcelSheet data={data} name="Test">
                    {
                        filterColumns(data).map((col)=> {
                            return <ExcelColumn label={camelCase(col)} value={col}/>
                        })
                    }
                </ExcelSheet>
            </ExcelFile>
            <table id="table-to-xls">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.light}</td>
                            <td>{item.humidity}</td>
                            <td>{item.ultrasound}</td>
                            <td>{item.temperature}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

}