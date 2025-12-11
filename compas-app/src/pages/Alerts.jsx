import { useState } from 'react';
import {
  Box, Text, Badge, VStack, HStack, Flex, Icon, Button, Collapse,
  useDisclosure, SimpleGrid, Progress, Tooltip, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast,
  CircularProgress, CircularProgressLabel
} from '@chakra-ui/react';
import {
  FiAlertTriangle, FiChevronDown, FiChevronUp, FiCpu, FiCheckCircle,
  FiClock, FiShield, FiTrendingUp, FiActivity, FiEye, FiZap,
  FiTarget, FiAlertCircle
} from 'react-icons/fi';
import { alerts } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const severityConfig = {
  critical: { color: '#FF4757', gradient: 'linear(135deg, #FF4757, #FF6B81)', label: 'CRITICAL', glow: '0 0 20px rgba(255,71,87,0.5)' },
  high: { color: '#FFA502', gradient: 'linear(135deg, #FFA502, #FFB732)', label: 'HIGH', glow: '0 0 20px rgba(255,165,2,0.5)' },
  medium: { color: '#FFEAA7', gradient: 'linear(135deg, #FFEAA7, #FDCB6E)', label: 'MEDIUM', glow: '0 0 20px rgba(255,234,167,0.3)' },
  low: { color: '#2ED573', gradient: 'linear(135deg, #2ED573, #7BED9F)', label: 'LOW', glow: '0 0 20px rgba(46,213,115,0.3)' },
};

const statusConfig = {
  open: { color: '#FF4757', icon: FiAlertTriangle, label: 'OPEN' },
  in_progress: { color: '#FFA502', icon: FiClock, label: 'IN PROGRESS' },
  resolved: { color: '#2ED573', icon: FiCheckCircle, label: 'RESOLVED' },
};

