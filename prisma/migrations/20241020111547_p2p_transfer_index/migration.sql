-- CreateIndex
CREATE INDEX "p2pTransfer_fromUserId_idx" ON "p2pTransfer"("fromUserId");

-- CreateIndex
CREATE INDEX "p2pTransfer_toUserId_idx" ON "p2pTransfer"("toUserId");

-- CreateIndex
CREATE INDEX "p2pTransfer_fromUserId_toUserId_idx" ON "p2pTransfer"("fromUserId", "toUserId");
