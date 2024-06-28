import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Gap from '../content/Gap';
import { KTIcon } from '../../../helpers';

const Table = () => {
  const availableLimit = [5, 10, 15, 20, 25];
  const [limit, setLimit] = useState(5);

  const data = useMemo(
    () => [
      {
        tipe_tempat: 'Kim Parrish',
        tanggal_pesan: '4420 Valley Street, Garnerville, NY 10923',
        tanggal_sewa: '07/11/2020',
        total_pembayaran: 'Rp. 1.000.000',
        status: 'Success',
      },
      {
        tipe_tempat: 'Michele Castillo',
        tanggal_pesan: '637 Kyle Street, Fullerton, NE 68638',
        tanggal_sewa: '07/11/2020',
        total_pembayaran: 'Rp. 1.000.000',
        status: 'Success',
      },
      {
        tipe_tempat: 'Eric Ferris',
        tanggal_pesan: '906 Hart Country Lane, Toccoa, GA 30577',
        tanggal_sewa: '07/10/2020',
        total_pembayaran: 'Rp. 1.000.000',
        status: 'Success',
      },
      {
        tipe_tempat: 'Gloria Noble',
        tanggal_pesan: '2403 Edgewood Avenue, Fresno, CA 93721',
        tanggal_sewa: '07/09/2020',
        total_pembayaran: 'Rp. 1.000.000',
        status: 'Success',
      },
      {
        tipe_tempat: 'Darren Daniels',
        tanggal_pesan: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
        tanggal_sewa: '07/07/2020',
        total_pembayaran: 'Rp. 1.000.000',
        status: 'Success',
      },
      {
        tipe_tempat: 'Ted McDonald',
        tanggal_pesan: '796 Bryan Avenue, Minneapolis, MN 55406',
        tanggal_sewa: '07/07/2020',
        status: 'Success',
        total_pembayaran: 'Rp. 1.000.000',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Tipe Tempat',
        accessor: 'tipe_tempat',
        sortType: 'alphanumeric',
      },
      {
        Header: 'Tanggal Pesan',
        accessor: 'tanggal_pesan',
        sortType: 'alphanumeric',
      },
      {
        Header: 'Tanggal Sewa',
        accessor: 'tanggal_sewa',
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortType: 'alphanumeric',
      },
      {
        Header: 'Total Pembayaran',
        accessor: 'total_pembayaran',
        sortType: 'alphanumeric',
      },
      // {
      //   Header: "Action",
      //   accessor: "order",
      //   sortType: "alphanumeric",
      // },
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
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    rows,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: limit },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(limit);
  }, [limit, setPageSize]);

  return (
    <div className='card p-8'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center position-relative my-1'>
            <KTIcon
              iconName='magnifier'
              className='fs-1 position-absolute ms-6'
            />
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-250px ps-14'
              placeholder='Search'
            />
          </div>
          <Gap width={18} />
          <div className='d-flex align-items-center'>
            <p className='m-0  text-muted fw-bolder fs-7 text-uppercase'>
              Show by
            </p>
            <Gap width={10} />
            <select
              value={limit}
              className='custom-select rounded p-1'
              style={{ width: '50px' }}
              onChange={(e) => setLimit(e.target.value)}
            >
              {availableLimit.map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button className='btn btn-sm btn-primary d-flex align-items-center'>
            <KTIcon iconName='plus' className='fs-2' />
            Tambah pesanan
          </button>
        </div>
      </div>
      <Gap height={25} />
      <div className='table-responsive'>
        <table
          {...getTableProps()}
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className=''>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className='d-flex align-items-center'>
                      <h5 className='m-0 me-4 text-muted fw-bolder fs-7 text-uppercase gs-'>
                        {column.render('Header')}
                      </h5>
                      <span className='fs-7'>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '↓'
                            : '↑'
                          : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='text-gray-600 fw-bold'>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <p className='my-1'>{cell.render('Cell')}</p>
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
      <div className='ms-auto'>
        {/* <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div> */}
        <Gap height={12} />
        <div className='d-flex'>
          <button
            className='btn btn-secondary btn-sm'
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous Page
          </button>
          <Gap width={12} />
          <button
            className='btn btn-secondary btn-sm'
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

export default Table;
