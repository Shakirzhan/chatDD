const chat = {
    background: '#ffffff',
    height: '100%',
}

const chatHeader = {
    background: '#1976d2',
    padding: '10px 15px',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'move',
}

const chatHeaderH2 ={
  margin: 0,
  padding: 0,
  fontSize: '14px',
  float: 'left',
}

const chatHeaderH2H = {
  color: '#ffffff',
  textDecoration: 'none'
}

const both = {
    display: 'block',
    content: '',
    clear: 'both',
}

const chatHeaderTools = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  float: 'right',
}

const chatHeaderToolsLi = {
  display: 'inline-block',
  marginRight: '6px',
}

const chatHeaderToolsLastChild = {
  margin: 0,
}

const chatHeaderToolsLiA = {
  color: '#ffffff',
  textDecoration: 'none',
}

const chatBody = {
  position: 'relative',
  height: 'calc(100vh - 72px - 20px)',
  overflowY: 'scroll',
}

const chatBodySearch = {
  width: '100%',
}

const chatBodySearchaOpened = {
  display: 'block',
}

const chatBodySearchInput = {
  width: 'calc(100% - 30px)',
  margin: 0,
  padding: '10px 15px',
  border: 'none',
  boxSize: 'border-box',
}

const chatBodyUl = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  borderTop: '1px solid #f2f2f2',
}

const chatBodyUlLi = {
  position: 'relative',
  background: '#ffffff',
  display: 'block',
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
}

const chatBodyUlLiThumbnail = {
  display: 'inline-block',
  background: '#bfbfbf',
  width: '50px',
  color: '#ffffff',
  lineHeight: '50px',
  textAlign: 'center',
  textDecoration: 'none',
}

const chatBodyUlLiThumbnailImg = {
  width: '100%',
}

const chatBodyUlLiContent = {
  display: 'inline-block',
  marginLeft: '6px',
  verticalAlign: 'top',
  lineHeight: 1,
}

const chatBodyUlLiContentH3 = {
  display: 'block',
  width: '100%',
  margin: 0,
  marginBottom: '5px',
  color: '#808080',
}

const chatBodyUlLiContentPreview = {
  display: 'block',
  width: '100%',
  maxWidth: '200px',
  marginBottom: '5px',
  color: '#cccccc',
  fontSize: '12px',
}

const chatBodyUlLiContentMeta = {
  color: '#b3b3b3',
  fontSize: '12px',
}

const chatBodyUlLiContentMetaA = {
  color: '#999999',
  textDecoration: 'none',
}

const chatBodyUlLiMessage = {
  display: 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
}

const chatFooterA = {
  background: '#1976d2',
  display: 'block',
  width: '100%',
  padding: '10px 15px',
  color: '#ffffff',
  fontSize: '14px',
  textAlign: 'center',
  textDecoration: 'none',
  boxSizing: 'border-box',
}

const info = {
  width: '300px',
  margin: '25px auto',
  textAlign: 'center',
}

const infoH1 = {
  margin: 0,
  padding: 0,
  fontSize: '24px',
  fontWeight: 400,
  color: '#333333',
}

const infoSpan = {
  color: '#666666',
  fontSize: '12px'
}

const infoSpanA = {
  color: '#000000',
  textDecoration: 'none'
}

const infoSpanFa = {
  color: '#bd6982'
}

const infoSpanSpoilers = {
  color: '#999999',
  marginTop: '5px',
  fontSize: '10px'
}

export default {
    chat,
    chatHeader,
    infoSpanA,
    infoSpanFa,
    infoH1,
    infoSpan,
    infoSpanSpoilers,
    chatHeaderH2,
    chatHeaderH2H,
    chatHeaderTools,
    chatHeaderToolsLi,
    chatHeaderToolsLastChild,
    chatHeaderToolsLiA,
    chatBody,
    chatBodySearch,
    chatBodySearchaOpened,
    chatBodySearchInput,
    chatBodyUl,
    chatBodyUlLi,
    chatBodyUlLiThumbnail,
    chatBodyUlLiThumbnailImg,
    chatBodyUlLiContent,
    chatBodyUlLiContentH3,
    chatBodyUlLiContentPreview,
    chatBodyUlLiContentMeta,
    chatBodyUlLiContentMetaA,
    chatBodyUlLiMessage,
    chatFooterA,
    info,
    both,
}