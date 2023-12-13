import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { dateTransformation } from '../../utils/dateTransformation';

import Loading from '../UI/Loading';

const ListTable = ({ postsListisLoading, postsList }) => {
  const navigate = useNavigate();

  return (
    <Table border="1">
      <thead>
        <tr>
          <th className="number">번호</th>
          <th className="title">제목</th>
          <th className="writer">작성자</th>
          <th className="date">등록일</th>
          <th className="views">조회수</th>
          <th className="like">좋아요</th>
        </tr>
      </thead>
      <tbody>
        {postsListisLoading && (
          <tr>
            <td>
              <Loading />
            </td>
          </tr>
        )}
        {!postsListisLoading &&
          postsList.map((item) => (
            <tr key={item.post_id}>
              <td className="number">{item.post_id}</td>
              <td
                className="title"
                onClick={() => navigate(`/posts-detail/${item.post_id}`)}
              >
                {item.post_title}
              </td>
              <td className="writer">{item.writer_nk}</td>
              <td className="date">{dateTransformation(item.post_date)}</td>
              <td className="views">{item.view_count}</td>
              <td className="like">{item.like_count}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ListTable;

const Table = styled.table`
  width: 95%;
  margin: 0 20px;
  border: none;
  border-top: 1px solid lightgray;
  color: #c1c1c1;
  border-collapse: collapse;

  td {
    border-bottom: 1px solid lightgray;
  }

  thead {
    height: 30px;
    border-bottom: 1px solid lightgray;
    background: ;
  }

  tbody {
    height: 30px;
  }

  .number,
  .writer,
  .date,
  .views,
  .like {
    width: 5vw;
    text-align: center;
    height: 40px;
  }

  .title {
    width: 35vw;
    cursor: pointer;
  }
`;
