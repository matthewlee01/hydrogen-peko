import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';

import Gallery from './Gallery.client';
import Seo from './Seo.client';

/**
 * A client component that displays detailed information about a product to allow buyers to make informed decisions
 */
function ProductPriceMarkup() {
  return (
    <div className="flex md:flex-col items-end font-semibold text-lg md:items-start md:mb-4">
      <Product.SelectedVariant.Price
        priceType="compareAt"
        className="text-gray-500 line-through text-lg mr-2.5"
      >
        {({amount, currencyNarrowSymbol}) => `${currencyNarrowSymbol}${amount}`}
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.Price className="text-gray-900">
        {({currencyCode, amount, currencyNarrowSymbol}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}`
        }
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.UnitPrice className="text-gray-500">
        {({currencyCode, amount, currencyNarrowSymbol, referenceUnit}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}/${referenceUnit}`
        }
      </Product.SelectedVariant.UnitPrice>
    </div>
  );
}

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8">
      <Product.SelectedVariant.BuyNowButton
        className={
          'text-center font-mono font-semibold p-4 w-full border-4 border-white shadow-md bg-blue-600 text-white disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed'
        }
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Order Now'}
      </Product.SelectedVariant.BuyNowButton>
    </div>
  );
}
export default function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];

  return (
    <>
      <Seo product={product} />
      <Product product={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8 my-16">
          <div className="md:hidden mt-5 mb-8">
            <Product.Title
              as="h1"
              className="text-4xl font-bold text-black mb-4"
            />
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPriceMarkup />
            </div>
          </div>

          <Gallery />

          <div>
            <div className="hidden md:block">
              <Product.Title
                as="h1"
                className="text-5xl font-bold text-black mb-4"
              />
              {product.vendor && (
                <div className="text-sm font-medium mb-2 text-gray-900">
                  {product.vendor}
                </div>
              )}
              <ProductPriceMarkup />
            </div>
            {/* Product Options */}
            <div className="mt-8">
              <AddToCartMarkup />
            </div>
            {/* Product Description */}
            <Product.Description className="prose border-t border-gray-200 pt-6 text-black text-md" />
          </div>
        </div>
      </Product>
    </>
  );
}
