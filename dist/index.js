import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, FileOutlined, FilePdfOutlined, LoadingOutlined, QuestionCircleFilled, } from '@ant-design/icons';
import { Button, Checkbox, Divider, Drawer, Empty, List, Modal, Select, Space, Timeline, Typography, } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { ActNumberPreview, ActTitlePreview, ActYearPreview, AmendmentPreview, BulletPointsPreview, ChapterPreview, ClausePreview, DateofEnactmentPreview, EnactingClausePreview, ExceptionPreview, ExceptionsPreview, ExplanationPreview, ExplanationsPreview, GazetteCategoryPreview, GazettePartPreview, GazetteSectionPreview, HeaderPreview, IllustrationPreview, IllustrationsPreview, OmittedPreview, ParagraphPreview, PartPreview, PreamblePreview, ProvisoPreview, SectionPreview, StatePreview, SubClausePreview, SubHeaderPreview, SubSectionPreview, } from './preview';
import { camelize, DateTimeToolTip, drawerWidth, G_DATE_READABLE_FORMAT, momentToUnix, unixToReadableFormat, useIsMobile, } from './utils';
import InfiniteScrollWrapper from './wrapper';
const { Title, Text } = Typography;
const { Option } = Select;
const GazettePreview = (props) => {
    const { primaryColor, onMenuScroll, lawMeta, menuItems, totalMenuItems, contentList, totalContentItems, versionList, backgroundImage, siderWidth, isVersionLoading, setSelectedMenuIds, selectedMenuIds, selectedVersion, onContentScroll, getSelectedMenuIds, setSelectedVersion, chapters, loading, printableLawContent, selectedChapterIds, setSelectedChapterIds, onPrint, } = props;
    const isMobile = useIsMobile();
    const [collapsed, setCollapsed] = useState(false);
    return (_jsxs("div", { style: { display: 'flex', justifyContent: 'center' }, children: [(isMobile || (!isMobile && collapsed)) && (_jsx("div", { onClick: () => setCollapsed(false), style: {
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
                }, children: "Contents >" })), isMobile ? (_jsx(_Fragment, { children: _jsx(Drawer, { title: false, onClose: () => setCollapsed(true), open: !collapsed, closable: false, styles: { body: { padding: '0px' } }, width: drawerWidth, children: _jsx(SideMenu, { primaryColor: primaryColor, lawMeta: lawMeta, getMenuItems: onMenuScroll, getSelectedMenuIds: getSelectedMenuIds, setCollapsed: setCollapsed, width: siderWidth, setSelectedMenuIds: setSelectedMenuIds, selectedMenuIds: selectedMenuIds, totalMenuItems: totalMenuItems, menuItems: menuItems }) }) })) : (_jsx(_Fragment, { children: !collapsed && (_jsx(SideMenu, { primaryColor: primaryColor, lawMeta: lawMeta, getMenuItems: onMenuScroll, setSelectedMenuIds: setSelectedMenuIds, selectedMenuIds: selectedMenuIds, getSelectedMenuIds: getSelectedMenuIds, setCollapsed: setCollapsed, totalMenuItems: totalMenuItems, width: siderWidth, menuItems: menuItems })) })), _jsx(ActContentRender, { primaryColor: primaryColor, contentList: contentList, totalContentItems: totalContentItems, getActContentList: onContentScroll, lawMeta: lawMeta, backgroundImage: backgroundImage, isVersionLoading: isVersionLoading, versionList: versionList, selectedVersion: selectedVersion, setSelectedVersion: setSelectedVersion, chapters: chapters, loading: loading, printableLawContent: printableLawContent, selectedChapterIds: selectedChapterIds, setSelectedChapterIds: setSelectedChapterIds, onPrint: onPrint })] }));
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
export const ContentPreview = ({ contentList = [], backgroundImage }) => {
    return (_jsx("div", { className: "act-preview", style: {
            background: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }, children: contentList.map((content, index) => {
            const Component = ActLevelPreviewComponentMap[camelize(content === null || content === void 0 ? void 0 : content.level)];
            if (!Component) {
                console.error(`No component found for level: ${content.level}`);
                return null;
            }
            return _jsx(Component, { content: content }, `${content.level}-${index}`);
        }) }));
};
const SideMenu = (props) => {
    var _a, _b, _c, _d, _e;
    const { primaryColor, lawMeta, getMenuItems, setCollapsed, getSelectedMenuIds, menuItems, selectedMenuIds, setSelectedMenuIds, totalMenuItems, width, } = props;
    const navigate = useNavigate();
    const onResetSelectedMenuIds = () => {
        navigate(`${window.location.pathname}?secIds=`);
        setSelectedMenuIds([]);
        getSelectedMenuIds([]);
    };
    const onGetSelectedMenuIds = () => {
        navigate(`${window.location.pathname}?secIds=${selectedMenuIds === null || selectedMenuIds === void 0 ? void 0 : selectedMenuIds.join(',')}`);
        getSelectedMenuIds([]);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { style: {
                width,
                background: '#fff',
                borderRight: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'width 0.2s',
            }, children: [_jsxs("div", { style: { position: 'sticky', top: '0px' }, children: [_jsxs("div", { style: {
                                padding: '5px',
                                paddingInline: '10px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }, children: [_jsx(Space, { children: _jsx(Text, { strong: true, style: { fontWeight: 'bolder', fontSize: 'larger' }, children: (_a = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.law) === null || _a === void 0 ? void 0 : _a.title }) }), _jsx(CloseOutlined, { style: {
                                        fontSize: '10px',
                                        fontWeight: 'bolder',
                                        right: '10px',
                                    }, onClick: () => {
                                        setCollapsed(true);
                                    } })] }), _jsx("div", { style: { padding: '5px', paddingInline: '10px' }, children: _jsxs(Space, { style: { display: 'flex', flexWrap: 'wrap' }, children: [_jsx(Text, { strong: true, style: { fontWeight: 'bolder', color: primaryColor }, children: "Status :" }), _jsx(Text, { children: ((_b = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _b === void 0 ? void 0 : _b.isLatestVersion) ? (_jsxs(_Fragment, { children: ["Current version as at", ' ', unixToReadableFormat(momentToUnix((_c = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _c === void 0 ? void 0 : _c.amendmentDate), false, G_DATE_READABLE_FORMAT), ' '] })) : (_jsxs(_Fragment, { children: ["Not current version (effective from", ' ', unixToReadableFormat(momentToUnix((_d = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _d === void 0 ? void 0 : _d.amendmentDate), false, G_DATE_READABLE_FORMAT), ' ', "to", ' ', unixToReadableFormat(momentToUnix((_e = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _e === void 0 ? void 0 : _e.lastEffectiveDate), false, G_DATE_READABLE_FORMAT), ")", ' '] })) })] }) }), _jsx(Divider, { style: {
                                height: '3px',
                                color: primaryColor,
                                margin: '5px',
                                marginInline: '0px',
                                backgroundColor: primaryColor,
                            } }), _jsx("div", { style: { padding: '5px', paddingInline: '10px' }, children: _jsx(Text, { style: { fontWeight: 'bolder' }, children: "Table of Contents" }) })] }), _jsx(InfiniteScrollWrapper, { visibleLength: menuItems === null || menuItems === void 0 ? void 0 : menuItems.length, items: menuItems, totalLength: totalMenuItems, functionNext: getMenuItems, height: "75vh", children: _jsx(List, { dataSource: menuItems, renderItem: (menu) => (_jsx(MenuItemRender, { menu: menu, setSelectedMenuIds: setSelectedMenuIds, selectedMenuIds: selectedMenuIds })) }) }), _jsxs("div", { style: {
                        backgroundColor: '#eee',
                        padding: '10px',
                        display: 'flex',
                        columnGap: '10px',
                        position: 'sticky',
                        bottom: '0px',
                    }, children: [_jsx(Button, { onClick: () => {
                                onResetSelectedMenuIds();
                            }, children: "Reset" }), _jsx(Button, { type: "primary", style: { backgroundColor: primaryColor }, onClick: () => {
                                onGetSelectedMenuIds();
                            }, children: "Get Provisions" })] })] }) }));
};
const MenuItemRender = (props) => {
    const { menu, setSelectedMenuIds, selectedMenuIds } = props;
    return (_jsxs("div", { onClick: () => {
            if (selectedMenuIds === null || selectedMenuIds === void 0 ? void 0 : selectedMenuIds.includes(menu === null || menu === void 0 ? void 0 : menu._id)) {
                setSelectedMenuIds((prevSelectedIds) => prevSelectedIds === null || prevSelectedIds === void 0 ? void 0 : prevSelectedIds.filter((selectedId) => selectedId != (menu === null || menu === void 0 ? void 0 : menu._id)));
            }
            else {
                setSelectedMenuIds((prevSelectedIds) => [...prevSelectedIds, menu === null || menu === void 0 ? void 0 : menu._id]);
            }
        }, style: {
            marginBottom: 8,
            paddingLeft: `${menu.level === 'section' ? 24 : 0}px`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderRadius: 4,
        }, children: [menu.level === 'section' && (_jsx(Checkbox, { onChange: (e) => {
                    e.stopPropagation();
                }, checked: selectedMenuIds === null || selectedMenuIds === void 0 ? void 0 : selectedMenuIds.includes(menu === null || menu === void 0 ? void 0 : menu._id), style: { marginRight: 8 } })), _jsx(Text, { ellipsis: true, style: {
                    fontWeight: menu.level === 'chapter' ? 'bold' : 'normal',
                    color: menu.level === 'chapter' ? '#333' : '#666',
                }, children: menu.level === 'chapter'
                    ? `${menu.chapter}. ${menu.title || 'Chapter' + ' ' + menu.chapter}`
                    : menu.level === 'actDetails'
                        ? `${menu.title}`
                        : `${menu.sec}. ${menu.title}` })] }, menu._id));
};
export const TimelineComponent = (props) => {
    const { versionList, primaryColor, selectedVersion, setSelectedVersion } = props;
    const isSingle = versionList.length === 1;
    return (_jsxs("div", { style: { padding: 24, position: 'relative' }, children: [!isSingle && (_jsx("div", { style: {
                    position: 'absolute',
                    top: 67,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: primaryColor || '#ccc',
                    zIndex: 0,
                } })), _jsx("div", { style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: isSingle ? 'center' : 'space-between',
                    gap: 16,
                    position: 'relative',
                    zIndex: 1,
                    overflowX: 'auto',
                }, children: versionList.map((item, index) => {
                    const isSelected = (item === null || item === void 0 ? void 0 : item._id) == (selectedVersion === null || selectedVersion === void 0 ? void 0 : selectedVersion._id);
                    return (_jsxs("div", { onClick: () => {
                            setSelectedVersion(item);
                        }, style: {
                            cursor: 'pointer',
                            textAlign: 'center',
                            padding: 8,
                            backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
                            borderRadius: 6,
                            boxShadow: isSelected ? '0 0 6px rgba(0,0,0,0.1)' : 'none',
                            minWidth: isSingle ? 'auto' : '120px',
                            flexShrink: 0,
                        }, children: [_jsxs("div", { style: { fontWeight: 600, color: '#0D4C92', marginBottom: 8 }, children: [_jsx(DateTimeToolTip, { input: item.amendmentDate, outputFormat: G_DATE_READABLE_FORMAT, isVisibleDate: true, isAgo: false, isTag: false }), ' '] }), _jsx("div", { style: {
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    border: '4px solid #8B0000',
                                    backgroundColor: '#fff',
                                    margin: '0 auto',
                                    zIndex: 2,
                                    position: 'relative',
                                } }), _jsxs("div", { style: { fontSize: 12, marginTop: 8 }, children: ["Amended by ", _jsx("br", {}), _jsxs("span", { style: { color: '#0D4C92' }, children: ["Act ", item.actNo, " of ", item.actYear] })] })] }, index));
                }) })] }));
};
export const ActContentRender = (props) => {
    const { primaryColor, contentList, totalContentItems, getActContentList, lawMeta, backgroundImage, isVersionLoading, versionList, selectedVersion, setSelectedVersion, chapters, loading, printableLawContent, selectedChapterIds, setSelectedChapterIds, onPrint, } = props;
    const [showTimeline, setShowTimeline] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const isMobile = useIsMobile();
    const [printModalOpen, setPrintModalOpen] = useState(false);
    const handleTimelineToggle = () => {
        if (isMobile) {
            setMobileDrawerOpen(true);
        }
        else {
            setShowTimeline((prev) => !prev);
        }
    };
    return (_jsxs("div", { style: {
            width: isMobile ? '100%' : drawerWidth + 200,
            borderRight: '1px solid #ccc',
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingInline: '20px',
                }, children: [_jsxs(Button, { type: "link", onClick: handleTimelineToggle, children: ["Timeline ", showTimeline ? _jsx(CaretUpOutlined, {}) : _jsx(CaretDownOutlined, {})] }), _jsxs(Space, { size: 'middle', children: [_jsx(FileOutlined, { twoToneColor: primaryColor, style: { cursor: 'pointer' }, onClick: () => {
                                    setPrintModalOpen(true);
                                } }), _jsx(QuestionCircleFilled, { twoToneColor: primaryColor })] })] }), !isMobile && showTimeline && (_jsx(TimelineComponent, { versionList: versionList, isVersionLoading: isVersionLoading, primaryColor: primaryColor, selectedVersion: selectedVersion, setSelectedVersion: setSelectedVersion })), _jsx(Drawer, { open: mobileDrawerOpen, onClose: () => setMobileDrawerOpen(false), title: "Timeline", placement: "right", width: "100vw", bodyStyle: { padding: 0 }, closable: true, children: _jsx("div", { style: { padding: '16px', height: '100%', overflowY: 'auto' }, children: _jsx(MobileTimelineComponent, { versionList: versionList, primaryColor: primaryColor, selectedVersion: selectedVersion, setSelectedVersion: setSelectedVersion }) }) }), _jsx("div", { style: {
                    flex: 1,
                    overflowY: 'auto',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    paddingRight: 8,
                    border: '1px solid #ccc',
                }, children: _jsx(InfiniteScrollWrapper, { visibleLength: contentList === null || contentList === void 0 ? void 0 : contentList.length, totalLength: totalContentItems, items: contentList, functionNext: getActContentList, height: "88vh", children: _jsx(ContentPreview, { contentList: contentList, backgroundImage: backgroundImage }) }) }), _jsx(Modal, { open: printModalOpen, onCancel: () => {
                    setPrintModalOpen(false);
                }, footer: false, width: drawerWidth, centered: true, children: _jsx(LawPrintModal, { loading: loading, lawMeta: lawMeta, primaryColor: primaryColor, chapters: chapters, lawContents: printableLawContent, selectedChapterIds: selectedChapterIds, setSelectedChapterIds: setSelectedChapterIds, backgroundImage: backgroundImage, onPrint: onPrint }) })] }));
};
const LawPrintModal = (props) => {
    var _a, _b, _c, _d, _e;
    const { lawMeta, primaryColor, chapters, lawContents, selectedChapterIds, setSelectedChapterIds, backgroundImage, onPrint, loading, } = props;
    const printRef = useRef();
    const onSelectAll = () => {
        setSelectedChapterIds(chapters === null || chapters === void 0 ? void 0 : chapters.map((chapter) => {
            return chapter === null || chapter === void 0 ? void 0 : chapter._id;
        }));
    };
    const onClearAll = () => {
        setSelectedChapterIds([]);
    };
    const printLawContent = async () => {
        onPrint(selectedChapterIds);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', rowGap: '10px' }, children: [_jsx(Text, { strong: true, style: { fontWeight: 'bolder', fontSize: 'larger' }, children: (_a = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.law) === null || _a === void 0 ? void 0 : _a.title }), _jsxs(Space, { style: { display: 'flex', flexWrap: 'wrap' }, children: [_jsx(Text, { strong: true, style: { fontWeight: 'bolder', color: primaryColor }, children: "Status :" }), _jsx(Text, { children: ((_b = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _b === void 0 ? void 0 : _b.isLatestVersion) ? (_jsxs(_Fragment, { children: ["Current version as at", ' ', unixToReadableFormat(momentToUnix((_c = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _c === void 0 ? void 0 : _c.amendmentDate), false, G_DATE_READABLE_FORMAT), ' '] })) : (_jsxs(_Fragment, { children: ["Not current version (effective from", ' ', unixToReadableFormat(momentToUnix((_d = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _d === void 0 ? void 0 : _d.amendmentDate), false, G_DATE_READABLE_FORMAT), ' ', "to", ' ', unixToReadableFormat(momentToUnix((_e = lawMeta === null || lawMeta === void 0 ? void 0 : lawMeta.lawVersion) === null || _e === void 0 ? void 0 : _e.lastEffectiveDate), false, G_DATE_READABLE_FORMAT), ")", ' '] })) })] }), _jsx(Divider, { style: {
                            height: '3px',
                            color: primaryColor,
                            margin: '5px',
                            marginInline: '0px',
                            backgroundColor: primaryColor,
                        } })] }), _jsxs(Text, { children: ["Select the provisions you wish to print using the checkboxes and then click the relevant \"Print\"", ' '] }), _jsxs("div", { style: {
                    padding: '5px',
                    paddingInline: '0px',
                    display: 'flex',
                    columnGap: '10px',
                }, children: [_jsx(Button, { disabled: loading || (chapters === null || chapters === void 0 ? void 0 : chapters.length) == 0, onClick: onSelectAll, children: "Select All" }), _jsx(Button, { disabled: loading || (chapters === null || chapters === void 0 ? void 0 : chapters.length) == 0, onClick: onClearAll, children: "Clear All" }), _jsx(Button, { disabled: loading || (chapters === null || chapters === void 0 ? void 0 : chapters.length) == 0, type: "primary", onClick: () => {
                            printLawContent();
                        }, children: "Print" })] }), _jsxs("div", { style: {
                    height: '40vh',
                    width: '100%',
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                }, children: [loading ? (_jsx("div", { style: { height: '100%', display: 'grid', placeItems: 'center' }, children: _jsx(LoadingOutlined, { spin: true, style: { fontSize: 'xx-large' } }) })) : (_jsx("div", { style: { height: '100%' }, children: (chapters === null || chapters === void 0 ? void 0 : chapters.length) == 0 ? (_jsx("div", { style: {
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                            }, children: _jsx(Empty, { description: 'No Chapters Where Found in the Law' }) })) : (_jsx(_Fragment, { children: _jsx(ChapterItemsRenderComponent, { chapters: chapters, selectedChapterIds: selectedChapterIds, setSelectedChapterIds: setSelectedChapterIds }) })) })), _jsx("div", { style: { display: 'none' }, children: _jsx("div", { ref: printRef, children: _jsx(ContentPreview, { contentList: lawContents, backgroundImage: backgroundImage }) }) }), _jsx(ReactToPrint, { trigger: () => (_jsx("button", { id: "trigger-print", style: { display: 'none' }, children: "Hidden Print Trigger" })), content: () => printRef.current })] })] }));
};
export const ChapterItemsRenderComponent = (props) => {
    const { chapters, selectedChapterIds, setSelectedChapterIds } = props;
    return (_jsx("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px',
            padding: '5px',
        }, children: chapters === null || chapters === void 0 ? void 0 : chapters.map((chapter) => {
            return (_jsx(Checkbox, { value: chapter === null || chapter === void 0 ? void 0 : chapter._id, checked: selectedChapterIds === null || selectedChapterIds === void 0 ? void 0 : selectedChapterIds.includes(chapter === null || chapter === void 0 ? void 0 : chapter._id), onClick: (e) => {
                    e.stopPropagation(); // optional, prevents bubbling if needed
                    const id = chapter === null || chapter === void 0 ? void 0 : chapter._id;
                    if (selectedChapterIds === null || selectedChapterIds === void 0 ? void 0 : selectedChapterIds.includes(id)) {
                        setSelectedChapterIds((prev) => prev.filter((cid) => cid !== id));
                    }
                    else {
                        setSelectedChapterIds((prev) => [...(prev || []), id]);
                    }
                }, children: (chapter === null || chapter === void 0 ? void 0 : chapter.title) || `Chapter ${chapter === null || chapter === void 0 ? void 0 : chapter.chapter}` }));
        }) }));
};
export const MobileTimelineComponent = (props) => {
    const { versionList, primaryColor, selectedVersion, setSelectedVersion } = props;
    return (_jsx("div", { style: { padding: 16 }, children: _jsx(Timeline, { mode: "left", style: { marginLeft: 12 }, items: versionList.map((item) => ({
                dot: (_jsx("div", { style: {
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        border: '3px solid #8B0000',
                    } })),
                label: (_jsxs("span", { style: { fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }, onClick: () => {
                        setSelectedVersion(item);
                    }, children: [_jsx(FilePdfOutlined, { style: { color: '#8B0000', marginRight: 4 } }), _jsx(DateTimeToolTip, { input: item.amendmentDate, outputFormat: G_DATE_READABLE_FORMAT, isVisibleDate: true, isAgo: false, isTag: false })] })),
                children: (_jsx("div", { onClick: () => { }, style: {
                        fontSize: 12,
                        cursor: 'pointer',
                        backgroundColor: selectedVersion === item.version ? '#f0f0f0' : 'transparent',
                        padding: 8,
                        borderRadius: 4,
                    }, children: (item === null || item === void 0 ? void 0 : item.actNo) && (item === null || item === void 0 ? void 0 : item.actYear) ? (_jsxs(_Fragment, { children: ["Amended by ", _jsx("br", {}), _jsxs("span", { style: { color: '#0D4C92', fontWeight: 'bold' }, children: ["Act ", item.actNo, " of ", item.actYear] })] })) : (_jsx("span", { style: { fontStyle: 'italic', color: '#999' }, children: "2020 RevEd" })) })),
            })) }) }));
};
