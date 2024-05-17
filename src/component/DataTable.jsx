import React from "react";

// DataTable 컴포넌트 정의
const DataTable = ({ data }) => {
  // 테이블 헤더와 바디 데이터를 매개변수로 받습니다.
  return (
    <table className="table  ">
      <thead className="text-lg bg-mywhite rounded-lg ">
        <tr>
          <th className="w-1/3">Category</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody className="text-md">
        {data?.map((item, index) => (
          <tr key={index}>
            <td>{item.category}</td>
            <td>{item.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
