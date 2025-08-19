import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  FileOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Empty,
  List,
  Modal,
  notification,
  Select,
  Space,
  Timeline,
  Typography,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import {
  ActNumberPreview,
  ActTitlePreview,
  ActYearPreview,
  AmendmentPreview,
  BulletPointsPreview,
  ChapterPreview,
  ClausePreview,
  DateofEnactmentPreview,
  EnactingClausePreview,
  ExceptionPreview,
  ExceptionsPreview,
  ExplanationPreview,
  ExplanationsPreview,
  GazetteCategoryPreview,
  GazettePartPreview,
  GazetteSectionPreview,
  HeaderPreview,
  IllustrationPreview,
  IllustrationsPreview,
  OmittedPreview,
  ParagraphPreview,
  PartPreview,
  PreamblePreview,
  ProvisoPreview,
  SectionPreview,
  StatePreview,
  SubClausePreview,
  SubHeaderPreview,
  SubSectionPreview,
} from './preview';
import {
  camelize,
  DateTimeToolTip,
  drawerWidth,
  G_DATE_READABLE_FORMAT,
  momentToUnix,
  unixToReadableFormat,
  useIsMobile,
} from './utils';
import InfiniteScrollWrapper from './wrapper';

const { Title, Text } = Typography;
const { Option } = Select;

const GazettePreview = (props) => {
  const {
    initialState,
    onMenuScroll,
    lawMeta,
    menuItems,
    totalMenuItems,
    contentList,
    totalContentItems,
    versionList,
    siderWidth,
    isVersionLoading,
    setSelectedMenuIds,
    selectedMenuIds,
    selectedVersion,
    onContentScroll,
    getSelectedMenuIds,
    setSelectedVersion,
  } = props;
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {(isMobile || (!isMobile && collapsed)) && (
        <div
          onClick={() => setCollapsed(false)}
          style={{
            position: 'absolute',
            top: '40%',
            left: isMobile ? 0 : '200px',
            background: '#f5f5f5',
            border: '1px solid #ccc',
            borderLeft: 'none',
            padding: '6px 12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
            zIndex: 10,
          }}
        >
          Contents &gt;
        </div>
      )}
      {isMobile ? (
        <>
          <Drawer
            title={false}
            onClose={() => setCollapsed(true)}
            open={!collapsed}
            closable={false}
            styles={{ body: { padding: '0px' } }}
            width={drawerWidth}
          >
            <SideMenu
              initialState={initialState}
              lawMeta={lawMeta}
              getMenuItems={onMenuScroll}
              getSelectedMenuIds={getSelectedMenuIds}
              setCollapsed={setCollapsed}
              width={siderWidth}
              setSelectedMenuIds={setSelectedMenuIds}
              selectedMenuIds={selectedMenuIds}
              totalMenuItems={totalMenuItems}
              menuItems={menuItems}
            />
          </Drawer>
        </>
      ) : (
        <>
          {!collapsed && (
            <SideMenu
              initialState={initialState}
              lawMeta={lawMeta}
              getMenuItems={onMenuScroll}
              setSelectedMenuIds={setSelectedMenuIds}
              selectedMenuIds={selectedMenuIds}
              getSelectedMenuIds={getSelectedMenuIds}
              setCollapsed={setCollapsed}
              totalMenuItems={totalMenuItems}
              width={siderWidth}
              menuItems={menuItems}
            />
          )}
        </>
      )}
      <ActContentRender
        initialState={initialState}
        contentList={contentList}
        totalContentItems={totalContentItems}
        getActContentList={onContentScroll}
        lawMeta={lawMeta}
        isVersionLoading={isVersionLoading}
        versionList={versionList}
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
      />
    </div>
  );
};

export default GazettePreview;

