import Icon from "@/components/atoms/Icon/Icon";
import "./CartItem.css";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} className="cart-item__image" />
      )}
      <div className="cart-item__details">
        <h4 className="cart-item__title">{item.title}</h4>
        <p className="cart-item__meta">
          Qty: {item.quantity} · ${item.price}
        </p>
      </div>
      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.variantId)}
        aria-label={`Remove ${item.title} from cart`}
      >
        <Icon name="close" size="sm" />
      </button>
    </div>
  );
}
