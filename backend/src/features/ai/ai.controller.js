const axios = require('axios');

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn máy tính cho cửa hàng SieuNhanGear. Hãy trả lời ngắn gọn, thân thiện và hữu ích. Khi người dùng hỏi về máy tính, hãy ưu tiên gợi ý sản phẩm phù hợp theo mục đích: học tập, lập trình, văn phòng, gaming, đồ họa, doanh nhân. Nếu không chắc, hãy hỏi thêm 1-2 thông tin như ngân sách, mục đích dùng, độ phân giải, và thời lượng pin. Không nói rằng bạn là AI. Chỉ trả lời bằng tiếng Việt.`;

// Fallback responses khi API không khả dụng
const FALLBACK_RESPONSES = {
  gaming: "Để gaming, bạn có thể chọn:\n• Laptop Gaming RTX 4070 Ti (39.9M đ) - hiệu năng mạnh\n• PC Gaming RTX 4070 Ti (39.9M đ)\n• Laptop ASUS ROG Strix G16 (35.9M đ)\nNgân sách của bạn là bao nhiêu?",
  laptop: "Chúng tôi có:\n• Laptop ASUS ROG Strix G16 (35.9M đ) - Gaming\n• Laptop Dell XPS 13 Plus (42.9M đ) - Văn phòng/Lập trình\n• Laptop MacBook Pro 14 M3 (49.9M đ) - Đồ họa/Lập trình\nBạn dùng cho mục đích nào?",
  cpu: "CPU Intel Core i9-14900K (14.9M đ) - hiệu năng cao nhất. Bạn cần CPU cho build PC hay máy tính gì?",
  ram: "RAM Kingston Fury 32GB DDR5 (3.8M đ) - tốc độ cao. Cần RAM bao nhiêu GB?",
  ssd: "SSD Samsung 990 Pro 1TB (3.4M đ) - tốc độ NVMe nhanh. Bạn cần dung lượng bao nhiêu?",
  mouse: "Chuột Logitech G Pro X Superlight (2.9M đ) - chuyên gaming. Loại chuột nào phù hợp với bạn?",
  keyboard: "Bàn phím Keychron K8 Pro (2.5M đ) - wireless, gõ mêm. Bạn thích bàn phím cơ hay không?",
  headset: "Tai nghe HyperX Cloud III (2.5M đ) - âm thanh rõ ràng. Bạn dùng tai nghe cho gaming hay âm nhạc?",
  monitor: "Màn hình LG UltraGear 27GP850 (7.9M đ) - 144Hz gaming. Kích thước màn hình yêu cầu?",
  pc: "PC Gaming RTX 4070 Ti (39.9M đ) - hiệu năng tối đa. Ngân sách hoặc mục đích dùng của bạn là gì?",
  default: "Xin chào! Tôi là trợ lý tư vấn máy tính SieuNhanGear. Bạn cần tư vấn máy tính cho mục đích gì? (gaming, học tập, lập trình, đồ họa, văn phòng?)"
};

function getFallbackResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  // Check keywords
  for (const [keyword, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (keyword !== 'default' && lowerMsg.includes(keyword)) {
      return response;
    }
  }
  
  return FALLBACK_RESPONSES.default;
}

async function chatWithAssistant(req, res) {
  try {
    const { message } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'message is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.log('GROQ_API_KEY not configured, using fallback');
      return res.json({ reply: getFallbackResponse(message) });
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 250,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content?.trim();
    return res.json({ reply: reply || getFallbackResponse(message) });
  } catch (error) {
    console.error('AI chat error:', {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data
    });
    
    // If Groq API fails, use fallback
    const userMessage = req.body?.message || '';
    return res.json({ reply: getFallbackResponse(userMessage) });
  }
}

module.exports = { chatWithAssistant };