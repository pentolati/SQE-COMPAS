import { useState } from 'react';
import {
  Box, SimpleGrid, Text, Grid, Badge, Progress, Flex, VStack, HStack, Icon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, Tooltip, CircularProgress, CircularProgressLabel
} from '@chakra-ui/react';
import {
  FiTrendingUp, FiTrendingDown, FiAlertTriangle, FiDollarSign, FiCalendar,
  FiShield, FiUsers, FiTarget, FiCheckCircle, FiClock, FiArrowRight
} from 'react-icons/fi';
import { entities, riskHeatmap, alerts, deadlines, executiveMetrics } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

// Format currency
const formatCurrency = (value) => {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}M`;
  return `Rp ${value.toLocaleString('id-ID')}`;
};

// Executive KPI Card
const KPICard = ({ icon, label, value, subValue, trend, trendDirection, color, onClick, isDark }) => {
  const glassCard = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: '2xl',
    boxShadow: isDark ? 'none' : 'lg',
  };

  return (
    <Box
      {...glassCard}
      p={6}
      cursor="pointer"
      onClick={onClick}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: isDark
          ? `0 20px 40px rgba(${color === 'pink' ? '255,107,157' : color === 'cyan' ? '34,211,238' : color === 'purple' ? '139,92,246' : '110,231,183'},0.2)`
          : 'xl',
        border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #CBD5E1',
      }}
      transition="all 0.3s ease"
    >
      <HStack justify="space-between" mb={4}>
        <Box
          p={3}
          borderRadius="xl"
          bgGradient={`linear(135deg, ${color === 'pink' ? '#FF6B9D, #C850C0' : color === 'cyan' ? '#22D3EE, #6EE7B7' : color === 'purple' ? '#8B5CF6, #6366F1' : '#F59E0B, #EF4444'})`}
          boxShadow={`0 4px 15px rgba(${color === 'pink' ? '200,80,192' : color === 'cyan' ? '34,211,238' : '139,92,246'},0.3)`}
        >
          <Icon as={icon} boxSize={6} color="white" />
        </Box>
        {trend && (
          <HStack
            spacing={1}
            px={2}
            py={1}
            borderRadius="full"
            bg={trendDirection === 'up'
              ? (isDark ? 'rgba(110,231,183,0.2)' : 'green.50')
              : (isDark ? 'rgba(248,113,113,0.2)' : 'red.50')}
          >
            <Icon
              as={trendDirection === 'up' ? FiTrendingUp : FiTrendingDown}
              color={trendDirection === 'up' ? (isDark ? '#6EE7B7' : 'green.500') : (isDark ? '#F87171' : 'red.500')}
              boxSize={3}
            />
            <Text fontSize="xs" fontWeight="bold" color={trendDirection === 'up' ? (isDark ? '#6EE7B7' : 'green.500') : (isDark ? '#F87171' : 'red.500')}>
              {trend}
            </Text>
          </HStack>
        )}
      </HStack>
      <Text fontSize="3xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mb={1}>{value}</Text>
      <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>{label}</Text>
      {subValue && <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} mt={1}>{subValue}</Text>}
    </Box>
  );
};

// Risk Cell with hover detail
const RiskCell = ({ level, details, onClick, isDark }) => {
  const config = {
    low: {
      bg: isDark ? 'rgba(110,231,183,0.2)' : 'green.50',
      color: isDark ? '#6EE7B7' : 'green.600',
      border: isDark ? 'rgba(110,231,183,0.4)' : 'green.200'
    },
    medium: {
      bg: isDark ? 'rgba(251,191,36,0.2)' : 'yellow.50',
      color: isDark ? '#FBBF24' : 'yellow.600',
      border: isDark ? 'rgba(251,191,36,0.4)' : 'yellow.200'
    },
    high: {
      bg: isDark ? 'rgba(248,113,113,0.2)' : 'red.50',
      color: isDark ? '#F87171' : 'red.600',
      border: isDark ? 'rgba(248,113,113,0.4)' : 'red.200'
    },
  };
  const c = config[level] || config.low;

  return (
    <Tooltip
      label={details ? `Score: ${details.score} | Issues: ${details.issues} | ${details.trend}` : ''}
      hasArrow
      bg="gray.900"
      color="white"
      borderRadius="lg"
      px={3}
      py={2}
    >
      <Box
        px={3}
        py={1.5}
        borderRadius="lg"
        bg={c.bg}
        border={`1px solid ${c.border}`}
        cursor="pointer"
        onClick={onClick}
        _hover={{ transform: 'scale(1.1)', boxShadow: `0 0 20px ${c.border}` }}
        transition="all 0.2s"
      >
        <Text fontSize="xs" fontWeight="bold" color={c.color} textTransform="uppercase">
          {level}
        </Text>
      </Box>
    </Tooltip>
  );
};

// Entity Detail Modal
const EntityDetailModal = ({ isOpen, onClose, entity, isDark }) => {
  if (!entity) return null;

  const glassCard = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'gray.50',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: 'xl',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
      <ModalContent
        bg={isDark ? '#1A1A2E' : 'white'}
        border={isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'}
        borderRadius="2xl"
      >
        <ModalHeader color={isDark ? 'white' : 'gray.800'} borderBottom={isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0'}>
          <HStack>
            <Box
              p={2}
              borderRadius="lg"
              bgGradient="linear(135deg, #8B5CF6, #6366F1)"
            >
              <Icon as={FiShield} color="white" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text>{entity.name}</Text>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} fontWeight="normal">{entity.code} | {entity.type}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={isDark ? 'white' : 'gray.600'} />
        <ModalBody py={6}>
          <SimpleGrid columns={2} spacing={4} mb={6}>
            <Box {...glassCard} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={1}>Compliance Score</Text>
              <HStack>
                <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{entity.score}%</Text>
                <Badge colorScheme={entity.trendDirection === 'up' ? 'green' : 'red'}>
                  {entity.trend}
                </Badge>
              </HStack>
            </Box>
            <Box {...glassCard} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={1}>Risk Exposure</Text>
              <Text fontSize="2xl" fontWeight="bold" color="#F87171">{entity.riskExposure}</Text>
            </Box>
            <Box {...glassCard} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={1}>Last Audit</Text>
              <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{entity.lastAudit}</Text>
              <Badge colorScheme={entity.auditResult === 'Pass' ? 'green' : 'orange'}>{entity.auditResult}</Badge>
            </Box>
            <Box {...glassCard} p={4}>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'} mb={1}>Employees</Text>
              <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{entity.employees.toLocaleString()}</Text>
            </Box>
          </SimpleGrid>

          <Text fontSize="sm" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mb={3}>Key Metrics</Text>
          <VStack spacing={3} align="stretch">
            {Object.entries(entity.keyMetrics).map(([key, value]) => (
              <Box key={key}>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm" color={isDark ? 'whiteAlpha.700' : 'gray.600'} textTransform="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color={value >= 90 ? '#6EE7B7' : value >= 75 ? '#FBBF24' : '#F87171'}>
                    {value}%
                  </Text>
                </HStack>
                <Progress
                  value={value}
                  size="sm"
                  borderRadius="full"
                  bg={isDark ? 'whiteAlpha.100' : 'gray.100'}
                  sx={{
                    '& > div': {
                      bgGradient: value >= 90 ? 'linear(to-r, #22D3EE, #6EE7B7)' : value >= 75 ? 'linear(to-r, #FBBF24, #F59E0B)' : 'linear(to-r, #F87171, #EF4444)',
                    }
                  }}
                />
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function Dashboard() {
  const { isDark, theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEntity, setSelectedEntity] = useState(null);

  const glassCard = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: '2xl',
    boxShadow: isDark ? 'none' : 'lg',
  };

  const openEntityDetail = (entityCode) => {
    const entity = entities.find(e => e.code === entityCode);
    setSelectedEntity(entity);
    onOpen();
  };

  const overallScore = Math.round(entities.reduce((acc, e) => acc + e.score, 0) / entities.length);
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const openAlerts = alerts.filter(a => a.status === 'open').length;

  return (
    <VStack spacing={6} align="stretch">
      {/* Executive KPIs */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <KPICard
          icon={FiShield}
          label="Overall Compliance Score"
          value={`${overallScore}%`}
          trend={executiveMetrics.scoreTrend}
          trendDirection="up"
          subValue="Across 5 entities"
          color="purple"
          isDark={isDark}
        />
        <KPICard
          icon={FiDollarSign}
          label="Total Risk Exposure"
          value={formatCurrency(executiveMetrics.totalRiskExposure)}
          trend={executiveMetrics.riskTrend}
          trendDirection="down"
          subValue="Potential regulatory fines"
          color="pink"
          isDark={isDark}
        />
        <KPICard
          icon={FiAlertTriangle}
          label="Active Alerts"
          value={openAlerts}
          subValue={criticalAlerts > 0 ? `${criticalAlerts} critical requires action` : 'All manageable'}
          color="orange"
          isDark={isDark}
        />
        <KPICard
          icon={FiTarget}
          label="Audit Readiness"
          value={`${executiveMetrics.auditReadiness}%`}
          trend="+4%"
          trendDirection="up"
          subValue="Ready for OJK examination"
          color="cyan"
          isDark={isDark}
        />
      </SimpleGrid>

      {/* Main Grid */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Risk Heatmap */}
        <Box {...glassCard} p={6}>
          <HStack justify="space-between" mb={4}>
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Risk Heatmap</Text>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.600' : 'gray.500'}>Click any cell to drill down</Text>
            </VStack>
            <HStack spacing={2}>
              <Badge bg={isDark ? 'rgba(110,231,183,0.2)' : 'green.50'} color={isDark ? '#6EE7B7' : 'green.600'}>Low</Badge>
              <Badge bg={isDark ? 'rgba(251,191,36,0.2)' : 'yellow.50'} color={isDark ? '#FBBF24' : 'yellow.600'}>Medium</Badge>
              <Badge bg={isDark ? 'rgba(248,113,113,0.2)' : 'red.50'} color={isDark ? '#F87171' : 'red.600'}>High</Badge>
            </HStack>
          </HStack>

          <Box overflowX="auto">
            <Grid templateColumns="180px repeat(4, 1fr)" gap={3} mb={2}>
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} fontWeight="bold">ENTITY</Text>
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} fontWeight="bold" textAlign="center">AML</Text>
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} fontWeight="bold" textAlign="center">KYC</Text>
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} fontWeight="bold" textAlign="center">REPORTING</Text>
              <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.400'} fontWeight="bold" textAlign="center">OPERATIONAL</Text>
            </Grid>

            {riskHeatmap.map((row, idx) => (
              <Grid
                key={idx}
                templateColumns="180px repeat(4, 1fr)"
                gap={3}
                py={3}
                borderTop={isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0'}
                alignItems="center"
                _hover={{ bg: isDark ? 'rgba(255,255,255,0.02)' : 'gray.50' }}
                cursor="pointer"
                onClick={() => openEntityDetail(row.code)}
              >
                <HStack>
                  <Text fontSize="sm" fontWeight="medium" color={isDark ? 'white' : 'gray.800'}>{row.entity}</Text>
                  <Icon as={FiArrowRight} color={isDark ? 'whiteAlpha.400' : 'gray.400'} boxSize={3} />
                </HStack>
                <Flex justify="center"><RiskCell level={row.aml} details={row.details?.aml} isDark={isDark} /></Flex>
                <Flex justify="center"><RiskCell level={row.kyc} details={row.details?.kyc} isDark={isDark} /></Flex>
                <Flex justify="center"><RiskCell level={row.reporting} details={row.details?.reporting} isDark={isDark} /></Flex>
                <Flex justify="center"><RiskCell level={row.operational} details={row.details?.operational} isDark={isDark} /></Flex>
              </Grid>
            ))}
          </Box>
        </Box>

        {/* Right Column */}
        <VStack spacing={6} align="stretch">
          {/* Regulatory Health */}
          <Box {...glassCard} p={6}>
            <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mb={4}>Regulatory Health</Text>
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(executiveMetrics.regulatoryHealth).map(([key, data]) => (
                <Tooltip key={key} label={`${data.pendingItems} pending items`} hasArrow>
                  <Box
                    p={4}
                    borderRadius="xl"
                    bg={data.status === 'good'
                      ? (isDark ? 'rgba(110,231,183,0.1)' : 'green.50')
                      : (isDark ? 'rgba(251,191,36,0.1)' : 'yellow.50')}
                    border={`1px solid ${data.status === 'good'
                      ? (isDark ? 'rgba(110,231,183,0.3)' : 'green.200')
                      : (isDark ? 'rgba(251,191,36,0.3)' : 'yellow.200')}`}
                    cursor="pointer"
                    _hover={{ transform: 'scale(1.02)' }}
                    transition="all 0.2s"
                  >
                    <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.500'} textTransform="uppercase" mb={1}>{key}</Text>
                    <HStack justify="space-between">
                      <CircularProgress
                        value={data.score}
                        size="50px"
                        thickness="8px"
                        color={data.status === 'good' ? '#6EE7B7' : '#FBBF24'}
                        trackColor={isDark ? 'whiteAlpha.100' : 'gray.100'}
                      >
                        <CircularProgressLabel fontSize="xs" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
                          {data.score}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <VStack spacing={0} align="end">
                        <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{data.pendingItems}</Text>
                        <Text fontSize="xs" color={isDark ? 'whiteAlpha.400' : 'gray.400'}>pending</Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Tooltip>
              ))}
            </SimpleGrid>
          </Box>

          {/* Upcoming Deadlines */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Upcoming Deadlines</Text>
              <Icon as={FiCalendar} color={isDark ? 'whiteAlpha.600' : 'gray.500'} />
            </HStack>
            <VStack spacing={3} align="stretch">
              {deadlines.slice(0, 4).map((deadline) => (
                <Box
                  key={deadline.id}
                  p={4}
                  borderRadius="xl"
                  bg={deadline.status === 'at_risk'
                    ? (isDark ? 'rgba(248,113,113,0.1)' : 'red.50')
                    : (isDark ? 'rgba(255,255,255,0.02)' : 'gray.50')}
                  border={`1px solid ${deadline.status === 'at_risk'
                    ? (isDark ? 'rgba(248,113,113,0.3)' : 'red.200')
                    : (isDark ? 'rgba(255,255,255,0.05)' : 'gray.200')}`}
                  borderLeft="4px solid"
                  borderLeftColor={deadline.priority === 'high' ? '#F87171' : '#FBBF24'}
                  cursor="pointer"
                  _hover={{ transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                >
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold" color={isDark ? 'white' : 'gray.800'}>{deadline.title}</Text>
                    <Badge
                      bg={deadline.daysLeft <= 30
                        ? (isDark ? 'rgba(248,113,113,0.2)' : 'red.50')
                        : (isDark ? 'rgba(255,255,255,0.1)' : 'gray.100')}
                      color={deadline.daysLeft <= 30 ? '#F87171' : (isDark ? 'whiteAlpha.700' : 'gray.600')}
                    >
                      {deadline.daysLeft}d
                    </Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{deadline.entity}</Text>
                    <HStack spacing={1}>
                      <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{deadline.progress}%</Text>
                      <Progress
                        value={deadline.progress}
                        size="xs"
                        width="60px"
                        borderRadius="full"
                        bg={isDark ? 'whiteAlpha.100' : 'gray.100'}
                        sx={{
                          '& > div': {
                            bgGradient: deadline.progress >= 80 ? 'linear(to-r, #22D3EE, #6EE7B7)' : deadline.progress >= 50 ? 'linear(to-r, #FBBF24, #F59E0B)' : 'linear(to-r, #F87171, #EF4444)',
                          }
                        }}
                      />
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Grid>

      {/* Entity Detail Modal */}
      <EntityDetailModal isOpen={isOpen} onClose={onClose} entity={selectedEntity} isDark={isDark} />
    </VStack>
  );
}
