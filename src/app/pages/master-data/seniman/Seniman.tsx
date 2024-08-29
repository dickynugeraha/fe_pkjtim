import React, { useEffect, useMemo, useState } from 'react';
import {
  PageTitle,
  PageLink,
} from '../../../../_metronic/layout/core/PageData';
import { Content } from '../../../../_metronic/layout/components/content';
import Table from '../../../../_metronic/layout/components/table/Table';
import { KTIcon } from '../../../../_metronic/helpers';
import ModalAddEditSeniman from './components/ModalAddEditSeniman';
import useSeniman from '../../../modules/hooks/master-data/seniman';
import Skeleton from 'react-loading-skeleton';

const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Seniman',
    path: '/master-data/seniman',
    isSeparator: false,
    isActive: true,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: true,
  },
];

export const Seniman = () => {
  const {
    addSeniman,
    seniman,
    loading,
    updateSeniman,
    deleteSeniman,
    searchSeniman,
    closeModal,
    formData,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    setQuery,
    formFile,
    setFormFile,
  } = useSeniman();

  const data = useMemo(
    () => seniman,
    [loading, updateSeniman, addSeniman, deleteSeniman, searchSeniman]
  );
  const columns = useMemo(
    () => [
      {
        Header: 'Gambar',
        accessor: 'gambar',
        sortType: 'alphanumeric',
        Cell: (props: any) => {
          const [loading, setLoading] = useState(true);
          let singleData = props.cell.row.original;

          const handleImageLoad = () => {
            setLoading(false);
          };

          let content = <Skeleton height={80} width={150} />;
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          if (!loading) {
            content = (
              <div style={{ width: '150px' }}>
                <img
                  src={singleData.file}
                  className='rounded'
                  style={{ width: '100%' }}
                  onLoad={handleImageLoad}
                />
              </div>
            );
          }

          return content;
        },
      },
      {
        Header: 'Nama Seniman',
        sortType: 'alphanumeric',
        accessor: 'name',
      },
      {
        Header: 'Deskripsi',
        sortType: 'alphanumeric',
        accessor: 'performanceDesc',
      },
      {
        Header: 'Aksi',
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <div className='input-group'>
                <button
                  className='btn btn-sm btn-primary dropdown-toggle'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Aksi
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <button
                      className='dropdown-item d-flex align-items-center'
                      onClick={() => openModal(singleData)}
                    >
                      <KTIcon iconName='pencil' className='me-3 fs-3' />
                      <p className='m-0'>Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className='dropdown-item d-flex align-items-center'
                      onClick={() => {
                        deleteSeniman(singleData.id);
                      }}
                    >
                      <KTIcon iconName='trash' className='me-3 fs-3' />
                      <p className='m-0'>Hapus</p>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle icon='data' breadcrumbs={Breadcrumbs} description='Seniman'>
        Seniman
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          columns={columns}
          data={data}
          addData={() => openModal()}
          searchData={(val: any) => {
            setQuery(val);
          }}
        />
        <ModalAddEditSeniman
          fromAdd={!isEdit}
          data={formData}
          fileValue={formFile}
          onchangeVal={(e: any) => handleChange(e)}
          onChangeFile={(e) => setFormFile(e)}
          show={isModalOpen}
          handleClose={closeModal}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
            if (isEdit) {
              updateSeniman(formWithFile);
            } else {
              addSeniman(formWithFile);
            }
          }}
        />
      </Content>
    </>
  );
};
