export default function card() {
  return (
    <div className={styles.card}>
      <h1 className={styles.textCardTitle}>
        {"Delivery Order"}
      </h1>
      <h1 className={styles.textName}>{item.user_name}</h1>
      <div className={styles.cart}>
        <div className={styles.boxCart}>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt=""
            className={styles.img}
          />
          <div className={styles.boxDesc}>
            <h1 className={styles.textDesc}>{item.product_name}</h1>
            <h1 className={styles.textDesc}>{item.product_qty}</h1>
            <h1 className={styles.textDesc}>{item.product_size}</h1>
          </div>
          <h1 className={styles.textPrice}>{item.product_base_price}</h1>
        </div>
        <div className={styles.boxCart}>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt=""
          />
          <div className={styles.boxDesc}>
            <h1 className={styles.textDesc}>Hazelnut Latte</h1>
            <h1 className={styles.textDesc}>x 1</h1>
            <h1 className={styles.textDesc}>Regular</h1>
          </div>
          <h1 className={styles.textPrice}>IDR 24.0</h1>
        </div>
      </div>
      <hr />
      <div className={styles.boxTotal}>
        <div className={styles.boxOrder}>
          <h1 className={styles.textOrder}>Discount</h1>
          <h1 className={styles.textOrder}>Sub Total</h1>
          <h1 className={styles.textOrder}>Tax & Fees</h1>
        </div>
        <div className={styles.boxOrder}>
          <h1 className={styles.textOrder}>Rp {item.invoice_discount}</h1>
          <h1 className={styles.textOrder}>Rp {item.invoice_sub_total}</h1>
          <h1 className={styles.textOrder}>RP {item.invoice_tax}</h1>
        </div>
      </div>
      <div className={styles.boxTotal}>
        <h1 className={styles.textTotal}>TOTAL</h1>
        <h1 className={styles.textTotal}>Rp {item.invoice_sub_total}</h1>
      </div>
    </div>
  )
}
