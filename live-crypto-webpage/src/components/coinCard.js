import "../components/coinStyle.css";
const CoinCard = ({ name, price, image, priceChange }) => {
  return (
    <div className="coin-container">
      <div className="coin-card">
        <img className="img" src={image} alt="crypto" />
        <h2 className="title">{name}</h2>
        <p className="title">${price}</p>
        {priceChange < 0 ? (
          <p className="title bear">{priceChange.toFixed(2)}%</p>
        ) : (
          <p className="title bull">{priceChange.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
};
export default CoinCard;
