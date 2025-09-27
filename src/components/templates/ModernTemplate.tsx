interface ModernTemplateProps {
  data: any;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { business, client, meta, items, totals, notes, accent, watermark } = data;
  
  // Calculate totals
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.qty * item.rate), 0);
  const taxAmount = (subtotal * (totals.taxRate || 0)) / 100;
  const totalAmount = subtotal + taxAmount + (totals.shipping || 0) - (totals.discount || 0);

  return (
    <div className="bg-white relative min-h-[11in]" style={{ fontFamily: "'Inter', sans-serif" }}>
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

      {/* Header with colored band */}
      <div className="h-24 flex items-center px-8" style={{ backgroundColor: accent }}>
        <div className="flex justify-between items-center w-full text-white">
          <div>
            <h1 className="text-2xl font-bold">
              {business.name || "Your Business Name"}
            </h1>
            <div className="text-sm opacity-90">{business.email}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">INVOICE</div>
            <div className="text-sm opacity-90">#{meta.number}</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Business and Invoice Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">From</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="font-semibold text-gray-800">{business.name || "Your Business"}</div>
              {business.phone && <div>{business.phone}</div>}
              {business.address && <div>{business.address}</div>}
              {business.website && <div>{business.website}</div>}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Invoice Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Issue Date:</strong> {meta.issueDate}</div>
              {meta.dueDate && <div><strong>Due Date:</strong> {meta.dueDate}</div>}
              <div><strong>Payment Terms:</strong> {meta.terms}</div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <div className="border-l-4 pl-4" style={{ borderColor: accent }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: accent }}>
              Bill To
            </h3>
            <div className="text-sm text-gray-800">
              <div className="font-semibold text-lg">{client.name}</div>
              {client.company && <div className="text-gray-600">{client.company}</div>}
              {client.email && <div className="text-gray-600">{client.email}</div>}
              {client.address && <div className="text-gray-600 mt-1">{client.address}</div>}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="text-white" style={{ backgroundColor: accent }}>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-center py-3 px-4 font-semibold w-20">Qty</th>
                <th className="text-right py-3 px-4 font-semibold w-20">Rate</th>
                <th className="text-right py-3 px-4 font-semibold w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-center">{item.qty}</td>
                  <td className="py-3 px-4 text-right">${item.rate.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-semibold">
                    ${(item.qty * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Notes */}
          <div className="col-span-2">
            {notes && (
              <div>
                <h4 className="font-semibold mb-2" style={{ color: accent }}>
                  Notes & Terms
                </h4>
                <div className="text-sm text-gray-600 whitespace-pre-wrap border-l-2 pl-4" style={{ borderColor: accent }}>
                  {notes}
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div>
            <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: accent }}>
              <div className="text-white py-2 px-4 font-semibold" style={{ backgroundColor: accent }}>
                Summary
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {totals.taxRate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax ({totals.taxRate}%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                )}
                
                {totals.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>${totals.shipping.toFixed(2)}</span>
                  </div>
                )}
                
                {totals.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span>-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t-2 pt-2" style={{ borderColor: accent }}>
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
    </div>
  );
};

export default ModernTemplate;