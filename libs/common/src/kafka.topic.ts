export class KafkaTopics {
  private static MVC_ORDER_PREFIX_TOPIC = 'mvc.order.';
  public static ORDER_CREATED = KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'create';
  public static ORDER_UPDATE_PAYMENT_STATUS =
    KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'update.payment.status';
  private static MVC_PRODUCT_PREFIX_TOPIC = 'mvc.product.';
  public static INVENTORY_PRODUCT_DECREASE_TOTAL =
    KafkaTopics.MVC_PRODUCT_PREFIX_TOPIC + 'inventory.decrease.total';

  // Inventory
  private static MVC_INVENTORY_PREFIX_TOPIC = 'mvc.inventory.';
  public static INVENTORY_IS_NOT_ENOUGH =
    KafkaTopics.MVC_INVENTORY_PREFIX_TOPIC + 'is.not.enough';
}
