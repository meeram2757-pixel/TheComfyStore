export function formatPrice(priceInCents) {
  return (priceInCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