const AlertCard = ({ alert, onViewDetails, isDark }) => {
  const { isOpen, onToggle } = useDisclosure();
  const severity = severityConfig[alert.severity] || severityConfig.medium;
  const status = statusConfig[alert.status] || statusConfig.open;

  const glassStyle = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
    boxShadow: isDark ? 'none' : 'md',
  };

  return (
    <Box
      {...glassStyle}
      p={5}
      _hover={{
        bg: isDark ? 'rgba(255,255,255,0.05)' : 'gray.50',
        transform: 'translateY(-2px)',
        boxShadow: isDark ? severity.glow : 'lg',
      }}
      transition="all 0.3s ease"
      cursor="pointer"
    >
      <Flex justify="space-between" align="start" mb={4}>
        <VStack align="start" spacing={2} flex={1}>
          <HStack spacing={2}>
            <Badge
              bgGradient={severity.gradient}
              color="white"
              borderRadius="full"
              px={3}
              py={1}
              fontWeight="bold"
              fontSize="xs"
            >
              {severity.label}
            </Badge>
            <Badge
              bg={isDark ? 'rgba(255,255,255,0.1)' : 'gray.100'}
              color={status.color}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
            >
              <HStack spacing={1}>
                <Icon as={status.icon} boxSize={3} />
                <Text>{status.label}</Text>
              </HStack>
            </Badge>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{alert.title}</Text>
          <Text fontSize="sm" color={isDark ? 'whiteAlpha.700' : 'gray.600'}>{alert.description}</Text>
        </VStack>

        <Tooltip label="AI Confidence Score" hasArrow>
          <Box textAlign="center">
            <CircularProgress
              value={alert.confidence}
              size="60px"
              thickness="8px"
              color={alert.confidence > 80 ? 'green.400' : alert.confidence > 60 ? 'yellow.400' : 'red.400'}
              trackColor={isDark ? 'whiteAlpha.200' : 'gray.100'}
            >
              <CircularProgressLabel color={isDark ? 'white' : 'gray.800'} fontSize="sm" fontWeight="bold">
                {alert.confidence}%
              </CircularProgressLabel>
            </CircularProgress>
            <HStack justify="center" mt={1}>
              <Icon as={FiCpu} color="purple.400" boxSize={3} />
              <Text fontSize="xs" color="purple.400">AI</Text>
            </HStack>
          </Box>
        </Tooltip>
      </Flex>

      <HStack spacing={6} mb={4} flexWrap="wrap">
        <Tooltip label="Affected Entity" hasArrow>
          <HStack
            px={3}
            py={1}
            bg={isDark ? 'rgba(139,92,246,0.2)' : 'purple.50'}
            borderRadius="full"
            cursor="pointer"
            _hover={{ bg: isDark ? 'rgba(139,92,246,0.3)' : 'purple.100' }}
          >
            <Icon as={FiShield} color={isDark ? 'purple.300' : 'purple.500'} boxSize={3} />
            <Text fontSize="xs" color={isDark ? 'purple.200' : 'purple.600'}>{alert.entity}</Text>
          </HStack>
        </Tooltip>
        <Tooltip label="Alert Category" hasArrow>
          <HStack
            px={3}
            py={1}
            bg={isDark ? 'rgba(34,211,238,0.2)' : 'cyan.50'}
            borderRadius="full"
          >
            <Icon as={FiTarget} color={isDark ? 'cyan.300' : 'cyan.600'} boxSize={3} />
            <Text fontSize="xs" color={isDark ? 'cyan.200' : 'cyan.600'}>{alert.category}</Text>
          </HStack>
        </Tooltip>
        <HStack>
          <Icon as={FiClock} color={isDark ? 'whiteAlpha.500' : 'gray.400'} boxSize={3} />
          <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>
            {new Date(alert.timestamp).toLocaleString('id-ID')}
          </Text>
        </HStack>
      </HStack>

      <HStack spacing={2}>
        <Button
          size="sm"
          variant="ghost"
          color={isDark ? 'purple.300' : 'purple.500'}
          _hover={{ bg: isDark ? 'rgba(139,92,246,0.2)' : 'purple.50' }}
          rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
          onClick={onToggle}
        >
          {isOpen ? 'Hide' : 'Show'} AI Analysis
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color={isDark ? 'cyan.300' : 'cyan.600'}
          _hover={{ bg: isDark ? 'rgba(34,211,238,0.2)' : 'cyan.50' }}
          leftIcon={<FiEye />}
          onClick={() => onViewDetails(alert)}
        >
          View Details
        </Button>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <Box
          mt={4}
          p={4}
          bgGradient={isDark ? 'linear(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1))' : 'linear(135deg, purple.50, indigo.50)'}
          borderRadius="xl"
          borderLeft="4px solid"
          borderColor="purple.400"
        >
          <HStack mb={3}>
            <Icon as={FiCpu} color={isDark ? 'purple.300' : 'purple.500'} />
            <Text fontSize="sm" fontWeight="bold" color={isDark ? 'purple.200' : 'purple.600'}>AI Analysis & Recommendation</Text>
          </HStack>
          <Text fontSize="sm" color={isDark ? 'whiteAlpha.800' : 'gray.700'}>{alert.aiExplanation}</Text>

          <HStack mt={3} spacing={2}>
            <Badge bg={isDark ? 'rgba(46,213,115,0.2)' : 'green.50'} color={isDark ? 'green.300' : 'green.600'} fontSize="xs">
              Suggested Action Available
            </Badge>
            <Badge bg={isDark ? 'rgba(34,211,238,0.2)' : 'cyan.50'} color={isDark ? 'cyan.300' : 'cyan.600'} fontSize="xs">
              3 Related SOPs
            </Badge>
          </HStack>
        </Box>
      </Collapse>
    </Box>
  );
};

