import { Paperclip } from '@tamagui/lucide-icons';
import colors from 'mobile/constant/colors';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../tamagui.config';

// ─────────────────────────────────────────────
//  DUMMY DATA  (replace with real data later)
// ─────────────────────────────────────────────
const MY_ID = 'user_1';

const DUMMY_MESSAGES = [
  {
    id: '1',
    senderId: 'user_2',
    text: 'Hey! How are you doing? 👋',
    timestamp: '10:00 AM',
    status: 'read',
  },
  {
    id: '2',
    senderId: 'user_1',
    text: 'I am great! Just working on a new project 🚀',
    timestamp: '10:01 AM',
    status: 'read',
  },
  {
    id: '3',
    senderId: 'user_2',
    text: 'That sounds exciting! What kind of project?',
    timestamp: '10:02 AM',
    status: 'read',
  },
  {
    id: '4',
    senderId: 'user_1',
    text: 'A chat app in React Native 😄',
    timestamp: '10:03 AM',
    status: 'read',
  },
  {
    id: '5',
    senderId: 'user_2',
    text: 'Oh wow! That is so cool. Let me know if you need any help with it!',
    timestamp: '10:05 AM',
    status: 'read',
  },
  {
    id: '6',
    senderId: 'user_1',
    text: 'Thanks a lot! Will do 🙏',
    timestamp: '10:06 AM',
    status: 'delivered',
  },
];

// ─────────────────────────────────────────────
//  HEADER COMPONENT
// ─────────────────────────────────────────────
const ChatHeader = ({ name, avatar, isOnline, onBack }) => (
  <View style={styles.header}>
    {/* Back Button */}
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backArrow}>‹</Text>
    </TouchableOpacity>

    {/* Avatar + Online Dot */}
    <View style={styles.avatarWrapper}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      {isOnline && <View style={styles.onlineDot} />}
    </View>

    {/* Name + Status */}
    <View style={styles.headerInfo}>
      <Text style={styles.headerName}>{name}</Text>
      <Text style={styles.headerStatus}>{isOnline ? 'Online' : 'Offline'}</Text>
    </View>

    {/* Right Icons */}
    <View style={styles.headerIcons}>
      <TouchableOpacity style={styles.iconBtn}>
        <Text style={styles.iconText}>📞</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn}>
        <Text style={styles.iconText}>⋮</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─────────────────────────────────────────────
//  MESSAGE BUBBLE COMPONENT
// ─────────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const isMe = message.senderId === MY_ID;

  // Status tick logic
  const getStatus = (status) => {
    if (!isMe) return null;
    if (status === 'sent') return <Text style={styles.tick}>✓</Text>;
    if (status === 'delivered') return <Text style={styles.tick}>✓✓</Text>;
    if (status === 'read')
      return <Text style={[styles.tick, styles.tickRead]}>✓✓</Text>;
    return null;
  };

  return (
    <View
      style={[
        styles.bubbleRow,
        isMe ? styles.bubbleRowRight : styles.bubbleRowLeft,
      ]}
    >
      <View
        style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}
      >
        <Text
          style={[styles.bubbleText, isMe ? styles.myText : styles.theirText]}
        >
          {message.text}
        </Text>
        <View style={styles.bubbleMeta}>
          <Text
            style={[
              styles.timestamp,
              isMe ? styles.myTimestamp : styles.theirTimestamp,
            ]}
          >
            {message.timestamp}
          </Text>
          {getStatus(message.status)}
        </View>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────
//  INPUT BAR COMPONENT
// ─────────────────────────────────────────────
const InputBar = ({ value, onChangeText, onSend }) => {
  const isEmpty = value.trim().length === 0;

  return (
    <View style={{flexDirection:'row'}}>
      <View style={styles.inputBar}>
        {/* Attachment Button */}
        <TouchableOpacity style={styles.attachBtn}>
          {/* <Text style={styles.attachIcon}>📎</Text> */}
          <Paperclip size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Type a message..."
          placeholderTextColor="#A0A0A0"
          multiline
          maxLength={500}
        />
  <TouchableOpacity
          style={[styles.sendBtn, isEmpty && styles.sendBtnDisabled]}
          onPress={onSend}
          disabled={isEmpty}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
     
       
      </View>
     
    </View>
  );
};

// ─────────────────────────────────────────────
//  MAIN CHAT SCREEN
// ─────────────────────────────────────────────
const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  // Send a message
  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(), // temp ID
      senderId: MY_ID,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMessage]); // add to bottom
    setInputText(''); // clear input

    // Scroll to bottom after new message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Scroll to bottom when screen loads
  const handleLayout = () => {
    flatListRef.current?.scrollToEnd({ animated: false });
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* PART 1 — HEADER */}
        <ChatHeader
          name="Priya Sharma"
          avatar="https://i.pravatar.cc/100?img=47"
          isOnline={true}
          onBack={() => navigation?.goBack()}
        />

        {/* PART 2 — MESSAGE LIST + INPUT wrapped in KeyboardAvoidingView */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* MESSAGE LIST */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
            onLayout={handleLayout}
          />

          {/* PART 3 — INPUT BAR */}
          <InputBar
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSend}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TamaguiProvider>
  );
};

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────
const COLORS = {
  primary: '#0084FF', // my bubble color (blue)
  primaryLight: '#E7F3FF', // light version
  surface: '#FFFFFF',
  background: '#F5F7FA',
  border: '#E8ECF0',
  textDark: '#1A1A2E',
  textMid: '#6B7280',
  textLight: '#A0A0A0',
  online: '#22C55E',
  headerBg: '#FFFFFF',
  theirBubble: '#FFFFFF',
  myBubble: '#0084FF',
};

const styles = StyleSheet.create({
  // ── Layout ──────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // ── Header ──────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    padding: 4,
    marginRight: 4,
  },
  backArrow: {
    fontSize: 32,
    color: COLORS.primary,
    lineHeight: 34,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.border,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  headerStatus: {
    fontSize: 12,
    color: COLORS.online,
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    padding: 6,
  },
  iconText: {
    fontSize: 18,
  },

  // ── Message List ─────────────────────────
  messageList: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },

  // ── Bubble ───────────────────────────────
  bubbleRow: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  bubbleRowLeft: {
    justifyContent: 'flex-start', // other person → left side
  },
  bubbleRowRight: {
    justifyContent: 'flex-end', // me → right side
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  myBubble: {
    backgroundColor: COLORS.myBubble,
    borderBottomRightRadius: 4, // the "tail" corner
  },
  theirBubble: {
    backgroundColor: COLORS.theirBubble,
    borderBottomLeftRadius: 4, // the "tail" corner
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 21,
  },
  myText: {
    color: '#FFFFFF',
  },
  theirText: {
    color: COLORS.textDark,
  },
  bubbleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 3,
  },
  timestamp: {
    fontSize: 10,
  },
  myTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  theirTimestamp: {
    color: COLORS.textLight,
  },
  tick: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  tickRead: {
    color: '#A8D8FF',
  },

  // ── Input Bar ────────────────────────────
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 20,
    gap: 6,
    margin: 10,
    borderRadius: 100,
    flex:1
  },
  attachBtn: {
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  attachIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray3,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: COLORS.textDark,
    maxHeight: 100, // multiline grows up to this
    // borderWidth: 1,
    // borderColor: colors.black,
  },
  emojiBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: 20,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // elevation:20,
    // marginRight:10
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  sendIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 2,
  },
});

export default ChatScreen;
