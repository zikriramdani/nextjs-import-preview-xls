import React, { useEffect, useState, useCallback } from "react";
import Head from 'next/head';
import Papa from "papaparse";

import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

import { groupBy } from "../constants/helpConstants";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const Home = () => {
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  // This state will store the parsed data
  const [data, setData] = useState([]);
  const [dataCabang, setDataCabang] = useState({});
  const [dataCabangArray, setDataCabangArray] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");
   
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
      setError("");
       
      // Check if user has entered the file
      if (e.target.files.length) {
          const inputFile = e.target.files[0];
           
          // Check the file extensions, if it not
          // included in the allowed extensions
          // we show the error
          const fileExtension = inputFile?.type.split("/")[1];
          if (!allowedExtensions.includes(fileExtension)) {
              setError("Please input a csv file");
              return;
          }

          // If input type is correct set the state
          setFile(inputFile);
      }
  };
  const handleParse = () => {
       
      // If user clicks the parse button without
      // a file we show a error
      if (!file) return setError("Enter a valid file");

      // Initialize a reader which allows user
      // to read any file or blob.
      const reader = new FileReader();
       
      // Event listener on reader when the file
      // loads, we parse it and set the data.
      reader.onload = async ({ target }) => {
          const csv = Papa.parse(target.result, { 
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              const rowsArray = [];
              const valuesArray = [];

              // Iterating data to get column name and their values
              results.data.map((d) => {
                rowsArray.push(Object.keys(d));
                valuesArray.push(Object.values(d));
              });

              // Filtered Column Names
              setTableRows(rowsArray[0]);

              // Filtered Values
              setValues(valuesArray);
            }
          });

          const parsedData = csv?.data;
          const values = Object.values(parsedData);
          const uniqueReduce = values.reduce((result, element) => {
            return result.includes(element['Roles SDM']) ? result : [...result, element['Roles SDM']]
          }, []);
          const uniqArray = [];
          uniqueReduce.map((items, index) => {
            uniqArray.push({
              id: index+1,
              roles_sdm: items,
              show: false
            })
            setData(uniqArray);
          })
          // console.log('uniqueReduce', uniqueReduce)
          
          const groupBye = groupBy(values, 'Roles SDM');
          setDataCabang(groupBye);
          
      };
      reader.readAsText(file);
  };

  const handleChange = (rolesSDM) => {
    data.map((item) => {
      if (item.roles_sdm.toLowerCase() === rolesSDM.toLowerCase()) {
        item.show = !item.show;
      } else {
        item.show = false;
      }
    });
    setData([...data]);

    // Antar Cabang
    const uniqueReduce = dataCabang[rolesSDM].reduce((result, element) => {
      return result.includes(element) ? result : [...result, element]
    }, []);
    // console.log('uniqueReduce', uniqueReduce)

    const uniqArray = [];
    uniqueReduce.map((items, index) => {
      uniqArray.push({
        id: index+1,
        roles_sdm: items['Roles SDM'],
        urutan_1: items['Urutan 1'],
        urutan_2: items['Urutan 2'],
        urutan_3: items['Urutan 3'],
        urutan_4: items['Urutan 4'],
        urutan_5: items['Urutan 5'],
        urutan_6: items['Urutan 6'],
        urutan_7: items['Urutan 7'],
        urutan_8: items['Urutan 8'],
      });
    });
    // console.log('uniqArray', uniqArray)

    var newArr = [];
    uniqArray.map((item) => {
      if(newArr.some(el => el.roles_sdm === item.roles_sdm) === false) {
        newArr.push({
          roles_sdm: item.roles_sdm,
          urutan_1: item.urutan_1,
          urutan_2: item.urutan_2,
          urutan_3: item.urutan_3,
          urutan_4: item.urutan_4,
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        });
      } else if(newArr.some(el => el.urutan_1 === item.urutan_1) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: item.urutan_1,
          urutan_2: item.urutan_2,
          urutan_3: item.urutan_3,
          urutan_4: item.urutan_4,
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_2 === item.urutan_2) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: item.urutan_2,
          urutan_3: item.urutan_3,
          urutan_4: item.urutan_4,
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_3 === item.urutan_3) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: item.urutan_3,
          urutan_4: item.urutan_4,
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_4 === item.urutan_4) === false) {
        console.log('urutan4')
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: "",
          urutan_4: item.urutan_4,
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_5 === item.urutan_5) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: "",
          urutan_4: "",
          urutan_5: item.urutan_5,
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_6 === item.urutan_6) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: "",
          urutan_4: "",
          urutan_5: "",
          urutan_6: item.urutan_6,
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_7 === item.urutan_7) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: "",
          urutan_4: "",
          urutan_5: "",
          urutan_6: "",
          urutan_7: item.urutan_7,
          urutan_8: item.urutan_8
        })
      } else if(newArr.some(el => el.urutan_8 === item.urutan_8) === false) {
        newArr.push({
          roles_sdm: "",
          urutan_1: "",
          urutan_2: "",
          urutan_3: "",
          urutan_4: "",
          urutan_5: "",
          urutan_6: "",
          urutan_7: "",
          urutan_8: item.urutan_8
        })
      };
    });
    // console.log('newArr', newArr)
    setDataCabangArray(newArr);
    
  };

  return (
    <div className="container-fluid">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div >
          <div className="input-group mb-3">
            <div className="form-inline">
              <div className="form-group mx-sm-3 mb-2"
              style={{margin: "0px!important"}}>
                <input
                  type="file"
                  name="file"
                  id="csvInput"
                  accept=".csv"
                  style={{ display: "block", margin: "10px auto" }}
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={handleParse}>Preview</button>
            </div>
          </div>
        </div>

        <div>
          <Tabs
            defaultActiveKey="Input"
            id="fill-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Input" title="Input" className="ext-black-50">
              <div className="mb-3">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      {tableRows?.map((rows, index) => {
                        return <th key={index}>{rows}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {values?.map((value, index) => (
                      <tr key={index}>
                        {value?.map((val, i) => (
                          <td key={i}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="Output" title="Output">
              <div className="d-flex mb-3">
                {data.length > 0 ? (
                  <>
                    {error ? error : data?.map((col,idx) => (
                      <div className="align-items-center d-flex mr-2">
                        <input
                          key={idx}
                          name="data"
                          type="radio"
                          value={col.roles_sdm}
                          onChange={() => handleChange(col.roles_sdm)}
                          className="mr-1"
                        /> {col.roles_sdm}
                      </div>
                    ))}
                  </>
                ) : null }
              </div>

              <div className="mb-3">
                <Table bordered hover responsive className="d-tables">
                  <thead>
                    <tr style={{backgroundColor: "yellow"}}>
                      {tableRows?.map((rows, index) => {
                        return <th key={index}>{rows}</th>;
                      })}
                    </tr>
                  </thead>
                  {/* Box */}
                  <tbody>
                    {dataCabangArray?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.roles_sdm == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.roles_sdm}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_1 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_1}

                              {item.roles_sdm == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_2 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_2}

                              {item.urutan_1 == "" ? (
                               null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_3 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_3}

                              {item.urutan_2 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_4 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_4}

                              {item.urutan_3 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_5 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_5}

                              {item.urutan_4 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_6 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_6}

                              {item.urutan_5 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_7 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_7}

                              {item.urutan_6 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.urutan_8 == "" ? (
                            null
                          ) : (
                            <div className="d-box d-flex align-items-center">
                              {item.urutan_8}

                              {item.urutan_7 == "" ? (
                                null
                              ) : (
                                <div className="d-line"></div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </main>

      <footer >
        <a
          href="https://github.com/zikriramdani"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Zikri Ramdani
        </a>
      </footer>
    </div>
  )
}

export default Home;
