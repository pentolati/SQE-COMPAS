import { useState, useRef, useEffect } from 'react';
import {
  Box, Text, VStack, HStack, Input, Button, Avatar, Badge, Icon, Flex,
  InputGroup, InputRightElement, IconButton, Wrap, WrapItem, Tooltip,
  SimpleGrid, Divider, useToast
} from '@chakra-ui/react';
import {
  FiSend, FiCpu, FiUser, FiBook, FiMessageSquare, FiZap, FiSearch,
  FiFileText, FiHelpCircle, FiAlertTriangle, FiCheckCircle, FiTrendingUp,
  FiDatabase, FiShield, FiClock
} from 'react-icons/fi';
import { chatHistory } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const suggestedQuestions = [
  { text: 'Apa syarat KYC untuk nasabah korporasi?', icon: FiFileText, category: 'KYC' },
  { text: 'Bagaimana prosedur pelaporan OJK quarterly?', icon: FiAlertTriangle, category: 'Reporting' },
  { text: 'Apa batas waktu pembaruan dokumen KYC?', icon: FiClock, category: 'Deadline' },
  { text: 'Jelaskan SOP AML untuk transaksi di atas 100 juta', icon: FiShield, category: 'AML' },
  { text: 'Bagaimana cara menangani suspicious transaction?', icon: FiSearch, category: 'STR' },
  { text: 'Apa saja dokumen wajib untuk onboarding?', icon: FiCheckCircle, category: 'Onboarding' },
];

const quickActions = [
  { label: 'SOP Lookup', icon: FiBook, color: '#8B5CF6', description: 'Search compliance SOPs' },
  { label: 'Risk Check', icon: FiShield, color: '#FF6B9D', description: 'Check entity risk profile' },
  { label: 'Deadline', icon: FiClock, color: '#22D3EE', description: 'View upcoming deadlines' },
  { label: 'Report', icon: FiTrendingUp, color: '#6EE7B7', description: 'Generate compliance report' },
];