const ActLevelPreviewComponentMap = {
  gazetteCategory: GazetteCategoryPreview,
  gazettePart: GazettePartPreview,
  gazetteSection: GazetteSectionPreview,
  header: HeaderPreview,
  subHeader: SubHeaderPreview,
  actTitle: ActTitlePreview,
  actNumber: ActNumberPreview,
  actYear: ActYearPreview,
  dateOfEnactment: DateofEnactmentPreview,
  preamble: PreamblePreview,
  enactingClause: EnactingClausePreview,
  bulletPoints: BulletPointsPreview,
  part: PartPreview,
  omitted: OmittedPreview,
  amendment: AmendmentPreview,
  state: StatePreview,
  chapter: ChapterPreview,
  proviso: ProvisoPreview,
  section: SectionPreview,
  subSection: SubSectionPreview,
  clause: ClausePreview,
  explanation: ExplanationPreview,
  illustration: IllustrationPreview,
  explanations: ExplanationsPreview,
  illustrations: IllustrationsPreview,
  paragraph: ParagraphPreview,
  exceptions: ExceptionsPreview,
  subClause: SubClausePreview,
  exception: ExceptionPreview,
};

export const ContentPreview = ({ contentList = [] }) => {
  return (
    <div className="act-preview">
      {contentList.map((content, index) => {
        const Component = ActLevelPreviewComponentMap[camelize(content?.level)];

        if (!Component) {
          console.error(`No component found for level: ${content.level}`);
          return null;
        }

        return <Component key={`${content.level}-${index}`} content={content} />;
      })}
    </div>
  );
};

