interface TradesTemplateProps {
  data: any;
}

const TradesTemplate = ({ data }: TradesTemplateProps) => {
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
      <div className="border-4 border-black p-4 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2" style={{ color: accent }}>
              {business.name || "YOUR BUSINESS"}
            </h1>
            <div className="text-sm font-bold space-y-1">
              {business.phone && <div>📞 {business.phone}</div>}
              {business.email && <div>✉️ {business.email}</div>}
              {business.website && <div>🌐 {business.website}</div>}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-5xl font-black" style={{ color: accent }}>
              INVOICE
            </div>
            <div className="text-xl font-bold mt-2">#{meta.number}</div>
          </div>
        </div>
        
        {business.address && (
          <div className="text-sm font-semibold mt-4 border-t-2 border-black pt-2">
            📍 {business.address}
          </div>
        )}
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-2 border-black p-4">
          <h3 className="text-xl font-black mb-3 bg-black text-white px-2 py-1 inline-block">
            BILL TO
          </h3>
          <div className="text-sm font-semibold space-y-1">
            <div className="text-lg font-black">{client.name}</div>
            {client.company && <div>{client.company}</div>}
            {client.email && <div>{client.email}</div>}
            {client.address && <div>{client.address}</div>}
          </div>
        </div>
        
        <div className="border-2 border-black p-4">
          <h3 className="text-xl font-black mb-3 bg-black text-white px-2 py-1 inline-block">
            DETAILS
          </h3>
          <div className="text-sm font-semibold space-y-1">
            <div><strong>ISSUE DATE:</strong> {meta.issueDate}</div>
            {meta.dueDate && <div><strong>DUE DATE:</strong> {meta.dueDate}</div>}
            <div><strong>TERMS:</strong> {meta.terms}</div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full border-4 border-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left py-4 px-4 font-black text-lg">DESCRIPTION</th>
              <th className="text-center py-4 px-4 font-black text-lg w-20">QTY</th>
              <th className="text-right py-4 px-4 font-black text-lg w-20">RATE</th>
              <th className="text-right py-4 px-4 font-black text-lg w-24">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => (
              <tr key={index} className="border-b-2 border-black">
                <td className="py-4 px-4 font-semibold">{item.description}</td>
                <td className="py-4 px-4 text-center font-bold">{item.qty}</td>
                <td className="py-4 px-4 text-right font-bold">${item.rate.toFixed(2)}</td>
                <td className="py-4 px-4 text-right font-black text-lg">
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
            <div className="border-2 border-black p-4">
              <h4 className="font-black text-lg mb-2 bg-black text-white px-2 py-1 inline-block">
                NOTES
              </h4>
              <div className="text-sm font-semibold whitespace-pre-wrap">
                {notes}
              </div>
            </div>
          )}
        </div>

        {/* Totals */}
        <div>
          <div className="border-4 border-black bg-gray-100">
            <div className="bg-black text-white py-3 px-4">
              <h4 className="font-black text-xl">TOTAL DUE</h4>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between font-bold">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {totals.taxRate > 0 && (
                <div className="flex justify-between font-bold">
                  <span>TAX ({totals.taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              {totals.shipping > 0 && (
                <div className="flex justify-between font-bold">
                  <span>SHIPPING:</span>
                  <span>${totals.shipping.toFixed(2)}</span>
                </div>
              )}
              
              {totals.discount > 0 && (
                <div className="flex justify-between font-bold">
                  <span>DISCOUNT:</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t-4 border-black pt-3">
                <div className="flex justify-between text-2xl font-black" style={{ color: accent }}>
                  <span>TOTAL:</span>
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

export default TradesTemplate;