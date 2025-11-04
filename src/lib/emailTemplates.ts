/**
 * Email templates for contractor bid-to-invoice workflow
 * Used for deposit notifications, invoice creation, and payment reminders
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const getDepositReceivedEmail = (options: {
  clientName: string;
  businessName: string;
  estimateNumber: string;
  depositAmount: number;
  totalAmount: number;
  projectDescription?: string;
  paymentLink?: string;
}): EmailTemplate => {
  const {
    clientName,
    businessName,
    estimateNumber,
    depositAmount,
    totalAmount,
    projectDescription,
    paymentLink,
  } = options;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .amount { font-size: 24px; font-weight: bold; color: #667eea; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Deposit Received!</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            
            <p>Thank you! We've received your deposit for estimate <strong>#${estimateNumber}</strong>.</p>
            
            <div style="background: white; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p><strong>Deposit Amount:</strong> <span class="amount">$${(depositAmount / 100).toFixed(2)}</span></p>
              <p><strong>Total Project Amount:</strong> $${(totalAmount / 100).toFixed(2)}</p>
              ${projectDescription ? `<p><strong>Project:</strong> ${projectDescription}</p>` : ''}
            </div>
            
            <p>Your project is now scheduled and we'll begin work shortly. We'll keep you updated on progress every step of the way.</p>
            
            <p>If you have any questions, feel free to reach out!</p>
            
            <p>Best regards,<br><strong>${businessName}</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Deposit Received!

Hi ${clientName},

Thank you! We've received your deposit for estimate #${estimateNumber}.

Deposit Amount: $${(depositAmount / 100).toFixed(2)}
Total Project Amount: $${(totalAmount / 100).toFixed(2)}
${projectDescription ? `Project: ${projectDescription}` : ''}

Your project is now scheduled and we'll begin work shortly. We'll keep you updated on progress every step of the way.

If you have any questions, feel free to reach out!

Best regards,
${businessName}
  `;

  return {
    subject: `Deposit Received - Estimate #${estimateNumber}`,
    html,
    text,
  };
};

export const getInvoiceCreatedEmail = (options: {
  clientName: string;
  businessName: string;
  invoiceNumber: string;
  invoiceAmount: number;
  dueDate?: string;
  paymentLink?: string;
  projectDescription?: string;
}): EmailTemplate => {
  const {
    clientName,
    businessName,
    invoiceNumber,
    invoiceAmount,
    dueDate,
    paymentLink,
    projectDescription,
  } = options;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .amount { font-size: 24px; font-weight: bold; color: #667eea; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Invoice Ready</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            
            <p>Your invoice for the completed work is ready!</p>
            
            <div style="background: white; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
              <p><strong>Amount Due:</strong> <span class="amount">$${(invoiceAmount / 100).toFixed(2)}</span></p>
              ${dueDate ? `<p><strong>Due Date:</strong> ${dueDate}</p>` : ''}
              ${projectDescription ? `<p><strong>Project:</strong> ${projectDescription}</p>` : ''}
            </div>
            
            ${paymentLink ? `
              <p>You can pay online using the link below:</p>
              <a href="${paymentLink}" class="button">Pay Now</a>
            ` : ''}
            
            <p>Thank you for your business!</p>
            
            <p>Best regards,<br><strong>${businessName}</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Invoice Ready

Hi ${clientName},

Your invoice for the completed work is ready!

Invoice Number: ${invoiceNumber}
Amount Due: $${(invoiceAmount / 100).toFixed(2)}
${dueDate ? `Due Date: ${dueDate}` : ''}
${projectDescription ? `Project: ${projectDescription}` : ''}

${paymentLink ? `Pay online: ${paymentLink}` : ''}

Thank you for your business!

Best regards,
${businessName}
  `;

  return {
    subject: `Invoice #${invoiceNumber} - Payment Due`,
    html,
    text,
  };
};

export const getMilestonePaymentEmail = (options: {
  clientName: string;
  businessName: string;
  milestoneNumber: number;
  milestoneDescription: string;
  milestoneAmount: number;
  dueDate?: string;
  paymentLink?: string;
}): EmailTemplate => {
  const {
    clientName,
    businessName,
    milestoneNumber,
    milestoneDescription,
    milestoneAmount,
    dueDate,
    paymentLink,
  } = options;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .amount { font-size: 24px; font-weight: bold; color: #667eea; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Milestone Payment Due</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            
            <p>Milestone ${milestoneNumber} of your project is complete and ready for payment.</p>
            
            <div style="background: white; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p><strong>Milestone:</strong> ${milestoneDescription}</p>
              <p><strong>Amount Due:</strong> <span class="amount">$${(milestoneAmount / 100).toFixed(2)}</span></p>
              ${dueDate ? `<p><strong>Due Date:</strong> ${dueDate}</p>` : ''}
            </div>
            
            ${paymentLink ? `
              <p>You can pay online using the link below:</p>
              <a href="${paymentLink}" class="button">Pay Now</a>
            ` : ''}
            
            <p>Thank you for your continued business!</p>
            
            <p>Best regards,<br><strong>${businessName}</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Milestone Payment Due

Hi ${clientName},

Milestone ${milestoneNumber} of your project is complete and ready for payment.

Milestone: ${milestoneDescription}
Amount Due: $${(milestoneAmount / 100).toFixed(2)}
${dueDate ? `Due Date: ${dueDate}` : ''}

${paymentLink ? `Pay online: ${paymentLink}` : ''}

Thank you for your continued business!

Best regards,
${businessName}
  `;

  return {
    subject: `Milestone ${milestoneNumber} Payment Due - $${(milestoneAmount / 100).toFixed(2)}`,
    html,
    text,
  };
};

