import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import _ from 'lodash';
import './styles.less';
const getContentClassName = (type, content) => {
    const sec = content === null || content === void 0 ? void 0 : content.sec;
    const subSec = content === null || content === void 0 ? void 0 : content.subSec;
    const clause = content === null || content === void 0 ? void 0 : content.clause;
    const subClause = content === null || content === void 0 ? void 0 : content.subClause;
    let className = type;
    if (sec) {
        className = `${type}-sec`;
    }
    if (subSec) {
        className = `${type}-subSec`;
    }
    if (clause) {
        className = `${type}-clause`;
    }
    if (subClause) {
        className = `${type}-subClause`;
    }
    return className;
};
// Components
export const parseContent = (text) => {
    if (!text)
        return null;
    const elements = [];
    let remainingText = text;
    const tagRegex = /<sup>(.*?)<\/sup>|<sub>(.*?)<\/sub>/gi;
    let match;
    let lastIndex = 0;
    while ((match = tagRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            elements.push(remainingText.substring(0, match.index - lastIndex));
        }
        if (match[1]) {
            elements.push(_jsx("sup", { children: match[1] }, elements.length));
        }
        else if (match[2]) {
            elements.push(_jsx("sub", { children: match[2] }, elements.length));
        }
        remainingText = remainingText.substring(match.index + match[0].length - lastIndex);
        lastIndex = match.index + match[0].length;
    }
    if (remainingText) {
        elements.push(remainingText);
    }
    return elements;
};
export const GazetteCategoryPreview = ({ content }) => {
    return (_jsx("div", { className: `gazette-category ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content === null || content === void 0 ? void 0 : content.content }));
};
export const GazettePartPreview = ({ content }) => {
    return (_jsx("div", { className: `gazette-part ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content === null || content === void 0 ? void 0 : content.content }));
};
export const GazetteSectionPreview = ({ content }) => {
    return (_jsx("div", { className: `gazette-section ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content === null || content === void 0 ? void 0 : content.content }));
};
export const HeaderPreview = ({ content }) => {
    return (_jsxs("header", { className: `act-header ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: [_jsx("h1", { className: "header-title", children: content.title }), (content === null || content === void 0 ? void 0 : content.content) && _jsx("p", { className: "header-content", children: content.content })] }));
};
export const SubHeaderPreview = ({ content }) => {
    return (_jsx("p", { className: `sub-header ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: parseContent(content === null || content === void 0 ? void 0 : content.content) }));
};
export const ActTitlePreview = ({ content }) => {
    return _jsx("h1", { className: `act-title ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content.title });
};
export const ActNumberPreview = ({ content }) => {
    return _jsxs("p", { className: `act-number ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: ["NO. ", content === null || content === void 0 ? void 0 : content.title] });
};
export const BulletPointsPreview = ({ content }) => {
    return (_jsx("p", { className: 'bullet-points', children: _jsx("ul", { children: _jsx("li", { children: content === null || content === void 0 ? void 0 : content.content }) }) }));
};
export const ActYearPreview = ({ content }) => {
    return _jsx("p", { className: `act-year ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content === null || content === void 0 ? void 0 : content.title });
};
export const PartPreview = ({ content }) => {
    console.log('🇮🇳 content?.part:', content === null || content === void 0 ? void 0 : content.part);
    return _jsxs("p", { className: 'part', children: ["PART - ", content === null || content === void 0 ? void 0 : content.part] });
};
export const DateofEnactmentPreview = ({ content }) => {
    return _jsx("p", { className: `enactment-date ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content.title });
};
export const PreamblePreview = ({ content }) => {
    return (_jsxs("p", { className: `preamble ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: [_jsx("span", { style: { fontWeight: 'bold' }, children: "Preamble " }), parseContent(content.content)] }));
};
export const OmittedPreview = ({ content }) => {
    if (!(content === null || content === void 0 ? void 0 : content.content))
        return null;
    // Extract only first 5 '*' characters
    const stars = content.content
        .split('')
        .filter((char) => char === '*')
        .slice(0, 5);
    return (_jsx("div", { style: { display: 'flex', justifyContent: 'space-between', width: '100%' }, children: stars.map((char, index) => (_jsx("span", { children: char }, index))) }));
};
export const EnactingClausePreview = ({ content }) => {
    return (_jsx("p", { className: `enacting-clause ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: content === null || content === void 0 ? void 0 : content.content }));
};
export const ChapterPreview = ({ content }) => {
    const toCapitalCase = (str) => str.toUpperCase();
    const title = toCapitalCase((content === null || content === void 0 ? void 0 : content.title) || '');
    return (_jsxs("div", { className: `chapter ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: [_jsxs("h2", { children: ["CHAPTER ", content === null || content === void 0 ? void 0 : content.chapter] }), _jsxs("h3", { className: "chapter-title", children: [_jsx("span", { className: "chapter-title-first-letter", children: title.charAt(0) }), _jsx("span", { className: "chapter-title-rest", children: title.slice(1) })] })] }));
};
export const SectionPreview = ({ content }) => {
    const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
    const title = toTitleCase((content === null || content === void 0 ? void 0 : content.title) || '');
    return (_jsxs("section", { className: "section", children: [_jsxs("h4", { className: "section-title", children: [content === null || content === void 0 ? void 0 : content.sec, ". ", parseContent(title)] }), (content === null || content === void 0 ? void 0 : content.content) && _jsx("p", { className: "section-content", children: parseContent(content.content) }), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const SubSectionPreview = ({ content }) => {
    return (_jsxs("p", { className: "subsection", children: [content === null || content === void 0 ? void 0 : content.subSec, " ", (content === null || content === void 0 ? void 0 : content.title) ? _jsxs("strong", { children: [content === null || content === void 0 ? void 0 : content.title, " "] }) : null, (content === null || content === void 0 ? void 0 : content.content) && parseContent(content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const ClausePreview = ({ content }) => {
    return (_jsxs("p", { className: "clause", children: [content === null || content === void 0 ? void 0 : content.clause, " ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const ExplanationPreview = ({ content }) => {
    const className = getContentClassName('explanation', content);
    return (_jsxs("p", { className: className, children: [_jsxs("span", { className: "explanation-prefix", children: [_jsx("i", { children: (content === null || content === void 0 ? void 0 : content.refNo) ? content.refNo : 'Explanation' }), "."] }), ' ', parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const IllustrationPreview = ({ content }) => {
    const className = getContentClassName('illustration', content);
    return (_jsxs(_Fragment, { children: [_jsx("i", { children: _jsx("p", { className: "illustration-heading", children: "Illustration" }) }), _jsx("p", { className: className, children: parseContent(content === null || content === void 0 ? void 0 : content.content) }), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const ExplanationsPreview = ({ content }) => {
    const className = getContentClassName('explanations', content);
    return (_jsxs("p", { className: className, children: [_jsx("i", { children: "Explanation" }), " ", content === null || content === void 0 ? void 0 : content.refNo, ". ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const ProvisoPreview = ({ content }) => {
    const className = getContentClassName('proviso', content);
    return (_jsxs("p", { className: className, children: [_jsx("i", { children: "Proviso" }), " ", content === null || content === void 0 ? void 0 : content.refNo, ". ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const IllustrationsPreview = ({ content }) => {
    const className = getContentClassName('illustrations', content);
    const isFirst = _.includes(['(a)', '(1)'], content === null || content === void 0 ? void 0 : content.refNo);
    return (_jsxs(_Fragment, { children: [_jsx("i", { children: isFirst && _jsx("p", { className: "illustrations-heading", children: "Illustrations" }) }), _jsxs("p", { className: className, children: [content === null || content === void 0 ? void 0 : content.refNo, " ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] })] }));
};
export const AmendmentPreview = ({ content }) => {
    return _jsx("p", { className: "amendment", children: content === null || content === void 0 ? void 0 : content.title });
};
export const StatePreview = ({ content }) => {
    return _jsx("p", { className: "stateAmendment", children: content === null || content === void 0 ? void 0 : content.title });
};
export const StateParagraphPreview = ({ content }) => {
    return (_jsxs("p", { className: "stateParagraphAmendment", children: [content === null || content === void 0 ? void 0 : content.title, _jsx("br", {}), parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), content === null || content === void 0 ? void 0 : content.refText] }));
};
export const SubClausePreview = ({ content }) => {
    return (_jsxs("p", { className: "subClause", children: [(content === null || content === void 0 ? void 0 : content.refNo) ? content === null || content === void 0 ? void 0 : content.refNo : content === null || content === void 0 ? void 0 : content.subClause, ' ', (content === null || content === void 0 ? void 0 : content.title) ? _jsxs("strong", { children: [content === null || content === void 0 ? void 0 : content.title, " "] }) : null, parseContent(content === null || content === void 0 ? void 0 : content.content)] }));
};
// export const ParagraphPreview: React.FC<PreviewComponentProps> = ({ content }) => {
//   return (
//     <p className="paragraph">
//       {content?.title ? <strong>{content.title} </strong> : null}
//       {parseContent(content?.content)}
//       <br/>{content?.refText ? content?.refText : null}
//     </p>
//   );
// };
export const ParagraphPreview = ({ content }) => {
    return (_jsxs("p", { className: "paragraph", children: [(content === null || content === void 0 ? void 0 : content.title) ? _jsxs("strong", { children: [content.title, " "] }) : null, (content === null || content === void 0 ? void 0 : content.refNo) ? (_jsxs(_Fragment, { children: [_jsxs("strong", { children: [content.refNo, "."] }), " ", parseContent(content === null || content === void 0 ? void 0 : content.content)] })) : (parseContent(content === null || content === void 0 ? void 0 : content.content)), (content === null || content === void 0 ? void 0 : content.refText) ? (_jsxs(_Fragment, { children: [_jsx("br", {}), content.refText] })) : null] }));
};
export const ExceptionsPreview = ({ content }) => {
    return (_jsxs("p", { className: `exceptions ${(content === null || content === void 0 ? void 0 : content.refNo) ? 'indented' : ''}`, children: ["Exception ", content === null || content === void 0 ? void 0 : content.refNo, " ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
export const ExceptionPreview = ({ content }) => {
    return (_jsxs("p", { className: "exception", children: [_jsx("i", { children: (content === null || content === void 0 ? void 0 : content.refNo) ? content.refNo : 'Exception' }), ". ", parseContent(content === null || content === void 0 ? void 0 : content.content), _jsx("br", {}), (content === null || content === void 0 ? void 0 : content.refText) ? content === null || content === void 0 ? void 0 : content.refText : null] }));
};
