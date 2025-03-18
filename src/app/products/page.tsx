import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/app/data/products';
import styles from '@/styles/pages/ProductsPage.module.scss';

export default function ProductsPage() {
  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.pageTitle}>Our Products</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.productImage} priority />
            </div>
            <div className={styles.productDetails}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              <p className={styles.stockStatus} data-in-stock={product.inStock}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
