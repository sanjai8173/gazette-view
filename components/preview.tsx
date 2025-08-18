import _ from 'lodash';
import React from 'react';
import './styles.less';

interface ContentItem {
  level: string;
  title?: string;
  content?: string;
  chapter?: string;
  sec?: string;
  subSec?: string;
  clause?: string;
  subClause?: string;
  refNo?: string;
  [key: string]: any; // For any additional properties
}

interface PreviewComponentProps {
  content: ContentItem;
  [key: string]: any; // For any additional props
}

const getContentClassName = (type, content) => {
  const sec = content?.sec;
  const subSec = content?.subSec;
  const clause = content?.clause;
  const subClause = content?.subClause;
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
export const parseContent = (text?: string): React.ReactNode => {
  if (!text) return null;

  const elements: React.ReactNode[] = [];
  let remainingText = text;

  const tagRegex = /<sup>(.*?)<\/sup>|<sub>(.*?)<\/sub>/gi;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = tagRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(remainingText.substring(0, match.index - lastIndex));
    }

    if (match[1]) {
      elements.push(<sup key={elements.length}>{match[1]}</sup>);
    } else if (match[2]) {
      elements.push(<sub key={elements.length}>{match[2]}</sub>);
    }

    remainingText = remainingText.substring(match.index + match[0].length - lastIndex);
    lastIndex = match.index + match[0].length;
  }

  if (remainingText) {
    elements.push(remainingText);
  }

  return elements;
};

export const GazetteCategoryPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <div className={`gazette-category ${content?.refNo ? 'indented' : ''}`}>{content?.content}</div>
  );
};

export const GazettePartPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <div className={`gazette-part ${content?.refNo ? 'indented' : ''}`}>{content?.content}</div>
  );
};

export const GazetteSectionPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <div className={`gazette-section ${content?.refNo ? 'indented' : ''}`}>{content?.content}</div>
  );
};

export const HeaderPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <header className={`act-header ${content?.refNo ? 'indented' : ''}`}>
      <h1 className="header-title">{content.title}</h1>
      {content?.content && <p className="header-content">{content.content}</p>}
    </header>
  );
};

export const SubHeaderPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className={`sub-header ${content?.refNo ? 'indented' : ''}`}>
      {parseContent(content?.content)}
    </p>
  );
};

export const ActTitlePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <h1 className={`act-title ${content?.refNo ? 'indented' : ''}`}>{content.title}</h1>;
};

export const ActNumberPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <p className={`act-number ${content?.refNo ? 'indented' : ''}`}>NO. {content?.title}</p>;
};

export const BulletPointsPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className={'bullet-points'}>
      <ul>
        <li>{content?.content}</li>
      </ul>
    </p>
  );
};

export const ActYearPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <p className={`act-year ${content?.refNo ? 'indented' : ''}`}>{content?.title}</p>;
};
export const PartPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  console.log('🇮🇳 content?.part:', content?.part);
  return <p className={'part'}>PART - {content?.part}</p>;
};

export const DateofEnactmentPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <p className={`enactment-date ${content?.refNo ? 'indented' : ''}`}>{content.title}</p>;
};

export const PreamblePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className={`preamble ${content?.refNo ? 'indented' : ''}`}>
      <span style={{ fontWeight: 'bold' }}>Preamble </span>
      {parseContent(content.content)}
    </p>
  );
};
export const OmittedPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  if (!content?.content) return null;

  // Extract only first 5 '*' characters
  const stars = content.content
    .split('')
    .filter((char) => char === '*')
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {stars.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </div>
  );
};

export const EnactingClausePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className={`enacting-clause ${content?.refNo ? 'indented' : ''}`}>{content?.content}</p>
  );
};

export const ChapterPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const toCapitalCase = (str: string) => str.toUpperCase();
  const title = toCapitalCase(content?.title || '');

  return (
    <div className={`chapter ${content?.refNo ? 'indented' : ''}`}>
      <h2>CHAPTER {content?.chapter}</h2>
      <h3 className="chapter-title">
        <span className="chapter-title-first-letter">{title.charAt(0)}</span>
        <span className="chapter-title-rest">{title.slice(1)}</span>
      </h3>
    </div>
  );
};

export const SectionPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  const title = toTitleCase(content?.title || '');

  return (
    <section className="section">
      <h4 className="section-title">
        {content?.sec}. {parseContent(title)}
      </h4>
      {content?.content && <p className="section-content">{parseContent(content.content)}</p>}
      <br />
      {content?.refText ? content?.refText : null}
    </section>
  );
};

export const SubSectionPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="subsection">
      {content?.subSec} {content?.title ? <strong>{content?.title} </strong> : null}
      {content?.content && parseContent(content.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};

export const ClausePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="clause">
      {content?.clause} {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};

export const ExplanationPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const className = getContentClassName('explanation', content);
  return (
    <p className={className}>
      <span className="explanation-prefix">
        <i>{content?.refNo ? content.refNo : 'Explanation'}</i>.
      </span>{' '}
      {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};

export const IllustrationPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const className = getContentClassName('illustration', content);
  return (
    <>
      <i>
        <p className="illustration-heading">Illustration</p>
      </i>
      <p className={className}>{parseContent(content?.content)}</p>
      <br />
      {content?.refText ? content?.refText : null}
    </>
  );
};

export const ExplanationsPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const className = getContentClassName('explanations', content);
  return (
    <p className={className}>
      <i>Explanation</i> {content?.refNo}. {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};
export const ProvisoPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const className = getContentClassName('proviso', content);
  return (
    <p className={className}>
      <i>Proviso</i> {content?.refNo}. {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};

export const IllustrationsPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  const className = getContentClassName('illustrations', content);

  const isFirst = _.includes(['(a)', '(1)'], content?.refNo);
  return (
    <>
      <i>{isFirst && <p className="illustrations-heading">Illustrations</p>}</i>
      <p className={className}>
        {content?.refNo} {parseContent(content?.content)}
        <br />
        {content?.refText ? content?.refText : null}
      </p>
    </>
  );
};

export const AmendmentPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <p className="amendment">{content?.title}</p>;
};
export const StatePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return <p className="stateAmendment">{content?.title}</p>;
};

export const StateParagraphPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="stateParagraphAmendment">
      {content?.title}
      <br />
      {parseContent(content?.content)}
      <br />
      {content?.refText}
    </p>
  );
};

export const SubClausePreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="subClause">
      {content?.refNo ? content?.refNo : content?.subClause}{' '}
      {content?.title ? <strong>{content?.title} </strong> : null}
      {parseContent(content?.content)}
    </p>
  );
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
export const ParagraphPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="paragraph">
      {content?.title ? <strong>{content.title} </strong> : null}
      {content?.refNo ? (
        <>
          <strong>{content.refNo}.</strong> {parseContent(content?.content)}
        </>
      ) : (
        parseContent(content?.content)
      )}
      {content?.refText ? (
        <>
          <br />
          {content.refText}
        </>
      ) : null}
    </p>
  );
};

export const ExceptionsPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className={`exceptions ${content?.refNo ? 'indented' : ''}`}>
      Exception {content?.refNo} {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};

export const ExceptionPreview: React.FC<PreviewComponentProps> = ({ content }) => {
  return (
    <p className="exception">
      <i>{content?.refNo ? content.refNo : 'Exception'}</i>. {parseContent(content?.content)}
      <br />
      {content?.refText ? content?.refText : null}
    </p>
  );
};
