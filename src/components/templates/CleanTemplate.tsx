interface CleanTemplateProps {
  data: any;
}

const CleanTemplate = ({ data }: CleanTemplateProps) => {
  const { business, client, meta, items, totals, notes, accent, watermark } = data;
  
  // Calculate totals
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.rate), 0);
  const taxAmount = (subtotal * (totals.taxRate || 0)) / 100;
  const totalAmount = subtotal + taxAmount + (totals.shipping || 0) - (totals.discount || 0);

  return (
    <div className="p-8 bg-white relative min-h-[11in]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Watermark */}
      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div 
            className="text-8xl font-black opacity-5 transform -rotate-12 select-none"
            style={{ color: accent }}
          >
            DRAFT
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2" style={{ color: accent }}>
            {business.name || "Your Business Name"}
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            {business.email && <div>{business.email}</div>}
            {business.phone && <div>{business.phone}</div>}
            {business.address && <div>{business.address}</div>}
            {business.website && <div>{business.website}</div>}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-bold mb-2" style={{ color: accent }}>
            INVOICE
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Invoice #:</strong> {meta.number}</div>
            <div><strong>Issue Date:</strong> {meta.issueDate}</div>
            {meta.dueDate && <div><strong>Due Date:</strong> {meta.dueDate}</div>}
            <div><strong>Terms:</strong> {meta.terms}</div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3" style={{ color: accent }}>
          Bill To
        </h3>
        <div className="text-sm text-gray-800">
          <div className="font-semibold">{client.name}</div>
          {client.company && <div>{client.company}</div>}
          {client.email && <div>{client.email}</div>}
          {client.address && <div>{client.address}</div>}
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2" style={{ borderColor: accent }}>
              <th className="text-left py-3 font-semibold">Description</th>
              <th className="text-right py-3 font-semibold w-20">Qty</th>
              <th className="text-right py-3 font-semibold w-20">Rate</th>
              <th className="text-right py-3 font-semibold w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-right">{item.qty}</td>
                <td className="py-3 text-right">${item.rate.toFixed(2)}</td>
                <td className="py-3 text-right font-semibold">
                  ${(item.qty * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Notes */}
        <div>
          {notes && (
            <div>
              <h4 className="font-semibold mb-2" style={{ color: accent }}>
                Notes
              </h4>
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          )}
        </div>

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {totals.taxRate > 0 && (
                <div className="flex justify-between">
                  <span>Tax ({totals.taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              {totals.shipping > 0 && (
                <div className="flex justify-between">
                  <span>Shipping/Other:</span>
                  <span>${totals.shipping.toFixed(2)}</span>
                </div>
              )}
              
              {totals.discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-300 pt-2">
                <div className="flex justify-between text-lg font-bold" style={{ color: accent }}>
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanTemplate;