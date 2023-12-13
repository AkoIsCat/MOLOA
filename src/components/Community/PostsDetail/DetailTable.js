import styled from 'styled-components';
import { dateTransformation } from '../../../utils/dateTransformation';

import { collect1 } from '../../../asset/icon';
import Loading from '../../UI/Loading';
import { AiFillLike } from 'react-icons/ai';

const DetailTable = ({ isLoading, data, onClickLike }) => {
  return (
    <Table>
      <tbody>
        {isLoading && (
          <tr>
            <td>
              <Loading />
            </td>
          </tr>
        )}
        {!isLoading && (
          <>
            <tr className="title">
              <td colSpan="2" className="title_contents">
                {data.post.post_title}
              </td>
              <td colSpan="2" className="date">
                {dateTransformation(data.post.post_date)}
              </td>
            </tr>
            <tr className="head">
              <td className="writer">
                {data.post.writer_nk}
                <img src={collect1} alt="모코코씨앗" />
              </td>
              <td className="view">조회: {data.post.view_count}</td>
              <td className="likes">좋아요: {data.post.like_count}</td>
              <td className="commentCount">댓글: {data.post.comment_count}</td>
            </tr>
            <tr className="contents">
              <td colSpan="4">
                <p> </p>
                {data.post.post_contents.split('\n').map((item, index) => (
                  <p key={`${item} ${index}`}>{item}</p>
                ))}
              </td>
            </tr>
            <tr className="likeBtn">
              <td colSpan="4">
                <LikeButton onClick={onClickLike}>
                  <AiFillLike size="25" color="#fff" />
                </LikeButton>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  );
};

export default DetailTable;

const Table = styled.table`
  width: 95%;
  border: none;
  border-top: 1px solid #eeeeee;
  color: #c1c1c1;
  border-collapse: collapse;

  .title {
    line-height: 3rem;
    border-bottom: 1px solid #eeeeee;
    background-color: rgba(109, 114, 118, 0.3);
  }

  .title .title_contents {
    font-weight: bold;
    font-size: 25px;
    padding: 0 15px;
  }

  .head {
    width: 100%;
    height: 35px;
    font-size: 15px;
    border-bottom: 1px solid #cccccc;
  }

  .writer {
    width: 30vw;
    padding: 0 10px;
    position: relative;
  }

  .writer img {
    width: 18px;
    height: 18px;
    position: relative;
    top: 3px;
    left: 3px;
  }

  .view,
  .likes {
    width: 5vw;
  }

  p {
    height: 20px;
  }

  .title,
  .contents,
  .likeBtn {
    width: 100%;
  }

  .contents td {
    padding: 0 10px;
  }

  .likeBtn {
    text-align: center;
  }
`;

const LikeButton = styled.button`
  width: 50px;
  height: 50px;
  background: #6d7276;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #4b535a;
  }
`;
