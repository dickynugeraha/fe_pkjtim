import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Gap from "./Gap";

const TableCustom = () => {
  const data = useMemo(
    () => [
      {
        name: "Kim Parrish",
        address: "4420 Valley Street, Garnerville, NY 10923",
        date: "07/11/2020",
        order: "87349585892118",
      },
      {
        name: "Michele Castillo",
        address: "637 Kyle Street, Fullerton, NE 68638",
        date: "07/11/2020",
        order: "58418278790810",
      },
      {
        name: "Eric Ferris",
        address: "906 Hart Country Lane, Toccoa, GA 30577",
        date: "07/10/2020",
        order: "81534454080477",
      },
      {
        name: "Gloria Noble",
        address: "2403 Edgewood Avenue, Fresno, CA 93721",
        date: "07/09/2020",
        order: "20452221703743",
      },
      {
        name: "Darren Daniels",
        address: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        date: "07/07/2020",
        order: "22906126785176",
      },
      {
        name: "Ted McDonald",
        address: "796 Bryan Avenue, Minneapolis, MN 55406",
        date: "07/07/2020",
        order: "87574505851064",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Order #",
        accessor: "order",
        sortType: "basic",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    getRowProps,
    prepareRow,
    page,
    pageOptions,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 3 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="card p-8">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <p className="m-0">
            Show <em>by</em>
          </p>
          <Gap width={10} />
          <select
            className="custom-select rounded p-1"
            style={{ width: "50px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div>
      <Gap height={25} />
      <div className="table-responsive">
        <table {...getTableProps()} className="table table-hover table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="d-flex">
                      <h5 className="me-4">{column.render("Header")}</h5>
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "↓"
                            : "↑"
                          : ""}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <p className="my-1">{cell.render("Cell")}</p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Gap height={12} />
      <div>
        <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
        <Gap height={12} />
        <div className="d-flex">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous Page
          </button>
          <Gap width={12} />
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableCustom;
