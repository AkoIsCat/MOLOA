// JSON 형태를 객체 형태로 변환해주는 함수
export const parseTooltips = (data) => {
  return Object.values(data)
    .map((it) => JSON.parse(it.Tooltip))
    .filter(Boolean);
};
