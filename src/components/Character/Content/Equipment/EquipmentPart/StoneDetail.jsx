import { BsDot } from 'react-icons/bs';

const StoneDetail = ({ item }) => {
  return (
    <div className="desc">
      <p className="type">{item.itemName}</p>
      <div className="flex-row m-5 around">
        <div className="activate">{item.indentStringGroup.activate1.level}</div>
        <BsDot />
        <div className="activate">{item.indentStringGroup.activate2.level}</div>
        <BsDot />
        <div className="decrease">{item.indentStringGroup.decrease.level}</div>
      </div>
    </div>
  );
};

export default StoneDetail;
