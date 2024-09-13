import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Content } from '../../../../_metronic/layout/components/content';
import { useNavigate } from 'react-router-dom';
import { dummyImage } from '../../../helper/helper';
import { PageLink, PageTitle } from '../../../../_metronic/layout/core';
import useInfo from '../../../modules/hooks/master-data/info';
import useSeni from '../../../modules/hooks/master-data/seni';
import usePentas from '../../../modules/hooks/master-data/pentas';
import useSeniman from '../../../modules/hooks/master-data/seniman';
import useTempat from '../../../modules/hooks/master-data/tempat';
import ListViewItem from './components/ListViewItem';
import ContentSekilasInfo from './components/ContentSekilasInfo';
import { Card } from 'react-bootstrap';

type PropsTempat = {
  data: any[];
};
const ContentTempat: FC<PropsTempat> = ({ data }) => {
  return (
    <Card>
      <Card.Header className='d-flex align-items-center'>
        <h3 className='m-0'>Tempat</h3>
      </Card.Header>
      <Card.Body>
        <div className='row row-cols-lg-4'>
          {data.map((item: any, index: number) => (
            <div className='col' key={index.toString()}>
              <img
                src={dummyImage}
                className='rounded mb-3'
                style={{ width: '100%', objectFit: 'cover' }}
              />
              <div className='fs-2 text-gray-900 fw-bold'>{item.name}</div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

const DashboardPage: FC = () => {
  const navigate = useNavigate();
  const { info, loading: loadingInfo } = useInfo();
  const { seni, loading: loadingSeni } = useSeni();
  const { pementasan, loading: loadingPementasan } = usePentas();
  const { seniman, loading: loadingSeniman } = useSeniman();
  const { tempat, loading: loadingTempat } = useTempat();

  const newInfo: any[] = [];
  info.map((sn) => {
    if (sn.status === 'PUBLISHED') {
      newInfo.push({
        publishedAt: sn.publishedAt,
        id: sn.id,
        file: sn.file,
        title: sn.title,
        desc: sn.content,
      });
    }
  });
  const newSeni: any[] = [];
  seni.map((sn) => {
    newSeni.push({
      createdAt: sn.createdAt,
      id: sn.id,
      file: sn.file,
      title: sn.title,
      desc: sn.desc,
    });
  });
  const newPementasan: any[] = [];
  pementasan.map((pn) => {
    if (pn.status === 'PUBLISHED') {
      newPementasan.push({
        createdAt: pn.createdAt,
        id: pn.id,
        file: pn.file,
        title: pn.title,
        desc: pn.sinopsis,
      });
    }
  });
  const newSeniman: any[] = [];
  seniman.map((pn) => {
    newSeniman.push({
      createdAt: pn.createdAt,
      id: pn.id,
      file: pn.file,
      title: pn.name,
      desc: pn.performanceDesc,
    });
  });

  const newTempat: any[] = [];
  seniman.map((pn) => {
    newSeniman.push({
      createdAt: pn.createdAt,
      id: pn.id,
      // file: pn.file,
      title: pn.name,
    });
  });

  // console.log('seni', seni);
  // console.log('pementasan', pementasan);
  // console.log('info', info);
  // console.log('seniman', seniman);

  return (
    <Content>
      <div className='card mb-9'>
        <ContentSekilasInfo data={newInfo} loading={loadingInfo} />
        <ListViewItem
          title='Koleksi Seni UP PKJ TIM'
          data={newSeni}
          loading={loadingSeni}
          onClickLink={() =>
            navigate('/dashboard/informasi/seni', {
              state: {
                data: newSeni,
              },
            })
          }
        />
        <ListViewItem
          title='Daftar Pementasan'
          onClickLink={() =>
            navigate('/dashboard/informasi/pementasan', {
              state: {
                data: newPementasan,
              },
            })
          }
          data={newPementasan}
          loading={loadingPementasan}
        />
        <ListViewItem
          title='Daftar Seniman'
          onClickLink={() =>
            navigate('/dashboard/informasi/seniman', {
              state: {
                data: newSeniman,
              },
            })
          }
          data={newSeniman}
          loading={loadingSeniman}
        />
      </div>
      <ContentTempat data={tempat} />
    </Content>
  );
};

export const Informasi: FC = () => {
  const intl = useIntl();

  const Breadcrumbs: Array<PageLink> = [
    {
      title: 'Dashboard',
      path: '/dashboard/informasi',
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

  return (
    <>
      <PageTitle
        icon='information'
        breadcrumbs={Breadcrumbs}
        description='Daftar pesanan saya'
      >
        Informasi
      </PageTitle>
      <DashboardPage />
    </>
  );
};
