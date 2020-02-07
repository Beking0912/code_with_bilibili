function deleteDuplication(pHead) {
  if (!pHead || !pHead.next) return pHead;
  let dummy = new ListNode(0);
  dummy.next = pHead;
  let slow = dummy;
  let fast = dummy.next;
  while (fast) {
    while (fast.next && fast.val === fast.next.val) 
      fast = fast.next;
    if (slow.next === fast) {
      slow = slow.next;
    } else {
      slow.next = fast.next;
    }
    fast = fast.next;
  }
  return dummy.next;
}
