import { Tooltip } from "antd";
import React, { useEffect } from "react";
import { useSharedSelector } from "../../shared";

const SeatingArrangementTable = ({
  coursesData,
  resultSchedule,
  setResultSchedule,
}) => {
  const { ExamSchedulesListing, ExamSchedulesListingSuccess } =
    useSharedSelector((state) => state.ListAllExamSchedules);
  useEffect(() => {
    console.log(resultSchedule);
  }, [resultSchedule]);
  return (
    <>
      <p className="text-center fs-3">Resulting Schedule</p>
      <div className="w-100 overflow-auto">
        <table className="seating-arr w-100">
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
                    <Tooltip title={col ? col.fullname : "Empty"}>
                      <td className="seating-arr-td seat">
                        {col ? `${col.fullReg}` : ""}
                      </td>
                    </Tooltip>
                  ))}
              </tr>
            ))}
          {/* <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C1</td>
          <td className="seating-arr-td seat">FA18-BSE-001</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-002</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-003</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-004</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-005</td>
          <td className="seating-arr-td seat"></td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C2</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-006</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-007</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-008</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-009</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-010</td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C3</td>
          <td className="seating-arr-td seat">FA18-BSE-001</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-002</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-003</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-004</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-005</td>
          <td className="seating-arr-td seat"></td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C4</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-006</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-007</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-008</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-009</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-010</td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C5</td>
          <td className="seating-arr-td seat">FA18-BSE-001</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-002</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-003</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-004</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-005</td>
          <td className="seating-arr-td seat"></td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C6</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-006</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-007</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-008</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-009</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-010</td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C7</td>
          <td className="seating-arr-td seat">FA18-BSE-001</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-002</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-003</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-004</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-005</td>
          <td className="seating-arr-td seat"></td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C8</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-006</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-007</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-008</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-009</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-010</td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C9</td>
          <td className="seating-arr-td seat">FA18-BSE-001</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-002</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-003</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-004</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-005</td>
          <td className="seating-arr-td seat"></td>
        </tr>
        <tr className="seating-arr-tr">
          <td className="seating-arr-td column-name">C10</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-006</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-007</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-008</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-009</td>
          <td className="seating-arr-td seat"></td>
          <td className="seating-arr-td seat">FA18-BSE-010</td>
        </tr> */}
        </table>
      </div>
    </>
  );
};

export default SeatingArrangementTable;
