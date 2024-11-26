/* eslint-disable */
const removeTag = (data, tag) => {
  const removeStartTag = new RegExp(
    `<${tag}[a-zA-Z0-9_\\^\\$\\.\\|\\{\\[\\}\\]\\(\\)\\*\\+\\?\\\\~'!@#%&-=;:'",/\\n\\s]*>`,
    'g'
  );
  const removeCloseTag = new RegExp(`</${tag}>`, 'g');

  const removeFontTag = data.replaceAll(removeStartTag, '');
  const removeAllTag = removeFontTag.replaceAll(removeCloseTag, '');

  return removeAllTag;
};

export default removeTag;