const StatCard = ({ icon, label, value, color, trend, isDark }) => {
  const glassStyle = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
    boxShadow: isDark ? 'none' : 'md',
  };

  return (
    <Tooltip label={`Click for ${label} details`} hasArrow>
      <Box
        {...glassStyle}
        p={4}
        cursor="pointer"
        _hover={{
          bg: isDark ? 'rgba(255,255,255,0.05)' : 'gray.50',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s"
      >
        <HStack justify="space-between">
          <Box p={2} bg={`${color}20`} borderRadius="lg">
            <Icon as={icon} color={color} boxSize={5} />
          </Box>
          {trend && (
            <HStack spacing={1}>
              <Icon as={FiTrendingUp} color={trend > 0 ? 'red.400' : 'green.400'} boxSize={3} />
              <Text fontSize="xs" color={trend > 0 ? 'red.400' : 'green.400'}>
                {trend > 0 ? '+' : ''}{trend}%
              </Text>
            </HStack>
          )}
        </HStack>
        <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mt={2}>{value}</Text>
        <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>{label}</Text>
      </Box>
    </Tooltip>
  );
};

const AlertDetailModal = ({ alert, isOpen, onClose, isDark }) => {
  const toast = useToast();

  if (!alert) return null;

  const severity = severityConfig[alert.severity] || severityConfig.medium;

  const glassStyle = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'gray.50',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
  };

  const handleAction = (action) => {
    toast({
      title: `Action: ${action}`,
      description: `${action} action initiated for alert ${alert.id}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
      <ModalContent bg={isDark ? '#1A1A2E' : 'white'} border={isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'} borderRadius="2xl">
        <ModalHeader color={isDark ? 'white' : 'gray.800'} borderBottom={isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0'}>
          <HStack>
            <Badge bgGradient={severity.gradient} color="white" px={3} py={1} borderRadius="full">
              {severity.label}
            </Badge>
            <Text>{alert.title}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={isDark ? 'white' : 'gray.600'} />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box {...glassStyle} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={2}>Description</Text>
              <Text color={isDark ? 'white' : 'gray.800'}>{alert.description}</Text>
            </Box>

            <Box {...glassStyle} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={2}>AI Analysis</Text>
              <Text color={isDark ? 'white' : 'gray.800'}>{alert.aiExplanation}</Text>
            </Box>

            <SimpleGrid columns={2} spacing={3}>
              <Box {...glassStyle} p={3}>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>Entity</Text>
                <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{alert.entity}</Text>
              </Box>
              <Box {...glassStyle} p={3}>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>Category</Text>
                <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{alert.category}</Text>
              </Box>
              <Box {...glassStyle} p={3}>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>AI Confidence</Text>
                <Text color="green.400" fontWeight="bold">{alert.confidence}%</Text>
              </Box>
              <Box {...glassStyle} p={3}>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>Detected</Text>
                <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">
                  {new Date(alert.timestamp).toLocaleDateString('id-ID')}
                </Text>
              </Box>
            </SimpleGrid>

            <HStack spacing={2} mt={2}>
              <Button
                flex={1}
                bgGradient="linear(135deg, #6366F1, #8B5CF6)"
                color="white"
                _hover={{ opacity: 0.9 }}
                onClick={() => handleAction('Acknowledge')}
              >
                Acknowledge
              </Button>
              <Button
                flex={1}
                bg={isDark ? 'rgba(46,213,115,0.2)' : 'green.50'}
                color={isDark ? 'green.300' : 'green.600'}
                _hover={{ bg: isDark ? 'rgba(46,213,115,0.3)' : 'green.100' }}
                onClick={() => handleAction('Resolve')}
              >
                Mark Resolved
              </Button>
              <Button
                flex={1}
                bg={isDark ? 'rgba(255,165,2,0.2)' : 'orange.50'}
                color={isDark ? 'orange.300' : 'orange.600'}
                _hover={{ bg: isDark ? 'rgba(255,165,2,0.3)' : 'orange.100' }}
                onClick={() => handleAction('Escalate')}
              >
                Escalate
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Alerts = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const glassStyle = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
    boxShadow: isDark ? 'none' : 'md',
  };

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(a => a.severity === filter);

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const highCount = alerts.filter(a => a.severity === 'high').length;
  const openCount = alerts.filter(a => a.status === 'open').length;
  const resolvedToday = alerts.filter(a => a.status === 'resolved').length;

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    onOpen();
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: alerts.length, color: isDark ? 'whiteAlpha.800' : 'gray.700' },
    { key: 'critical', label: 'Critical', count: criticalCount, color: '#FF4757' },
    { key: 'high', label: 'High', count: highCount, color: '#FFA502' },
    { key: 'medium', label: 'Medium', count: alerts.filter(a => a.severity === 'medium').length, color: isDark ? '#FFEAA7' : '#D69E2E' },
    { key: 'low', label: 'Low', count: alerts.filter(a => a.severity === 'low').length, color: '#2ED573' },
  ];

  return (
    <VStack spacing={6} align="stretch">
      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <StatCard
          icon={FiAlertCircle}
          label="Critical Alerts"
          value={criticalCount}
          color="#FF4757"
          trend={criticalCount > 2 ? 15 : -10}
          isDark={isDark}
        />
        <StatCard
          icon={FiAlertTriangle}
          label="High Priority"
          value={highCount}
          color="#FFA502"
          trend={5}
          isDark={isDark}
        />
        <StatCard
          icon={FiActivity}
          label="Open Alerts"
          value={openCount}
          color="#8B5CF6"
          isDark={isDark}
        />
        <StatCard
          icon={FiCheckCircle}
          label="Resolved Today"
          value={resolvedToday}
          color="#2ED573"
          trend={-20}
          isDark={isDark}
        />
      </SimpleGrid>

      {/* Filter Tabs */}
      <Box {...glassStyle} p={4}>
        <HStack spacing={2} overflowX="auto" pb={2}>
          {filterButtons.map((btn) => (
            <Button
              key={btn.key}
              size="sm"
              bg={filter === btn.key ? (isDark ? 'rgba(139,92,246,0.3)' : 'purple.100') : 'transparent'}
              color={btn.color}
              border="1px solid"
              borderColor={filter === btn.key ? 'purple.400' : 'transparent'}
              _hover={{
                bg: isDark ? 'rgba(139,92,246,0.2)' : 'purple.50',
              }}
              onClick={() => setFilter(btn.key)}
              borderRadius="full"
              px={4}
            >
              {btn.label}
              <Badge
                ml={2}
                bg={isDark ? 'rgba(255,255,255,0.1)' : 'gray.100'}
                color={btn.color}
                borderRadius="full"
                fontSize="xs"
              >
                {btn.count}
              </Badge>
            </Button>
          ))}
        </HStack>

        {/* Alert Priority Distribution */}
        <Box mt={4}>
          <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={2}>Alert Distribution</Text>
          <HStack spacing={0} h="8px" borderRadius="full" overflow="hidden">
            <Tooltip label={`Critical: ${criticalCount}`} hasArrow>
              <Box
                h="full"
                w={`${(criticalCount / alerts.length) * 100}%`}
                bg="#FF4757"
                cursor="pointer"
              />
            </Tooltip>
            <Tooltip label={`High: ${highCount}`} hasArrow>
              <Box
                h="full"
                w={`${(highCount / alerts.length) * 100}%`}
                bg="#FFA502"
                cursor="pointer"
              />
            </Tooltip>
            <Tooltip label={`Medium: ${alerts.filter(a => a.severity === 'medium').length}`} hasArrow>
              <Box
                h="full"
                w={`${(alerts.filter(a => a.severity === 'medium').length / alerts.length) * 100}%`}
                bg="#FFEAA7"
                cursor="pointer"
              />
            </Tooltip>
            <Tooltip label={`Low: ${alerts.filter(a => a.severity === 'low').length}`} hasArrow>
              <Box
                h="full"
                w={`${(alerts.filter(a => a.severity === 'low').length / alerts.length) * 100}%`}
                bg="#2ED573"
                cursor="pointer"
              />
            </Tooltip>
          </HStack>
        </Box>
      </Box>

      {/* Alert Cards */}
      <VStack spacing={4} align="stretch">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onViewDetails={handleViewDetails} isDark={isDark} />
        ))}
      </VStack>

      {filteredAlerts.length === 0 && (
        <Box {...glassStyle} p={8} textAlign="center">
          <Icon as={FiCheckCircle} boxSize={12} color="green.400" mb={4} />
          <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>No alerts in this category</Text>
          <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>All clear! Your compliance is in good shape.</Text>
        </Box>
      )}

      {/* Alert Detail Modal */}
      <AlertDetailModal alert={selectedAlert} isOpen={isOpen} onClose={onClose} isDark={isDark} />
    </VStack>
  );
};

export default Alerts;