const ChatMessage = ({ message, isDark }) => {
  const isUser = message.type === 'user';

  return (
    <Flex justify={isUser ? 'flex-end' : 'flex-start'} w="full" mb={4}>
      <HStack
        align="start"
        spacing={3}
        maxW="85%"
        flexDirection={isUser ? 'row-reverse' : 'row'}
      >
        <Avatar
          size="sm"
          bg={isUser ? 'linear-gradient(135deg, #FF6B9D, #C850C0)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)'}
          icon={isUser ? <FiUser color="white" /> : <FiCpu color="white" />}
        />

        <VStack align={isUser ? 'end' : 'start'} spacing={2}>
          <Box
            bgGradient={isUser
              ? 'linear(135deg, #FF6B9D, #C850C0)'
              : isDark ? 'linear(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))' : 'linear(135deg, #EEF2FF, #E0E7FF)'
            }
            color={isUser ? 'white' : (isDark ? 'white' : 'gray.800')}
            px={4}
            py={3}
            borderRadius="xl"
            borderTopLeftRadius={isUser ? 'xl' : 'sm'}
            borderTopRightRadius={isUser ? 'sm' : 'xl'}
            border={isUser ? 'none' : (isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid #C7D2FE')}
            boxShadow={isUser ? '0 4px 15px rgba(200, 80, 192, 0.3)' : 'none'}
          >
            <Text fontSize="sm" whiteSpace="pre-wrap">{message.message}</Text>
          </Box>

          {!isUser && message.sources && (
            <HStack spacing={2} flexWrap="wrap">
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>Sources:</Text>
              {message.sources.map((source, idx) => (
                <Tooltip key={idx} label={`View ${source}`} hasArrow>
                  <Badge
                    bg={isDark ? 'rgba(139,92,246,0.2)' : 'purple.100'}
                    color={isDark ? 'purple.200' : 'purple.700'}
                    fontSize="xs"
                    cursor="pointer"
                    _hover={{ bg: isDark ? 'rgba(139,92,246,0.3)' : 'purple.200' }}
                  >
                    <HStack spacing={1}>
                      <Icon as={FiBook} boxSize={3} />
                      <Text>{source}</Text>
                    </HStack>
                  </Badge>
                </Tooltip>
              ))}
            </HStack>
          )}

          <Text fontSize="xs" color={isDark ? 'whiteAlpha.400' : 'gray.400'}>
            {new Date(message.timestamp).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

const AIAssistant = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState(chatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const glassStyle = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
    boxShadow: isDark ? 'none' : 'md',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        message: `Terima kasih atas pertanyaan Anda tentang "${inputValue}".

Berdasarkan analisis sistem COMPAS dan database SOP yang tersedia, berikut adalah informasi yang relevan:

**Ringkasan:**
Pertanyaan Anda terkait dengan prosedur compliance yang diatur dalam beberapa SOP dan regulasi.

**Rekomendasi:**
1. Pastikan untuk selalu merujuk pada versi SOP terbaru
2. Konsultasikan dengan Compliance Officer jika ada keraguan
3. Dokumentasikan semua langkah yang diambil

Apakah ada hal lain yang ingin Anda tanyakan?`,
        timestamp: new Date().toISOString(),
        sources: ['SOP-GENERAL-001', 'Compliance Guidelines'],
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  const handleQuickAction = (action) => {
    toast({
      title: action.label,
      description: action.description,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleNewChat = () => {
    setMessages([]);
    toast({
      title: 'New Chat Started',
      description: 'Previous conversation cleared',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Flex h="calc(100vh - 200px)" direction="column" gap={4}>
      {/* Header with Quick Actions */}
      <Box {...glassStyle} p={4}>
        <HStack justify="space-between" mb={4}>
          <HStack spacing={3}>
            <Box
              w="48px"
              h="48px"
              bgGradient="linear(135deg, #6366F1, #8B5CF6)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 4px 15px rgba(99,102,241,0.4)"
            >
              <Icon as={FiCpu} color="white" boxSize={6} />
            </Box>
            <VStack align="start" spacing={0}>
              <HStack>
                <Text fontWeight="bold" color={isDark ? 'white' : 'gray.800'} fontSize="lg">COMPAS Assistant</Text>
                <Badge
                  bgGradient="linear(135deg, #22D3EE, #6EE7B7)"
                  color="gray.800"
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                >
                  Online
                </Badge>
              </HStack>
              <HStack spacing={2}>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>Bahasa Indonesia supported</Text>
              </HStack>
            </VStack>
          </HStack>
          <Button
            size="sm"
            leftIcon={<FiMessageSquare />}
            bgGradient="linear(135deg, #6366F1, #8B5CF6)"
            color="white"
            _hover={{ opacity: 0.9 }}
            onClick={handleNewChat}
          >
            New Chat
          </Button>
        </HStack>

        {/* Quick Actions */}
        <SimpleGrid columns={4} spacing={3}>
          {quickActions.map((action) => (
            <Tooltip key={action.label} label={action.description} hasArrow>
              <Box
                p={3}
                bg={isDark ? 'rgba(255,255,255,0.03)' : 'gray.50'}
                borderRadius="xl"
                border={isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0'}
                cursor="pointer"
                _hover={{
                  bg: isDark ? 'rgba(255,255,255,0.06)' : 'gray.100',
                  transform: 'translateY(-2px)',
                  borderColor: action.color,
                }}
                transition="all 0.2s"
                onClick={() => handleQuickAction(action)}
              >
                <VStack spacing={2}>
                  <Box p={2} bg={`${action.color}20`} borderRadius="lg">
                    <Icon as={action.icon} color={action.color} boxSize={5} />
                  </Box>
                  <Text fontSize="xs" color={isDark ? 'whiteAlpha.700' : 'gray.600'} fontWeight="medium">
                    {action.label}
                  </Text>
                </VStack>
              </Box>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Box>

      {/* Chat Area */}
      <Box {...glassStyle} flex={1} overflow="hidden" display="flex" flexDirection="column">
        {/* Messages */}
        <Box flex={1} overflowY="auto" p={4}>
          {messages.length === 0 && (
            <VStack spacing={6} py={8}>
              <Box
                w="80px"
                h="80px"
                bgGradient="linear(135deg, #6366F1, #8B5CF6)"
                borderRadius="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 8px 30px rgba(99,102,241,0.4)"
              >
                <Icon as={FiZap} color="white" boxSize={10} />
              </Box>
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
                  Hi! Saya COMPAS Assistant
                </Text>
                <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} textAlign="center" maxW="400px">
                  Asisten cerdas untuk semua pertanyaan compliance, SOP, dan regulasi.
                  Coba tanyakan sesuatu atau pilih topik di bawah.
                </Text>
              </VStack>

              <Divider borderColor={isDark ? 'whiteAlpha.100' : 'gray.200'} w="60%" />

              <SimpleGrid columns={2} spacing={3} w="full" maxW="500px">
                {suggestedQuestions.slice(0, 4).map((q, idx) => (
                  <Box
                    key={idx}
                    p={3}
                    bg={isDark ? 'rgba(255,255,255,0.03)' : 'gray.50'}
                    borderRadius="xl"
                    border={isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0'}
                    cursor="pointer"
                    _hover={{
                      bg: isDark ? 'rgba(139,92,246,0.1)' : 'purple.50',
                      borderColor: 'purple.400',
                    }}
                    transition="all 0.2s"
                    onClick={() => handleSuggestedQuestion(q.text)}
                  >
                    <HStack spacing={2}>
                      <Icon as={q.icon} color={isDark ? 'purple.300' : 'purple.500'} boxSize={4} />
                      <VStack align="start" spacing={0}>
                        <Badge
                          bg={isDark ? 'rgba(139,92,246,0.2)' : 'purple.100'}
                          color={isDark ? 'purple.200' : 'purple.700'}
                          fontSize="xs"
                          mb={1}
                        >
                          {q.category}
                        </Badge>
                        <Text fontSize="xs" color={isDark ? 'whiteAlpha.700' : 'gray.600'} noOfLines={2}>
                          {q.text}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isDark={isDark} />
          ))}

          {isLoading && (
            <Flex justify="flex-start" w="full" mb={4}>
              <HStack align="start" spacing={3}>
                <Avatar
                  size="sm"
                  bgGradient="linear(135deg, #6366F1, #8B5CF6)"
                  icon={<FiCpu color="white" />}
                />
                <Box
                  bgGradient={isDark ? 'linear(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))' : 'linear(135deg, #EEF2FF, #E0E7FF)'}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  borderTopLeftRadius="sm"
                  border={isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid #C7D2FE'}
                >
                  <HStack spacing={2}>
                    <Box w="8px" h="8px" bg="purple.400" borderRadius="full" animation="pulse 1s infinite" />
                    <Box w="8px" h="8px" bg="purple.400" borderRadius="full" animation="pulse 1s infinite 0.2s" />
                    <Box w="8px" h="8px" bg="purple.400" borderRadius="full" animation="pulse 1s infinite 0.4s" />
                    <Text fontSize="sm" color={isDark ? 'purple.200' : 'purple.600'} ml={2}>Sedang menganalisis...</Text>
                  </HStack>
                </Box>
              </HStack>
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Suggested Questions */}
        {messages.length > 0 && (
          <Box px={4} py={2} borderTop={isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0'}>
            <Wrap spacing={2} align="center">
              <WrapItem>
                <HStack>
                  <Icon as={FiHelpCircle} color={isDark ? 'whiteAlpha.500' : 'gray.400'} boxSize={3} />
                  <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>Suggestions:</Text>
                </HStack>
              </WrapItem>
              {suggestedQuestions.slice(0, 3).map((q, idx) => (
                <WrapItem key={idx}>
                  <Button
                    size="xs"
                    variant="ghost"
                    color={isDark ? 'purple.300' : 'purple.600'}
                    _hover={{ bg: isDark ? 'rgba(139,92,246,0.2)' : 'purple.50' }}
                    onClick={() => handleSuggestedQuestion(q.text)}
                    leftIcon={<Icon as={q.icon} boxSize={3} />}
                  >
                    {q.category}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        {/* Input Area */}
        <Box p={4} borderTop={isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0'} bg={isDark ? 'rgba(0,0,0,0.2)' : 'gray.50'}>
          <InputGroup size="lg">
            <Input
              placeholder="Tanyakan tentang compliance, SOP, atau regulasi..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              bg={isDark ? 'rgba(255,255,255,0.05)' : 'white'}
              border={isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0'}
              borderRadius="xl"
              color={isDark ? 'white' : 'gray.800'}
              pr="4.5rem"
              _placeholder={{ color: isDark ? 'whiteAlpha.400' : 'gray.400' }}
              _focus={{
                borderColor: 'purple.400',
                boxShadow: '0 0 0 1px rgba(139,92,246,0.5)',
                bg: isDark ? 'rgba(255,255,255,0.08)' : 'white',
              }}
              _hover={{
                borderColor: isDark ? 'whiteAlpha.300' : 'gray.300',
              }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                bgGradient="linear(135deg, #6366F1, #8B5CF6)"
                color="white"
                icon={<FiSend />}
                onClick={handleSendMessage}
                isLoading={isLoading}
                aria-label="Send message"
                borderRadius="lg"
                _hover={{ bgGradient: 'linear(135deg, #5558E3, #7C4FE8)' }}
              />
            </InputRightElement>
          </InputGroup>
          <HStack justify="center" mt={2} spacing={4}>
            <HStack>
              <Icon as={FiDatabase} color={isDark ? 'whiteAlpha.400' : 'gray.400'} boxSize={3} />
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.400' : 'gray.400'}>
                Powered by SOP Database
              </Text>
            </HStack>
            <Text fontSize="xs" color={isDark ? 'whiteAlpha.300' : 'gray.300'}>|</Text>
            <Text fontSize="xs" color={isDark ? 'whiteAlpha.400' : 'gray.400'}>
              Selalu verifikasi dengan Compliance Officer
            </Text>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default AIAssistant;
