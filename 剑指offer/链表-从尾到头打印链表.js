function printListFromTailToHead(head) {
  let ArrayList = [];
  while (head) {
    ArrayList.push(head.val);
    head = head.next;
  }
  return ArrayList.reverse();
}
