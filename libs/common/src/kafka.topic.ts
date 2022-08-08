export class KafkaTopics {
  private static MVC_ORDER_PREFIX_TOPIC = 'mvc.order.';
  public static ORDER_CREATE =
    KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'order.create';
  public static ORDER_CREATE_SUCCESSFUL =
    KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'order.create.successful';
  public static ORDER_CREATE_FAILED =
    KafkaTopics.MVC_ORDER_PREFIX_TOPIC + 'order.create.failed';
}
