import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createChangeOrder, applyChangeOrder, getChangeOrdersByEstimate } from '@/lib/changeOrderService';

interface ChangeOrderManagerProps {
  estimateId: string;
  userId: string;
  currentTotal: number;
  onChangeOrderApplied?: (newTotal: number) => void;
}

interface ChangeOrderItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const ChangeOrderManager: React.FC<ChangeOrderManagerProps> = ({
  estimateId,
  userId,
  currentTotal,
  onChangeOrderApplied,
}) => {
  const [changeOrders, setChangeOrders] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [items, setItems] = useState<ChangeOrderItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  // Load change orders on mount
  React.useEffect(() => {
    loadChangeOrders();
  }, [estimateId]);

  const loadChangeOrders = async () => {
    try {
      const orders = await getChangeOrdersByEstimate(estimateId);
      setChangeOrders(orders);
    } catch (error) {
      console.error('Error loading change orders:', error);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Calculate amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setItems(newItems);
  };

  const handleCreateChangeOrder = async () => {
    if (!title || items.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const newOrder = await createChangeOrder(estimateId, userId, {
        title,
        description,
        items,
        reason,
      });

      setChangeOrders([...changeOrders, newOrder]);
      setTitle('');
      setDescription('');
      setReason('');
      setItems([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating change order:', error);
      alert('Failed to create change order');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyChangeOrder = async (changeOrderId: string) => {
    setLoading(true);
    try {
      const { updatedEstimate } = await applyChangeOrder(changeOrderId, estimateId);
      await loadChangeOrders();
      onChangeOrderApplied?.(updatedEstimate.total);
    } catch (error) {
      console.error('Error applying change order:', error);
      alert('Failed to apply change order');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Existing Change Orders */}
      {changeOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Change Orders</CardTitle>
            <CardDescription>Manage scope changes and modifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {changeOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-foreground">{order.title}</h4>
                    <p className="text-sm text-muted-foreground">CO #{order.change_order_number}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'applied'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.description && (
                  <p className="text-sm text-muted-foreground">{order.description}</p>
                )}

                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Amount Change:</p>
                  <p className={`text-lg font-bold ${order.amount_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {order.amount_change >= 0 ? '+' : ''}${order.amount_change.toFixed(2)}
                  </p>
                </div>

                {order.status === 'pending' && (
                  <Button
                    onClick={() => handleApplyChangeOrder(order.id)}
                    disabled={loading}
                    className="w-full"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Apply Change Order
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Create New Change Order */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Create Change Order</CardTitle>
              <CardDescription>Add scope changes or modifications</CardDescription>
            </div>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Change Order
              </Button>
            )}
          </div>
        </CardHeader>

        {isCreating && (
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="co-title">Change Order Title</Label>
              <Input
                id="co-title"
                placeholder="e.g., Additional Electrical Outlets"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="co-description">Description</Label>
              <Textarea
                id="co-description"
                placeholder="Describe the change in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="co-reason">Reason for Change</Label>
              <Input
                id="co-reason"
                placeholder="e.g., Client Request, Scope Creep, etc."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <Label>Line Items</Label>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="col-span-5"
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    className="col-span-2"
                  />
                  <Input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                    className="col-span-2"
                  />
                  <div className="col-span-2 text-right font-bold">${item.amount.toFixed(2)}</div>
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    variant="ghost"
                    size="sm"
                    className="col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={handleAddItem} variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            {/* Total */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total Change:</span>
                <span className={`text-lg font-bold ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalAmount >= 0 ? '+' : ''}${totalAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                New estimate total: ${(currentTotal + totalAmount).toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleCreateChangeOrder} disabled={loading} className="flex-1">
                Create Change Order
              </Button>
              <Button onClick={() => setIsCreating(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChangeOrderManager;

