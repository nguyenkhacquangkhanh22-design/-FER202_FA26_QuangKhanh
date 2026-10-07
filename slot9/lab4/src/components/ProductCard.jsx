import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { formatVND, getFinalPrice } from '../utils/format';

const ProductCard = ({ product, onAddToCart }) => {
  const finalPrice = getFinalPrice(product);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.category?.name}
        </Card.Subtitle>
        <div className="mb-2">
          <span className="fw-bold text-primary">{formatVND(finalPrice)}</span>
          {product.discountPercentage > 0 && (
            <small className="text-muted text-decoration-line-through ms-2">
              {formatVND(product.price)}
            </small>
          )}
        </div>
        <div className="mb-3">
          <Badge bg={product.inStock ? 'success' : 'secondary'}>
            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
          <small className="ms-2 text-warning">★ {product.rating?.rate ?? 0}</small>
        </div>
        {onAddToCart && (
          <Button
            variant="primary"
            size="sm"
            className="mt-auto"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            Thêm vào giỏ
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;