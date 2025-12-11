import { useState } from 'react';
import {
  Box, Text, VStack, HStack, Avatar, Grid, SimpleGrid, Badge, Button, Progress, Flex, Icon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, Tooltip, CircularProgress, CircularProgressLabel, useToast
} from '@chakra-ui/react';
import {
  FiAward, FiTrendingUp, FiPlay, FiStar, FiClock, FiTarget, FiZap, FiGift,
  FiCheckCircle, FiLock, FiUsers, FiBook, FiHelpCircle
} from 'react-icons/fi';
import { userProfile, leaderboard, pendingQuizzes, dailyChallenges, rewards } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

// Badge Card with rarity glow
const BadgeCard = ({ badge, onClick, isDark }) => {
  const rarityColors = {
    legendary: { glow: 'rgba(255,215,0,0.5)', border: '#FFD700', bg: 'linear(135deg, #FFD700, #FFA500)' },
    gold: { glow: 'rgba(255,193,7,0.4)', border: '#FFC107', bg: 'linear(135deg, #FFC107, #FF9800)' },
    silver: { glow: 'rgba(192,192,192,0.4)', border: '#C0C0C0', bg: 'linear(135deg, #E0E0E0, #9E9E9E)' },
    bronze: { glow: 'rgba(205,127,50,0.4)', border: '#CD7F32', bg: 'linear(135deg, #CD7F32, #8B4513)' },
  };
  const rarity = rarityColors[badge.rarity] || rarityColors.bronze;

  return (
    <Tooltip label={badge.description} hasArrow bg="gray.900" borderRadius="lg">
      <Box
        p={4}
        borderRadius="2xl"
        bg={isDark ? 'rgba(255,255,255,0.05)' : 'gray.50'}
        border={`2px solid ${rarity.border}`}
        boxShadow={`0 0 20px ${rarity.glow}`}
        cursor="pointer"
        onClick={onClick}
        _hover={{
          transform: 'scale(1.05) rotate(2deg)',
          boxShadow: `0 0 30px ${rarity.glow}`,
        }}
        transition="all 0.3s ease"
        textAlign="center"
      >
        <Text fontSize="4xl" mb={2}>{badge.icon}</Text>
        <Text fontSize="sm" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} noOfLines={1}>{badge.name}</Text>
        <Badge
          bgGradient={rarity.bg}
          color={badge.rarity === 'silver' ? 'gray.800' : 'white'}
          fontSize="xs"
          mt={1}
          textTransform="capitalize"
        >
          {badge.rarity}
        </Badge>
      </Box>
    </Tooltip>
  );
};

// Quiz Card
const QuizCard = ({ quiz, onStart, isDark }) => {
  const difficultyColors = {
    easy: { bg: isDark ? 'rgba(110,231,183,0.2)' : 'green.50', color: isDark ? '#6EE7B7' : 'green.600' },
    medium: { bg: isDark ? 'rgba(251,191,36,0.2)' : 'yellow.50', color: isDark ? '#FBBF24' : 'yellow.600' },
    hard: { bg: isDark ? 'rgba(248,113,113,0.2)' : 'red.50', color: isDark ? '#F87171' : 'red.600' },
  };
  const diff = difficultyColors[quiz.difficulty] || difficultyColors.medium;

  const glassCard = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: '2xl',
    boxShadow: isDark ? 'none' : 'md',
  };

  return (
    <Box
      {...glassCard}
      p={5}
      _hover={{ transform: 'translateY(-4px)', boxShadow: isDark ? '0 20px 40px rgba(139,92,246,0.2)' : 'xl' }}
      transition="all 0.3s"
    >
      <HStack justify="space-between" mb={3}>
        <HStack>
          <Box
            p={2}
            borderRadius="xl"
            bgGradient="linear(135deg, #8B5CF6, #6366F1)"
          >
            <Icon as={FiBook} color="white" boxSize={5} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" color={isDark ? 'white' : 'gray.800'} fontSize="sm">{quiz.title}</Text>
            <HStack spacing={2}>
              <Badge colorScheme="purple">{quiz.category}</Badge>
              <Badge bg={diff.bg} color={diff.color}>{quiz.difficulty}</Badge>
            </HStack>
          </VStack>
        </HStack>
        <VStack align="end" spacing={0}>
          <HStack>
            <Icon as={FiStar} color="#FFD700" />
            <Text fontWeight="bold" color="#FFD700">{quiz.points}</Text>
          </HStack>
          <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>points</Text>
        </VStack>
      </HStack>

      <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.600'} mb={3}>{quiz.description}</Text>

      <HStack justify="space-between" mb={3}>
        <HStack spacing={4} fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>
          <HStack><Icon as={FiClock} boxSize={3} /><Text>{quiz.duration}</Text></HStack>
          <HStack><Icon as={FiHelpCircle} boxSize={3} /><Text>{quiz.questions} questions</Text></HStack>
        </HStack>
        <HStack spacing={1}>
          <Icon as={FiUsers} boxSize={3} color={isDark ? 'whiteAlpha.500' : 'gray.500'} />
          <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{quiz.completedBy} completed</Text>
        </HStack>
      </HStack>

      <Button
        w="full"
        bgGradient="linear(135deg, #FF6B9D, #C850C0)"
        color="white"
        _hover={{ bgGradient: 'linear(135deg, #FF8CB3, #D870D8)', transform: 'scale(1.02)' }}
        leftIcon={<FiPlay />}
        onClick={() => onStart(quiz)}
      >
        Start Quiz
      </Button>
    </Box>
  );
};

