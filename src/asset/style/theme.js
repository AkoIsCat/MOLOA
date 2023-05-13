const size = {
  mobile: '767px',
  tablet: '1024px',
  desktop: '1300px',
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
