import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API } from '../../constants/apiURL';

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào bạn! Tôi có thể tư vấn máy tính cho học tập, lập trình, gaming, đồ họa. Bạn cần máy cho mục đích gì?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API.BASE_API_URL}api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply || 'Xin lỗi, tôi chưa thể phản hồi.' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Có lỗi khi kết nối trợ lý. Vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      {!open ? (
        <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
          <Text style={styles.fabText}>💬</Text>
        </TouchableOpacity>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.chatBox}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SieuNhanGear AI</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
            {messages.map((msg, idx) => (
              <View key={idx} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
                <Text style={msg.role === 'user' ? styles.userText : styles.assistantText}>{msg.text}</Text>
              </View>
            ))}
            {loading ? <Text style={styles.loading}>Đang suy nghĩ...</Text> : null}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Nhập câu hỏi về máy tính..."
              placeholderTextColor="#94a3b8"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    zIndex: 9999,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  chatBox: {
    width: 320,
    maxHeight: 460,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerText: {
    color: '#fff',
    fontWeight: '700',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
  },
  messages: {
    maxHeight: 320,
    padding: 10,
  },
  messagesContent: {
    gap: 8,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '85%',
  },
  assistantBubble: {
    backgroundColor: '#f1f5f9',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-end',
  },
  assistantText: {
    color: '#0f172a',
  },
  userText: {
    color: '#1e3a8a',
  },
  inputRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: '700',
  },
  loading: {
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 4,
  },
});