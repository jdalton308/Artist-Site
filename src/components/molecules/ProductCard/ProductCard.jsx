import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      {product.imageUrl && (
        <div className="product-card__image-wrap">
          <img src={product.imageUrl} alt={product.title} className="product-card__image" />
        </div>
      )}
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        {product.description && (
          <Text variant="muted">{product.description}</Text>
        )}
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price} {product.currencyCode}
          </span>
          <Button variant="primary" size="sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
