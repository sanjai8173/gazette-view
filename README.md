# How to Use this Gazette View

yarn add gazette-view

# index.tsx with pathParams :actCode

```jsx
import { getQueryParams } from '@/common';
import { useModel } from '@umijs/max';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getActContentListService,
  getActsMenuItemsService,
  getLawMetaService,
  getVersionListService,
} from '../gazetteView/service';
import GazettePreview from 'gazette-view';

const GazettePreview = () => {
  const { initialState } = useModel('@@initialState');
  const { vid } = initialState;
  const { actCode } = useParams();
  const [lawMeta, setLawMeta] = useState({});
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [totalContentItems, setTotalContentItems] = useState(0);
  const [versionList, setVersionList] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);

  const getLawMeta = async () => {
    try {
      setMenuLoading(true);
      const { status, cls, msg, payload } = await getLawMetaService(actCode, {
        vid,
      });
      if (status) {
        setLawMeta(payload?.lawMeta);
      }
      setMenuLoading(false);
    } catch (e) {
      setMenuLoading(false);
      notification?.warning({ message: 'Something went wrong!' });
    }
  };

  const getMenuItems = async (tempMenuItemsList) => {
    try {
      setMenuLoading(true);
      const { status, cls, msg, payload } = await getActsMenuItemsService(actCode, {
        vid,
        visibleCount: tempMenuItemsList?.length,
      });
      if (status) {
        setMenuItems((prevMenuItems) => {
          return [...(tempMenuItemsList || prevMenuItems), ...payload?.menuItems];
        });
        setTotalMenuItems(payload?.totalMenuItems);
      }
      setMenuLoading(false);
    } catch (error) {
      notification?.warning({ message: 'Something went wrong!' });
      setMenuLoading(false);
    }
  };

  const getVersions = async () => {
    const { status, payload } = await getVersionListService(actCode, { vid });
    if (status && payload) {
      setVersionList(payload.versionMeta || []);
      if (!selectedVersion) {
        setSelectedVersion(payload.versionMeta?.[payload?.versionMeta?.length - 1]);
      }
    }
  };

  const getActContentList = async (isReset = false) => {
    const visibleCount = isReset == true ? 0 : contentList?.length;
    let sectionIds = selectedMenuIds?.length > 0 ? selectedMenuIds.join(',') : null;

    try {
      const { status, cls, msg, payload } = await getActContentListService(actCode, {
        vid,
        visibleCount,
        sectionIds,
        versionId: selectedVersion?._id,
      });

      if (status) {
        if (visibleCount == 0) {
          setContentList(payload?.contentList);
        } else {
          setContentList((prevContentList) => {
            return [...prevContentList, ...payload?.contentList];
          });
        }
        setTotalContentItems(payload?.totalContentItems);
      }
    } catch (e) {
      notification?.error({ message: 'Something went wrong!' });
    }
  };

  useEffect(() => {
    getMenuItems([]);
    getActContentList(true);
  }, [selectedVersion]);

  useEffect(() => {
    getVersions();
    getLawMeta();
    getActContentList(true);
  }, []);

  return (
    <GazettePreview
      initialState={initialState}
      onMenuScroll={getMenuItems}
      lawMeta={lawMeta}
      setSelectedVersion={setSelectedVersion}
      menuItems={menuItems}
      versionList={versionList}
      onContentScroll={getActContentList}
      totalMenuItems={totalMenuItems}
      menuLoading={menuLoading}
      contentList={contentList}
      setSelectedMenuIds={setSelectedMenuIds}
      selectedMenuIds={selectedMenuIds}
      getSelectedMenuIds={() => {
        getActContentList(true);
      }}
      totalContentItems={totalContentItems}
      selectedVersion={selectedVersion}
    />
  );
};

export default GazettePreview; make this MD file Better 

```


