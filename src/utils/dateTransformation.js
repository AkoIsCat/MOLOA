export const dateTransformation = (stringDate) => {
  const current = new Date();
  const currentMonth = current.getMonth() + 1;
  const currentDate = current.getDate();

  const posts = new Date(stringDate);
  const postsMonth = ('0' + posts.getMonth() + 2).slice(-2);
  const postsDate = ('0' + posts.getDate()).slice(-2);
  const postsHours = ('0' + posts.getHours()).slice(-2);
  const postsMinutes = ('0' + posts.getMinutes()).slice(-2);

  const sameMonth = currentMonth === +postsMonth;
  const sameDate = currentDate === +postsDate;

  return sameMonth && sameDate
    ? `${postsHours}:${postsMinutes}`
    : `${postsMonth}-${postsDate}`;
};
