function EntryNodeOfLoop(pHead) {
  let obj = {};
  while (pHead) {
    if (!obj[pHead.val]) {
      obj[pHead.val] = 1;
      pHead = pHead.next;
    } else return pHead;
  }
}
