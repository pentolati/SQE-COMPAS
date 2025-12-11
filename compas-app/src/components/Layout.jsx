import { Box, Flex, Text, VStack, Avatar, Badge, Icon, HStack, Divider, Tooltip, Progress, IconButton } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiAlertTriangle, FiAward, FiMessageSquare, FiTrendingUp, FiZap, FiSun, FiMoon } from 'react-icons/fi';
import { userProfile, alerts } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Dashboard', path: '/', icon: FiHome, description: 'Executive Overview' },
  { label: 'Alerts', path: '/alerts', icon: FiAlertTriangle, badgeCount: alerts.filter(a => a.status === 'open').length, description: 'Risk Monitoring' },
  { label: 'My Compliance', path: '/gamification', icon: FiAward, description: 'Training & Rewards' },
  { label: 'AI Assistant', path: '/ai-assistant', icon: FiMessageSquare, description: 'Ask COMPAS' },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const { isDark, theme, toggleTheme } = useTheme();
  const xpProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  return (
    <Flex h="100vh" bg={theme.bg.primary}>
      {/* Sidebar */}
      <Box
        w="280px"
        bgGradient={theme.bg.sidebar}
        color="white"
        py={6}
        px={4}
        position="relative"
        boxShadow="xl"
      >
        {/* Logo */}
        <HStack spacing={3} mb={8} px={2}>
          <Box
            w="48px"
            h="48px"
            bgGradient="linear(135deg, #FF6B9D, #C850C0)"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 4px 15px rgba(200, 80, 192, 0.4)"
          >
            <Text fontSize="2xl" fontWeight="black" color="white">C</Text>
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">COMPAS</Text>
            <Text fontSize="xs" opacity={0.7}>Compliance Automation</Text>
          </VStack>
        </HStack>

        {/* Navigation */}
        <VStack align="stretch" spacing={2}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip key={item.label} label={item.description} placement="right" hasArrow>
                <Box>
                  <NavLink to={item.path} style={{ textDecoration: 'none' }}>
                    <Flex
                      align="center"
                      p={3}
                      borderRadius="xl"
                      bg={isActive ? 'rgba(255,255,255,0.15)' : 'transparent'}
                      border={isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'}
                      _hover={{
                        bg: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(4px)',
                      }}
                      transition="all 0.2s ease"
                      cursor="pointer"
                    >
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg={isActive ? 'rgba(255,107,157,0.3)' : 'rgba(255,255,255,0.1)'}
                        mr={3}
                      >
                        <Icon as={item.icon} boxSize={5} />
                      </Box>
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontWeight={isActive ? 'bold' : 'medium'} fontSize="sm">
                          {item.label}
                        </Text>
                      </VStack>
                      {item.badgeCount > 0 && (
                        <Badge
                          bgGradient="linear(135deg, #FF6B9D, #FF8E53)"
                          color="white"
                          borderRadius="full"
                          px={2}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          {item.badgeCount}
                        </Badge>
                      )}
                    </Flex>
                  </NavLink>
                </Box>
              </Tooltip>
            );
          })}
        </VStack>

        {/* User Profile Card at Bottom */}
        <Box position="absolute" bottom={6} left={4} right={4}>
          <Divider borderColor="whiteAlpha.200" mb={4} />

          {/* XP Progress */}
          <Box mb={4} px={2}>
            <HStack justify="space-between" mb={1}>
              <HStack spacing={1}>
                <Icon as={FiZap} color="yellow.300" boxSize={4} />
                <Text fontSize="xs" fontWeight="bold">Level {userProfile.level}</Text>
              </HStack>
              <Text fontSize="xs" opacity={0.7}>{userProfile.xp}/{userProfile.xpToNextLevel} XP</Text>
            </HStack>
            <Progress
              value={xpProgress}
              size="sm"
              borderRadius="full"
              bgGradient="linear(to-r, whiteAlpha.200, whiteAlpha.100)"
              sx={{
                '& > div': {
                  bgGradient: 'linear(to-r, #22D3EE, #6EE7B7)',
                }
              }}
            />
          </Box>

          {/* User Card */}
          <Flex
            align="center"
            p={3}
            bgGradient="linear(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
            borderRadius="xl"
            border="1px solid rgba(255,255,255,0.1)"
            _hover={{
              bgGradient: 'linear(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
              transform: 'scale(1.02)',
            }}
            transition="all 0.2s"
            cursor="pointer"
          >
            <Avatar
              size="md"
              name={userProfile.name}
              bgGradient="linear(135deg, #FF6B9D, #C850C0)"
              color="white"
              fontWeight="bold"
            />
            <VStack align="start" spacing={0} ml={3} flex={1}>
              <Text fontSize="sm" fontWeight="bold">{userProfile.name}</Text>
              <HStack spacing={2}>
                <HStack spacing={1}>
                  <Icon as={FiTrendingUp} color="green.300" boxSize={3} />
                  <Text fontSize="xs" color="green.300">{userProfile.score}%</Text>
                </HStack>
                <Text fontSize="xs">streak {userProfile.streak}</Text>
              </HStack>
            </VStack>
            <Badge
              bgGradient="linear(135deg, #FFD700, #FFA500)"
              color="gray.800"
              borderRadius="full"
              px={2}
              fontSize="xs"
              fontWeight="bold"
            >
              #{userProfile.rank}
            </Badge>
          </Flex>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg={theme.bg.primary} overflowY="auto">
        {/* Header */}
        <Flex
          bg={isDark ? 'rgba(255,255,255,0.02)' : 'white'}
          backdropFilter="blur(10px)"
          px={8}
          py={5}
          borderBottom={`1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0'}`}
          align="center"
          justify="space-between"
          position="sticky"
          top={0}
          zIndex={10}
          boxShadow={isDark ? 'none' : 'sm'}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={theme.text.primary}>
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </Text>
            <Text fontSize="sm" color={theme.text.tertiary}>
              {navItems.find(item => item.path === location.pathname)?.description}
            </Text>
          </Box>

          <HStack spacing={4}>
            {/* Theme Toggle */}
            <Tooltip label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} hasArrow>
              <IconButton
                icon={isDark ? <FiSun /> : <FiMoon />}
                onClick={toggleTheme}
                variant="ghost"
                color={theme.text.secondary}
                bg={isDark ? 'rgba(255,255,255,0.05)' : 'gray.100'}
                _hover={{
                  bg: isDark ? 'rgba(255,255,255,0.1)' : 'gray.200',
                  transform: 'rotate(180deg)',
                }}
                transition="all 0.3s"
                borderRadius="xl"
                aria-label="Toggle theme"
              />
            </Tooltip>

            <Box
              px={4}
              py={2}
              bg={isDark ? 'rgba(99,102,241,0.2)' : 'purple.50'}
              borderRadius="xl"
              border={`1px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'purple.200'}`}
            >
              <HStack>
                <Text fontSize="sm" color={theme.text.tertiary}>Entity:</Text>
                <Text fontSize="sm" fontWeight="bold" color={theme.text.primary}>All SMMA</Text>
              </HStack>
            </Box>

            <Box
              px={4}
              py={2}
              bg={isDark ? 'rgba(34,211,238,0.2)' : 'cyan.50'}
              borderRadius="xl"
              border={`1px solid ${isDark ? 'rgba(34,211,238,0.3)' : 'cyan.200'}`}
            >
              <HStack>
                <Box w={2} h={2} bg="green.400" borderRadius="full" />
                <Text fontSize="sm" fontWeight="medium" color={isDark ? 'cyan.200' : 'cyan.700'}>
                  Live Sync
                </Text>
              </HStack>
            </Box>
          </HStack>
        </Flex>

        {/* Page Content */}
        <Box p={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
