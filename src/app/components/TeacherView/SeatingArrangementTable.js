import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSharedSelector } from "../../shared";
import ReactToPrint from "react-to-print";
import PrintHeader from "../PrintHeader";
import { useReactToPrint } from "react-to-print";
const SeatingArrangementTable = ({
  coursesData,
  resultSchedule,
  setResultSchedule,
  data,
}) => {
  const { ExamSchedulesListing, ExamSchedulesListingSuccess } =
    useSharedSelector((state) => state.ListAllExamSchedules);
  const [printActive, setPrintActive] = useState(false);
  useEffect(() => {
    console.log("resultSchedule", data);
  }, [data]);
  const componentRef = useRef();

  const columnsPerPart = 8;

  // Split the table into parts
  const splitTableIntoParts = () => {
    const tableParts = [];
    const totalColumns = resultSchedule?.seating[0].length;

    for (let i = 0; i < totalColumns; i += columnsPerPart) {
      const tablePart = resultSchedule?.seating.map((row) =>
        row.slice(i, i + columnsPerPart)
      );
      tableParts.push(tablePart);
    }

    return tableParts;
  };

  // Generate the table parts
  const tableParts = splitTableIntoParts();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (printActive) {
      handlePrint();
      setPrintActive(false);
    }
  }, [printActive]);
  return (
    <>
      <p className="text-center fs-3">Resulting Schedule</p>
      <button
        className="btn btn-warning"
        onClick={() => setPrintActive(!printActive)}
      >
        Print Schedule
      </button>
      {/* <ReactToPrint
        trigger={() => (
          <button className="btn btn-warning">Print Schedule</button>
        )}
        content={() => componentRef.current}
        onBeforePrint={() => setPrintActive(true)}
        
        onAfterPrint={() => setPrintActive(false)}
      /> */}
      <div className="w-100 overflow-auto">
        {/* <table className="seating-arr w-100">
          <tr className="seating-arr-tr heading">
            <th className="seating-arr-th"></th>
            {resultSchedule &&
              resultSchedule?.seating &&
              resultSchedule?.seating[0]?.map((item, index) => {
                return (
                  <th className="seating-arr-th row-name">C{index + 1}</th>
                );
              })}
          </tr>

          {resultSchedule &&
            resultSchedule?.seating?.map((row, rowIndex) => (
              <tr className="seating-arr-tr">
                <td className="seating-arr-td column-name">R{rowIndex + 1}</td>
                {row &&
                  row?.map((col, colIndex) => (
                    <Tooltip
                      title={
                        <div className="d-flex flex-column">
                          {col ? (
                            <>
                              <span>{col.fullname}</span>
                              <span>
                                <b>GPA</b>: {col.gpa}
                              </span>
                              <span>
                                <b>Teacher Review</b>: {col.teacherReview}
                              </span>
                              <span>
                                <b>Ever Cheated</b>:{" "}
                                {col.cheatingHistory === 1 ? "Yes" : "No"}
                              </span>
                            </>
                          ) : (
                            "Empty"
                          )}
                        </div>
                      }
                    >
                      <td className="seating-arr-td seat">
                        {col ? `${col.fullReg}` : ""}
                      </td>
                    </Tooltip>
                  ))}
              </tr>
            ))}
        </table> */}
        {/* <hr /> */}
        <div ref={componentRef} className="print-table">
          <PrintHeader
            printActive={printActive}
            examClasses={data?.classesData.map(
              (item) =>
                `${item.batchName.split("-")[0]} - ${item.programName}(${
                  item.batchName.split("-")[1]
                }), `
            )}
            examName={data?.examName}
            examTeachers={data?.classesData.map(
              (item) => `${item.teacherName}, `
            )}
            examCourses={data?.classesData.map(
              (item) => `${item.courseName.split("-")[0]}, `
            )}
            examDate={data?.examDate}
            examTime={data?.examTime}
            examHall={data?.hallName}
          />

          {tableParts.map((part, tablePartIndex) => (
            <>
              <table className="seating-arr" key={tablePartIndex}>
                <tr className="seating-arr-tr heading">
                  <th className="seating-arr-th"></th>
                  {part[0]?.map((item, index) => {
                    return (
                      <th className="seating-arr-th row-name">
                        C{index + 1 + tablePartIndex * columnsPerPart}
                      </th>
                    );
                  })}
                </tr>
                <tbody>
                  {part.map((row, rowIndex) => (
                    <tr className="seating-arr-tr">
                      <td className="seating-arr-td column-name">
                        R{rowIndex + 1}
                      </td>
                      {row &&
                        row?.map((col, colIndex) => (
                          <Tooltip
                            title={
                              <div className="d-flex flex-column">
                                {col ? (
                                  <>
                                    <span>{col.fullname}</span>
                                    <span>
                                      <b>GPA</b>: {col.gpa}
                                    </span>
                                    <span>
                                      <b>Teacher Review</b>: {col.teacherReview}
                                    </span>
                                    <span>
                                      <b>Ever Cheated</b>:{" "}
                                      {col.cheatingHistory === 1 ? "Yes" : "No"}
                                    </span>
                                  </>
                                ) : (
                                  "Empty"
                                )}
                              </div>
                            }
                          >
                            <td className="seating-arr-td seat">
                              {col ? `${col.fullReg}` : ""}
                            </td>
                          </Tooltip>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="my-4" />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeatingArrangementTable;
