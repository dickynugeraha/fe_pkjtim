import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useTable, useSortBy, usePagination } from 'react-table';
import Gap from '../content/Gap';
import { KTIcon } from '../../../helpers';
import { UsersListLoading } from '../../../../app/modules/apps/user-management/users-list/components/loading/UsersListLoading';

const Table = ({
  data,
  columns,
  addData,
  showAddButton = true,
  searchData,
  loading,
}) => {
  const availableLimit = [5, 10, 15, 20, 25];
  const [limit, setLimit] = useState(5);

  columns.unshift({
    Header: '#',
    accessor: 'rowIndex',
    sortType: 'alphanumeric',
    Cell: (props) => {
      let number = 1;
      return <span>{props.row.index + 1}</span>;
    },
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    getRowProps,
    prepareRow,
    page,
    pageOptions,
    previousPage,
    gotoPage,
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

  console.log('LENGTH', data.length);

  let content;
  if (loading) {
    content = <UsersListLoading />;
  } else if (data.length === 0) {
    content = (
      <tr>
        <td colSpan={headerGroups[0].headers.length}>
          <div className='d-flex text-center w-100 align-content-center justify-content-center'>
            Tidak ada hasil yang ditemukan!
          </div>
        </td>
      </tr>
    );
  } else {
    content = page.map((row) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            return (
              <td {...cell.getCellProps()}>
                <div className='my-0'>{cell.render('Cell')}</div>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  return (
    <Card className='p-5'>
      <div className='d-flex align-items-end justify-content-between'>
        <div className='d-flex align-items-end'>
          <div className='d-flex align-items-center mb-4'>
            <h5 className='m-0 fs-6'>Tampilkan</h5>
            <Gap width={3} />
            <select
              value={limit}
              className='custom-select rounded p-1'
              onChange={(e) => setLimit(e.target.value)}
            >
              {availableLimit.map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='d-flex flex-column align-items-end justify-content-end'>
          {showAddButton && (
            <button
              onClick={addData}
              className='btn btn-sm btn-primary d-flex align-items-center w-50 justify-content-center'
            >
              <KTIcon iconName='plus' className='fs-lg-2' />
              <p className='m-0'>Tambah</p>
            </button>
          )}
          <Gap height={5} />
          <div className='d-flex align-items-center position-relative my-1'>
            <KTIcon
              iconName='magnifier'
              className='fs-1 position-absolute ms-6'
            />
            <Gap width={10} />
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-lg-200px ps-14'
              placeholder='Cari'
              onChange={(e) => searchData(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Gap height={7} />
      <div className='table-responsive'>
        <table
          {...getTableProps()}
          className='table align-middle border table-striped table-rounded table-striped fs-6 dataTable gs-7 gy-2'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='border-bottom-2'
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className='d-flex align-items-center my-2'>
                      <h4 className='m-0 me-4 fs-6'>
                        {column.render('Header')}
                      </h4>
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
          <tbody {...getTableBodyProps()} className='text-gray-600'>
            {content}
          </tbody>
        </table>
      </div>
      <Gap height={12} />
      {data.length !== 0 && (
        <div className='ms-auto'>
          <div className='d-flex flex-wrap align-items-center'>
            <button
              className='btn btn-sm btn-outline-primary p-3 mx-2 my-2 text-hover-white text-primary'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Sebelumnya
            </button>
            <Gap width={8} />
            <div className='d-flex my-2'>
              {pageOptions.length > 4 ? (
                <>
                  {/* Render first page */}
                  <button
                    key={0}
                    onClick={() => gotoPage(0)}
                    className={
                      pageIndex === 0
                        ? 'btn btn-sm btn-primary px-5 py-1 text-hover-white'
                        : 'btn btn-sm btn-outline-primary text-hover-white text-primary'
                    }
                  >
                    {1}
                  </button>
                  <Gap width={3} />
                  {/* Add ellipsis if necessary */}
                  {pageIndex > 1 && (
                    <div className='px-5 py-1 text-primary'>...</div>
                  )}

                  {/* Render current page */}
                  {pageIndex > 0 && pageIndex < pageOptions.length - 1 && (
                    <>
                      <button
                        key={pageIndex}
                        onClick={() => gotoPage(pageIndex)}
                        className='btn btn-sm btn-primary px-5 py-1 text-hover-white'
                      >
                        {pageIndex + 1}
                      </button>
                      <Gap width={3} />
                    </>
                  )}

                  {/* Add ellipsis if necessary */}
                  {pageIndex < pageOptions.length - 2 && (
                    <div className='px-5 py-1 text-primary'>...</div>
                  )}

                  {/* Render last page */}
                  <button
                    key={pageOptions.length - 1}
                    onClick={() => gotoPage(pageOptions.length - 1)}
                    className={
                      pageIndex === pageOptions.length - 1
                        ? 'btn btn-sm btn-primary px-5 py-1 text-hover-white'
                        : 'btn btn-sm btn-outline-primary text-hover-white text-primary'
                    }
                  >
                    {pageOptions.length}
                  </button>
                </>
              ) : (
                pageOptions.map((pageOption, index) => (
                  <>
                    <button
                      key={index}
                      onClick={() => gotoPage(pageOption)}
                      className={
                        pageOption === pageIndex
                          ? 'btn btn-sm btn-primary px-5 py-1 text-hover-white'
                          : 'btn btn-sm btn-outline-primary text-hover-white text-primary'
                      }
                    >
                      {pageOption + 1}
                    </button>
                    <Gap width={3} />
                  </>
                ))
              )}
            </div>
            <Gap width={8} />
            <button
              className='btn btn-sm btn-outline-primary p-3 mx-2 text-hover-white text-primary my-2'
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Table;
