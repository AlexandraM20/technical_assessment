import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getProductById, products } from '@/app/[locale]/data/products';
import styles from '@/styles/pages/ProductPage.module.scss';

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const t = await getTranslations('products');
  // Extract the productId from params
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.productTitle}>{product.name}</h1>

      <div className={styles.productImageContainer}>
        <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.productImage} priority />
      </div>

      <div className={styles.productInfo}>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.productMeta}>
          <span>
            {t('category')}: {product.category}
          </span>
          <span>
            {t('inStock')}: {product.inStock ? t('yes') : t('no')}
          </span>
        </div>

        <button className={styles.addToCartButton} disabled={!product.inStock}>
          {product.inStock ? t('addToCart') : t('outOfStock')}
        </button>
      </div>
    </div>
  );
}