// Daily Challenge Item
const ChallengeItem = ({ challenge, onComplete, isDark }) => (
  <Flex
    p={4}
    borderRadius="xl"
    bg={challenge.completed
      ? (isDark ? 'rgba(110,231,183,0.1)' : 'green.50')
      : (isDark ? 'rgba(255,255,255,0.03)' : 'gray.50')}
    border={`1px solid ${challenge.completed
      ? (isDark ? 'rgba(110,231,183,0.3)' : 'green.200')
      : (isDark ? 'rgba(255,255,255,0.08)' : 'gray.200')}`}
    align="center"
    justify="space-between"
    _hover={{ transform: challenge.completed ? 'none' : 'translateX(4px)' }}
    transition="all 0.2s"
    cursor={challenge.completed ? 'default' : 'pointer'}
    onClick={() => !challenge.completed && onComplete(challenge)}
  >
    <HStack spacing={3}>
      <Text fontSize="2xl">{challenge.icon}</Text>
      <VStack align="start" spacing={0}>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={challenge.completed ? (isDark ? 'whiteAlpha.500' : 'gray.400') : (isDark ? 'white' : 'gray.800')}
          textDecoration={challenge.completed ? 'line-through' : 'none'}
        >
          {challenge.title}
        </Text>
        <HStack spacing={1}>
          <Icon as={FiStar} color="#FFD700" boxSize={3} />
          <Text fontSize="xs" color="#FFD700">+{challenge.points} pts</Text>
        </HStack>
      </VStack>
    </HStack>
    {challenge.completed ? (
      <Icon as={FiCheckCircle} color="#6EE7B7" boxSize={6} />
    ) : (
      <Box
        w={6}
        h={6}
        borderRadius="full"
        border={isDark ? '2px solid rgba(255,255,255,0.3)' : '2px solid gray'}
      />
    )}
  </Flex>
);

// Reward Item
const RewardItem = ({ reward, userPoints, onClaim, isDark }) => {
  const canClaim = userPoints >= reward.points;

  return (
    <Flex
      p={4}
      borderRadius="xl"
      bg={canClaim
        ? (isDark ? 'rgba(139,92,246,0.1)' : 'purple.50')
        : (isDark ? 'rgba(255,255,255,0.02)' : 'gray.50')}
      border={`1px solid ${canClaim
        ? (isDark ? 'rgba(139,92,246,0.3)' : 'purple.200')
        : (isDark ? 'rgba(255,255,255,0.05)' : 'gray.200')}`}
      align="center"
      justify="space-between"
      opacity={canClaim ? 1 : 0.6}
      _hover={canClaim ? { transform: 'scale(1.02)' } : {}}
      transition="all 0.2s"
    >
      <HStack spacing={3}>
        <Text fontSize="3xl">{reward.icon}</Text>
        <VStack align="start" spacing={0}>
          <Text fontSize="sm" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{reward.name}</Text>
          <HStack spacing={1}>
            <Icon as={FiStar} color="#FFD700" boxSize={3} />
            <Text fontSize="xs" color="#FFD700">{reward.points.toLocaleString()} pts</Text>
          </HStack>
        </VStack>
      </HStack>
      <Button
        size="sm"
        bgGradient={canClaim ? 'linear(135deg, #22D3EE, #6EE7B7)' : 'none'}
        bg={canClaim ? undefined : (isDark ? 'whiteAlpha.100' : 'gray.200')}
        color={canClaim ? 'gray.900' : (isDark ? 'whiteAlpha.500' : 'gray.500')}
        leftIcon={canClaim ? <FiGift /> : <FiLock />}
        isDisabled={!canClaim}
        onClick={() => onClaim(reward)}
        _hover={canClaim ? { transform: 'scale(1.05)' } : {}}
      >
        {canClaim ? 'Claim' : 'Locked'}
      </Button>
    </Flex>
  );
};