const SideMenu = (props) => {
  const {
    initialState,
    lawMeta,
    getMenuItems,
    setCollapsed,
    getSelectedMenuIds,
    menuItems,
    selectedMenuIds,
    setSelectedMenuIds,
    totalMenuItems,
    width
  } = props;
  const { currentUser, vendor, vid } = initialState;
  const navigate = useNavigate();

  const onResetSelectedMenuIds = () => {
    navigate(`${window.location.pathname}?secIds=`);
    setSelectedMenuIds([]);
    getSelectedMenuIds([]);
  };
  const onGetSelectedMenuIds = () => {
    navigate(`${window.location.pathname}?secIds=${selectedMenuIds?.join(',')}`);
    getSelectedMenuIds([]);
  };

  return (
    <>
      <div
        style={{
          width,
          background: '#fff',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.2s',
        }}
      >
        <div style={{ position: 'sticky', top: '0px' }}>
          <div
            style={{
              padding: '5px',
              paddingInline: '10px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Text strong style={{ fontWeight: 'bolder', fontSize: 'larger' }}>
                {lawMeta?.law?.title}
              </Text>
            </Space>
            <CloseOutlined
              style={{
                fontSize: '10px',
                fontWeight: 'bolder',
                right: '10px',
              }}
              onClick={() => {
                setCollapsed(true);
              }}
            />
          </div>
          <div style={{ padding: '5px', paddingInline: '10px' }}>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Text strong style={{ fontWeight: 'bolder', color: vendor?.primaryColor }}>
                Status :
              </Text>
              <Text>
                {lawMeta?.lawVersion?.isLatestVersion ? (
                  <>
                    Current version as at{' '}
                    {unixToReadableFormat(
                      momentToUnix(lawMeta?.lawVersion?.amendmentDate),
                      false,
                      G_DATE_READABLE_FORMAT,
                    )}{' '}
                  </>
                ) : (
                  <>
                    Not current version (effective from{' '}
                    {unixToReadableFormat(
                      momentToUnix(lawMeta?.lawVersion?.amendmentDate),
                      false,
                      G_DATE_READABLE_FORMAT,
                    )}{' '}
                    to{' '}
                    {unixToReadableFormat(
                      momentToUnix(lawMeta?.lawVersion?.lastEffectiveDate),
                      false,
                      G_DATE_READABLE_FORMAT,
                    )}
                    ){' '}
                  </>
                )}
              </Text>
            </Space>
          </div>
          <Divider
            style={{
              height: '3px',
              color: vendor?.primaryColor,
              margin: '5px',
              marginInline: '0px',
              backgroundColor: vendor?.primaryColor,
            }}
          />
          <div style={{ padding: '5px', paddingInline: '10px' }}>
            <Text style={{ fontWeight: 'bolder' }}>Table of Contents</Text>
          </div>
        </div>
        <InfiniteScrollWrapper
          visibleLength={menuItems?.length}
          items={menuItems}
          totalLength={totalMenuItems}
          functionNext={getMenuItems}
          height="75vh"
        >
          <List
            dataSource={menuItems}
            renderItem={(menu) => (
              <MenuItemRender
                menu={menu}
                setSelectedMenuIds={setSelectedMenuIds}
                selectedMenuIds={selectedMenuIds}
              />
            )}
          />
        </InfiniteScrollWrapper>
        <div
          style={{
            backgroundColor: '#eee',
            padding: '10px',
            display: 'flex',
            columnGap: '10px',
            position: 'sticky',
            bottom: '0px',
          }}
        >
          <Button
            onClick={() => {
              onResetSelectedMenuIds();
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onGetSelectedMenuIds();
            }}
          >
            Get Provisions
          </Button>
        </div>
      </div>
    </>
  );
};

const MenuItemRender = (props) => {
  const { menu, setSelectedMenuIds, selectedMenuIds } = props;
  return (
    <div
      onClick={() => {
        if (selectedMenuIds?.includes(menu?._id)) {
          setSelectedMenuIds((prevSelectedIds) =>
            prevSelectedIds?.filter((selectedId) => selectedId != menu?._id),
          );
        } else {
          setSelectedMenuIds((prevSelectedIds) => [...prevSelectedIds, menu?._id]);
        }
      }}
      key={menu._id}
      style={{
        marginBottom: 8,
        paddingLeft: `${menu.level === 'section' ? 24 : 0}px`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: 4,
      }}
    >
      {menu.level === 'section' && (
        <Checkbox
          onChange={(e) => {
            e.stopPropagation();
          }}
          checked={selectedMenuIds?.includes(menu?._id)}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        ellipsis
        style={{
          fontWeight: menu.level === 'chapter' ? 'bold' : 'normal',
          color: menu.level === 'chapter' ? '#333' : '#666',
        }}
      >
        {menu.level === 'chapter'
          ? `${menu.chapter}. ${menu.title || 'Chapter' + ' ' + menu.chapter}`
          : menu.level === 'actDetails'
          ? `${menu.title}`
          : `${menu.sec}. ${menu.title}`}
      </Text>
    </div>
  );
};

export const TimelineComponent = (props) => {
  const { versionList, vendor, selectedVersion, setSelectedVersion } = props;
  const isSingle = versionList.length === 1;

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      {!isSingle && (
        <div
          style={{
            position: 'absolute',
            top: 67,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: vendor?.primaryColor || '#ccc',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: isSingle ? 'center' : 'space-between',
          gap: 16,
          position: 'relative',
          zIndex: 1,
          overflowX: 'auto',
        }}
      >
        {versionList.map((item, index) => {
          const isSelected = item?._id == selectedVersion?._id;
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedVersion(item);
              }}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: 8,
                backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
                borderRadius: 6,
                boxShadow: isSelected ? '0 0 6px rgba(0,0,0,0.1)' : 'none',
                minWidth: isSingle ? 'auto' : '120px',
                flexShrink: 0,
              }}
            >
              <div style={{ fontWeight: 600, color: '#0D4C92', marginBottom: 8 }}>
                <DateTimeToolTip
                  input={item.amendmentDate}
                  outputFormat={G_DATE_READABLE_FORMAT}
                  isVisibleDate
                  isAgo={false}
                  isTag={false}
                />{' '}
              </div>

              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '4px solid #8B0000',
                  backgroundColor: '#fff',
                  margin: '0 auto',
                  zIndex: 2,
                  position: 'relative',
                }}
              />

              <div style={{ fontSize: 12, marginTop: 8 }}>
                Amended by <br />
                <span style={{ color: '#0D4C92' }}>
                  Act {item.actNo} of {item.actYear}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span style={{ fontWeight: 500 }}>Version:</span>{' '}
          <Select style={{ width: 200 }} placeholder="Select version" allowClear>
            {versionList.map((item) => (
              <Option key={item.version} value={item.version}>
                <DateTimeToolTip
                  input={item.amendmentDate}
                  outputFormat={G_DATE_READABLE_FORMAT}
                  isVisibleDate
                  isAgo={false}
                  isTag={false}
                />
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <span style={{ fontWeight: 500 }}>or find current version as at</span>{' '}
          <Space>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD MMM YYYY"
              style={{ width: 160 }}
              allowClear
            />
            <Button type="primary">Go</Button>
          </Space>
        </div>
      </div> */}
    </div>
  );
};

export const ActContentRender = (props) => {
  const {
    initialState,
    contentList,
    totalContentItems,
    getActContentList,
    lawMeta,
    isVersionLoading,
    versionList,
    selectedVersion,
    setSelectedVersion,
  } = props;

  const { vendor, vid } = initialState;
  const [showTimeline, setShowTimeline] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const handleTimelineToggle = () => {
    if (isMobile) {
      setMobileDrawerOpen(true);
    } else {
      setShowTimeline((prev) => !prev);
    }
  };

  return (
    <div
      style={{
        width: isMobile ? '100%' : drawerWidth + 200,
        borderRight: '1px solid #ccc',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
          paddingInline: '20px',
        }}
      >
        <Button type="link" onClick={handleTimelineToggle}>
          Timeline {showTimeline ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </Button>

        <Space size={'middle'}>
          <FileOutlined
            twoToneColor={vendor?.primaryColor}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setPrintModalOpen(true);
            }}
          />
          <QuestionCircleFilled twoToneColor={vendor?.primaryColor} />
        </Space>
      </div>

      {!isMobile && showTimeline && (
        <TimelineComponent
          versionList={versionList}
          isVersionLoading={isVersionLoading}
          vendor={vendor}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />
      )}

      <Drawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        title="Timeline"
        placement="right"
        width="100vw"
        bodyStyle={{ padding: 0 }}
        closable
      >
        <div style={{ padding: '16px', height: '100%', overflowY: 'auto' }}>
          <MobileTimelineComponent
            versionList={versionList}
            vendor={vendor}
            selectedVersion={selectedVersion}
            setSelectedVersion={setSelectedVersion}
          />
        </div>
      </Drawer>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          paddingRight: 8,
          border: '1px solid #ccc',
        }}
      >
        <InfiniteScrollWrapper
          visibleLength={contentList?.length}
          totalLength={totalContentItems}
          items={contentList}
          functionNext={getActContentList}
          height="88vh"
        >
          <ContentPreview contentList={contentList} />
        </InfiniteScrollWrapper>
      </div>
      <Modal
        open={printModalOpen}
        onCancel={() => {
          setPrintModalOpen(false);
        }}
        footer={false}
        width={drawerWidth}
        centered
      >
        <LawPrintModal lawMeta={lawMeta} initialState={initialState} />
      </Modal>
    </div>
  );
};

const LawPrintModal = (props) => {
  const { lawMeta, initialState } = props;
  const { currentUser, vendor, vid } = initialState;
  const [loading, setLoading] = useState(true);
  const [selectedChapterIds, setSelectedChapterIds] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lawContents, setLawContents] = useState([]);
  const printRef = useRef();

  const onSelectAll = () => {
    setSelectedChapterIds(
      chapters?.map((chapter) => {
        return chapter?._id;
      }),
    );
  };

  const onClearAll = () => {
    setSelectedChapterIds([]);
  };

  const onPrint = async () => {
    if (selectedChapterIds?.length <= 0) {
      notification?.warning({
        message: 'Please select any of the Chapters to print',
      });
      return;
    }
    let tempSelectedChapterIds = selectedChapterIds?.join(',');
  };

  useEffect(() => {}, [lawMeta]);

  useEffect(() => {
    setLawContents([]);
  }, [selectedChapterIds]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
        <Text strong style={{ fontWeight: 'bolder', fontSize: 'larger' }}>
          {lawMeta?.law?.title}
        </Text>
        <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Text strong style={{ fontWeight: 'bolder', color: vendor?.primaryColor }}>
            Status :
          </Text>
          <Text>
            {lawMeta?.lawVersion?.isLatestVersion ? (
              <>
                Current version as at{' '}
                {unixToReadableFormat(
                  momentToUnix(lawMeta?.lawVersion?.amendmentDate),
                  false,
                  G_DATE_READABLE_FORMAT,
                )}{' '}
              </>
            ) : (
              <>
                Not current version (effective from{' '}
                {unixToReadableFormat(
                  momentToUnix(lawMeta?.lawVersion?.amendmentDate),
                  false,
                  G_DATE_READABLE_FORMAT,
                )}{' '}
                to{' '}
                {unixToReadableFormat(
                  momentToUnix(lawMeta?.lawVersion?.lastEffectiveDate),
                  false,
                  G_DATE_READABLE_FORMAT,
                )}
                ){' '}
              </>
            )}
          </Text>
        </Space>
        <Divider
          style={{
            height: '3px',
            color: vendor?.primaryColor,
            margin: '5px',
            marginInline: '0px',
            backgroundColor: vendor?.primaryColor,
          }}
        />
      </div>
      <Text>
        Select the provisions you wish to print using the checkboxes and then click the relevant
        "Print"{' '}
      </Text>
      <div
        style={{
          padding: '5px',
          paddingInline: '0px',
          display: 'flex',
          columnGap: '10px',
        }}
      >
        <Button disabled={loading || chapters?.length == 0} onClick={onSelectAll}>
          Select All
        </Button>
        <Button disabled={loading || chapters?.length == 0} onClick={onClearAll}>
          Clear All
        </Button>
        <Button
          disabled={loading || chapters?.length == 0}
          type="primary"
          onClick={() => {
            onPrint();
          }}
        >
          Print
        </Button>
      </div>
      <div
        style={{
          height: '40vh',
          width: '100%',
          overflow: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        {loading ? (
          <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
            <LoadingOutlined spin style={{ fontSize: 'xx-large' }} />
          </div>
        ) : (
          <div style={{ height: '100%' }}>
            {chapters?.length == 0 ? (
              <div
                style={{
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Empty description={'No Chapters Where Found in the Law'} />
              </div>
            ) : (
              <>
                <ChapterItemsRenderComponent
                  chapters={chapters}
                  selectedChapterIds={selectedChapterIds}
                  setSelectedChapterIds={setSelectedChapterIds}
                />
              </>
            )}
          </div>
        )}
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <ContentPreview contentList={lawContents} />
          </div>
        </div>
        <ReactToPrint
          trigger={() => (
            <button id="trigger-print" style={{ display: 'none' }}>
              Hidden Print Trigger
            </button>
          )}
          content={() => printRef.current}
        />
      </div>
    </>
  );
};

export const ChapterItemsRenderComponent = (props) => {
  const { chapters, selectedChapterIds, setSelectedChapterIds } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        padding: '5px',
      }}
    >
      {chapters?.map((chapter) => {
        return (
          <Checkbox
            value={chapter?._id}
            checked={selectedChapterIds?.includes(chapter?._id)}
            onClick={(e) => {
              e.stopPropagation(); // optional, prevents bubbling if needed
              const id = chapter?._id;
              if (selectedChapterIds?.includes(id)) {
                setSelectedChapterIds((prev) => prev.filter((cid) => cid !== id));
              } else {
                setSelectedChapterIds((prev) => [...(prev || []), id]);
              }
            }}
          >
            {chapter?.title || `Chapter ${chapter?.chapter}`}
          </Checkbox>
        );
      })}
    </div>
  );
};

export const MobileTimelineComponent = (props) => {
  const { versionList, vendor, selectedVersion, setSelectedVersion } = props;

  return (
    <div style={{ padding: 16 }}>
      <Timeline
        mode="left"
        style={{ marginLeft: 12 }}
        items={versionList.map((item) => ({
          dot: (
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '3px solid #8B0000',
              }}
            />
          ),
          label: (
            <span
              style={{ fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => {
                setSelectedVersion(item);
              }}
            >
              <FilePdfOutlined style={{ color: '#8B0000', marginRight: 4 }} />
              <DateTimeToolTip
                input={item.amendmentDate}
                outputFormat={G_DATE_READABLE_FORMAT}
                isVisibleDate
                isAgo={false}
                isTag={false}
              />
            </span>
          ),
          children: (
            <div
              onClick={() => {}}
              style={{
                fontSize: 12,
                cursor: 'pointer',
                backgroundColor: selectedVersion === item.version ? '#f0f0f0' : 'transparent',
                padding: 8,
                borderRadius: 4,
              }}
            >
              {item?.actNo && item?.actYear ? (
                <>
                  Amended by <br />
                  <span style={{ color: '#0D4C92', fontWeight: 'bold' }}>
                    Act {item.actNo} of {item.actYear}
                  </span>
                </>
              ) : (
                <span style={{ fontStyle: 'italic', color: '#999' }}>2020 RevEd</span>
              )}
            </div>
          ),
        }))}
      />
    </div>
  );
};
