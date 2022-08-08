export class KafkaTopics {
  private static MVC_ORDER_PREFIX_TOPIC = 'mvc.order.';
  private static MVC_PRODUCT_PREFIX_TOPIC = 'mvc.product.';
  public static ORDER_CREATED = KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'created';
  public static ORDER_UPDATE_PAYMENT_STATUS =
    KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'update.payment.status';
  public static INVENTORY_PRODUCT_DECREASE_TOTAL =
    KafkaTopics.MVC_PRODUCT_PREFIX_TOPIC + 'inventory.decrease.total';
}