// Leaderboard Row
const LeaderboardRow = ({ user, rank, isDark }) => (
  <Flex
    p={3}
    borderRadius="xl"
    bg={user.isCurrentUser
      ? (isDark ? 'rgba(139,92,246,0.15)' : 'purple.50')
      : 'transparent'}
    border={user.isCurrentUser
      ? (isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid purple')
      : '1px solid transparent'}
    align="center"
    _hover={{ bg: isDark ? 'rgba(255,255,255,0.03)' : 'gray.50' }}
    transition="all 0.2s"
  >
    <Text
      fontSize="lg"
      fontWeight="bold"
      w="40px"
      color={rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : (isDark ? 'whiteAlpha.600' : 'gray.500')}
    >
      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
    </Text>
    <HStack flex={1} spacing={3}>
      <Text fontSize="2xl">{user.avatar}</Text>
      <VStack align="start" spacing={0}>
        <HStack>
          <Text fontSize="sm" fontWeight={user.isCurrentUser ? 'bold' : 'medium'} color={isDark ? 'white' : 'gray.800'}>
            {user.name}
          </Text>
          {user.isCurrentUser && (
            <Badge bgGradient="linear(135deg, #FF6B9D, #C850C0)" color="white" fontSize="xs">
              You
            </Badge>
          )}
        </HStack>
        <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{user.entity} | Lv.{user.level}</Text>
      </VStack>
    </HStack>
    <VStack spacing={0} align="end">
      <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>{user.score}</Text>
      <HStack spacing={1}>
        <Text fontSize="xs">🔥</Text>
        <Text fontSize="xs" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{user.streak}d</Text>
      </HStack>
    </VStack>
  </Flex>
);

export default function Gamification() {
  const { isDark } = useTheme();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBadge, setSelectedBadge] = useState(null);

  const glassCard = {
    bg: isDark ? 'rgba(255,255,255,0.03)' : 'white',
    backdropFilter: 'blur(10px)',
    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
    borderRadius: '2xl',
    boxShadow: isDark ? 'none' : 'lg',
  };

  const xpProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;
  const completedChallenges = dailyChallenges.filter(c => c.completed).length;

  const handleStartQuiz = (quiz) => {
    toast({
      title: `Starting ${quiz.title}`,
      description: 'Quiz will start in 3 seconds...',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleClaimReward = (reward) => {
    toast({
      title: 'Reward Claimed!',
      description: `You claimed ${reward.name}!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleCompleteChallenge = (challenge) => {
    toast({
      title: 'Challenge Started!',
      description: `Complete: ${challenge.title}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  const openBadgeDetail = (badge) => {
    setSelectedBadge(badge);
    onOpen();
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Hero Profile Card */}
      <Box
        bgGradient="linear(135deg, #4A148C 0%, #6B21A8 30%, #8B5CF6 60%, #22D3EE 100%)"
        p={8}
        borderRadius="2xl"
        position="relative"
        overflow="hidden"
      >
        {/* Decorative elements */}
        <Box
          position="absolute"
          top="-50px"
          right="-50px"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="rgba(255,255,255,0.1)"
        />
        <Box
          position="absolute"
          bottom="-30px"
          left="20%"
          w="100px"
          h="100px"
          borderRadius="full"
          bg="rgba(255,255,255,0.05)"
        />

        <Flex justify="space-between" align="center" flexWrap="wrap" gap={6} position="relative">
          <HStack spacing={6}>
            <Box position="relative">
              <Avatar
                size="2xl"
                name={userProfile.name}
                bgGradient="linear(135deg, #FF6B9D, #C850C0)"
                color="white"
                fontWeight="bold"
                border="4px solid white"
                boxShadow="0 8px 32px rgba(0,0,0,0.3)"
              />
              <Box
                position="absolute"
                bottom={0}
                right={0}
                bg="#FFD700"
                color="gray.900"
                px={2}
                py={0.5}
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                Lv.{userProfile.level}
              </Box>
            </Box>
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="white">{userProfile.name}</Text>
              <Text color="whiteAlpha.800">{userProfile.levelName}</Text>
              <HStack spacing={3} mt={2}>
                <Badge bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
                  {userProfile.entity}
                </Badge>
                <Badge bg="rgba(255,215,0,0.3)" color="#FFD700" px={3} py={1} borderRadius="full">
                  {userProfile.streak} day streak
                </Badge>
              </HStack>
            </VStack>
          </HStack>

          <HStack spacing={8}>
            <VStack spacing={0} align="center">
              <CircularProgress
                value={userProfile.score}
                size="100px"
                thickness="8px"
                color="#6EE7B7"
                trackColor="whiteAlpha.200"
              >
                <CircularProgressLabel fontWeight="bold" fontSize="xl" color="white">
                  {userProfile.score}
                </CircularProgressLabel>
              </CircularProgress>
              <Text fontSize="sm" color="whiteAlpha.800" mt={1}>Score</Text>
            </VStack>

            <VStack spacing={0} align="center">
              <Text fontSize="5xl" fontWeight="bold" color="white">#{userProfile.rank}</Text>
              <Text fontSize="sm" color="whiteAlpha.800">Global Rank</Text>
            </VStack>

            <VStack spacing={0} align="center">
              <Text fontSize="5xl" fontWeight="bold" color="#FFD700">{userProfile.totalPoints.toLocaleString()}</Text>
              <Text fontSize="sm" color="whiteAlpha.800">Total Points</Text>
            </VStack>
          </HStack>
        </Flex>

        {/* XP Bar */}
        <Box mt={6}>
          <HStack justify="space-between" mb={2}>
            <HStack>
              <Icon as={FiZap} color="#FFD700" />
              <Text fontSize="sm" color="whiteAlpha.800">Level {userProfile.level} Progress</Text>
            </HStack>
            <Text fontSize="sm" color="whiteAlpha.600">{userProfile.xp} / {userProfile.xpToNextLevel} XP</Text>
          </HStack>
          <Progress
            value={xpProgress}
            size="md"
            borderRadius="full"
            bg="whiteAlpha.200"
            sx={{
              '& > div': {
                bgGradient: 'linear(to-r, #FFD700, #FF6B9D, #C850C0)',
              }
            }}
          />
        </Box>
      </Box>

      {/* Main Grid */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        {/* Left Column */}
        <VStack spacing={6} align="stretch">
          {/* Daily Challenges */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <HStack>
                <Icon as={FiTarget} color="#FF6B9D" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Daily Challenges</Text>
              </HStack>
              <Badge
                bgGradient="linear(135deg, #22D3EE, #6EE7B7)"
                color="gray.900"
              >
                {completedChallenges}/{dailyChallenges.length} Done
              </Badge>
            </HStack>
            <VStack spacing={3} align="stretch">
              {dailyChallenges.map((challenge) => (
                <ChallengeItem key={challenge.id} challenge={challenge} onComplete={handleCompleteChallenge} isDark={isDark} />
              ))}
            </VStack>
          </Box>

          {/* Pending Quizzes */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <HStack>
                <Icon as={FiBook} color="#8B5CF6" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Available Quizzes</Text>
              </HStack>
              <Badge colorScheme="purple">{pendingQuizzes.length} available</Badge>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {pendingQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onStart={handleStartQuiz} isDark={isDark} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Leaderboard */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <HStack>
                <Icon as={FiTrendingUp} color="#6EE7B7" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Leaderboard</Text>
              </HStack>
              <Badge bg={isDark ? 'rgba(255,255,255,0.1)' : 'gray.100'} color={isDark ? 'whiteAlpha.700' : 'gray.600'}>This Week</Badge>
            </HStack>
            <VStack spacing={2} align="stretch">
              {leaderboard.map((user, idx) => (
                <LeaderboardRow key={user.rank} user={user} rank={idx + 1} isDark={isDark} />
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* Right Column */}
        <VStack spacing={6} align="stretch">
          {/* Badges */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <HStack>
                <Icon as={FiAward} color="#FFD700" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Your Badges</Text>
              </HStack>
              <Text fontSize="sm" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>{userProfile.badges.length} earned</Text>
            </HStack>
            <Grid templateColumns="repeat(3, 1fr)" gap={3}>
              {userProfile.badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} onClick={() => openBadgeDetail(badge)} isDark={isDark} />
              ))}
            </Grid>
          </Box>

          {/* Rewards Shop */}
          <Box {...glassCard} p={6}>
            <HStack justify="space-between" mb={4}>
              <HStack>
                <Icon as={FiGift} color="#FF6B9D" boxSize={5} />
                <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>Rewards Shop</Text>
              </HStack>
              <HStack>
                <Icon as={FiStar} color="#FFD700" />
                <Text fontSize="sm" fontWeight="bold" color="#FFD700">{userProfile.totalPoints.toLocaleString()}</Text>
              </HStack>
            </HStack>
            <VStack spacing={3} align="stretch">
              {rewards.map((reward) => (
                <RewardItem
                  key={reward.id}
                  reward={reward}
                  userPoints={userProfile.totalPoints}
                  onClaim={handleClaimReward}
                  isDark={isDark}
                />
              ))}
            </VStack>
          </Box>

          {/* Stats Card */}
          <Box {...glassCard} p={6}>
            <Text fontSize="lg" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mb={4}>Your Stats</Text>
            <SimpleGrid columns={2} spacing={4}>
              <VStack
                p={4}
                borderRadius="xl"
                bg={isDark ? 'rgba(110,231,183,0.1)' : 'green.50'}
                border={isDark ? '1px solid rgba(110,231,183,0.3)' : '1px solid'}
                borderColor={isDark ? undefined : 'green.200'}
              >
                <Text fontSize="2xl" fontWeight="bold" color="#6EE7B7">{userProfile.stats.completedTrainings}</Text>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.600'}>Trainings</Text>
              </VStack>
              <VStack
                p={4}
                borderRadius="xl"
                bg={isDark ? 'rgba(139,92,246,0.1)' : 'purple.50'}
                border={isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid'}
                borderColor={isDark ? undefined : 'purple.200'}
              >
                <Text fontSize="2xl" fontWeight="bold" color="#8B5CF6">{userProfile.stats.quizzesTaken}</Text>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.600'}>Quizzes</Text>
              </VStack>
              <VStack
                p={4}
                borderRadius="xl"
                bg={isDark ? 'rgba(255,107,157,0.1)' : 'pink.50'}
                border={isDark ? '1px solid rgba(255,107,157,0.3)' : '1px solid'}
                borderColor={isDark ? undefined : 'pink.200'}
              >
                <Text fontSize="2xl" fontWeight="bold" color="#FF6B9D">{userProfile.stats.sopReviewed}</Text>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.600'}>SOP Reviewed</Text>
              </VStack>
              <VStack
                p={4}
                borderRadius="xl"
                bg={isDark ? 'rgba(34,211,238,0.1)' : 'cyan.50'}
                border={isDark ? '1px solid rgba(34,211,238,0.3)' : '1px solid'}
                borderColor={isDark ? undefined : 'cyan.200'}
              >
                <Text fontSize="2xl" fontWeight="bold" color="#22D3EE">{userProfile.stats.helpGiven}</Text>
                <Text fontSize="xs" color={isDark ? 'whiteAlpha.600' : 'gray.600'}>Helped Others</Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Grid>

      {/* Badge Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent bg={isDark ? '#1A1A2E' : 'white'} border={isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'} borderRadius="2xl">
          <ModalHeader color={isDark ? 'white' : 'gray.800'} textAlign="center" pb={0}>Badge Unlocked!</ModalHeader>
          <ModalCloseButton color={isDark ? 'white' : 'gray.600'} />
          <ModalBody py={8} textAlign="center">
            {selectedBadge && (
              <>
                <Text fontSize="6xl" mb={4}>{selectedBadge.icon}</Text>
                <Text fontSize="xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'} mb={2}>{selectedBadge.name}</Text>
                <Badge
                  bgGradient={`linear(135deg, ${selectedBadge.rarity === 'legendary' ? '#FFD700, #FFA500' : selectedBadge.rarity === 'gold' ? '#FFC107, #FF9800' : '#8B5CF6, #6366F1'})`}
                  color="white"
                  mb={4}
                  px={4}
                  py={1}
                  borderRadius="full"
                  textTransform="capitalize"
                >
                  {selectedBadge.rarity}
                </Badge>
                <Text color={isDark ? 'whiteAlpha.700' : 'gray.600'} mb={4}>{selectedBadge.description}</Text>
                <Text fontSize="sm" color={isDark ? 'whiteAlpha.500' : 'gray.500'}>Earned: {selectedBadge.earned}</Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
