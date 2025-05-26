import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    aesthetic: string[];
    points: number;
  }[];
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 0;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  margin-bottom: 2rem;
  border: 1px solid rgba(142, 107, 158, 0.1);
`;

const QuestionText = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button<{ selected?: boolean }>`
  background: ${props => props.selected ? '#8E6B9E' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid #8E6B9E;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.selected ? '#4A3858' : '#F8F0FB'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  background: linear-gradient(to right, #8E6B9E, #4A3858);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(142, 107, 158, 0.2);

  &:hover {
    background: linear-gradient(to right, #4A3858, #8E6B9E);
    box-shadow: 0 6px 20px rgba(142, 107, 158, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ResultCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(142, 107, 158, 0.1);
  text-align: center;
  border: 1px solid rgba(142, 107, 158, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #8E6B9E, #4A3858);
  }
`;

const ResultTitle = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #8E6B9E, #4A3858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const ResultDescription = styled.p`
  color: #666;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const questions: Question[] = [
  {
    id: 1,
    text: "What's your ideal weekend activity?",
    options: [
      { text: "Reading in a cozy cafe with vintage decor", aesthetic: ["Dark Academia", "Light Academia"], points: 3 },
      { text: "Exploring urban streets and taking artistic photos", aesthetic: ["Cyberpunk", "Streetwear"], points: 2 },
      { text: "Gardening and crafting", aesthetic: ["Cottagecore", "Naturecore"], points: 4 },
      { text: "Shopping at trendy boutiques", aesthetic: ["Y2K", "Modern"], points: 1 }
    ]
  },
  {
    id: 2,
    text: "Which color palette speaks to you most?",
    options: [
      { text: "Earth tones and warm neutrals", aesthetic: ["Cottagecore", "Naturecore"], points: 4 },
      { text: "Dark academia browns and deep greens", aesthetic: ["Dark Academia"], points: 3 },
      { text: "Neon lights and metallic shades", aesthetic: ["Cyberpunk", "Y2K"], points: 2 },
      { text: "Pastel and soft hues", aesthetic: ["Light Academia", "Soft Girl"], points: 1 }
    ]
  },
  {
    id: 3,
    text: "What's your preferred music genre?",
    options: [
      { text: "Classical and instrumental", aesthetic: ["Dark Academia", "Light Academia"], points: 3 },
      { text: "Electronic and synthwave", aesthetic: ["Cyberpunk", "Y2K"], points: 2 },
      { text: "Folk and acoustic", aesthetic: ["Cottagecore", "Naturecore"], points: 4 },
      { text: "Pop and K-pop", aesthetic: ["Y2K", "Modern"], points: 1 }
    ]
  },
  {
    id: 4,
    text: "Pick your dream living space:",
    options: [
      { text: "Cozy cottage with a garden", aesthetic: ["Cottagecore", "Naturecore"], points: 4 },
      { text: "Modern apartment with city views", aesthetic: ["Modern", "Minimalist"], points: 2 },
      { text: "Victorian library room", aesthetic: ["Dark Academia", "Light Academia"], points: 3 },
      { text: "Futuristic smart home", aesthetic: ["Cyberpunk", "Modern"], points: 1 }
    ]
  },
  {
    id: 5,
    text: "What's your fashion inspiration?",
    options: [
      { text: "Vintage academic wear", aesthetic: ["Dark Academia", "Light Academia"], points: 3 },
      { text: "Streetwear with futuristic elements", aesthetic: ["Cyberpunk", "Streetwear"], points: 2 },
      { text: "Flowy dresses and natural fabrics", aesthetic: ["Cottagecore", "Naturecore"], points: 4 },
      { text: "Y2K revival and modern trends", aesthetic: ["Y2K", "Modern"], points: 1 }
    ]
  }
];

const aestheticDescriptions = {
  "Dark Academia": "You're drawn to the intellectual and moody aspects of academic life, with a love for classic literature, vintage fashion, and rich, dark color palettes.",
  "Light Academia": "You appreciate the scholarly aesthetic but with a brighter, more optimistic approach, featuring cream colors and a focus on the joy of learning.",
  "Cottagecore": "You're attracted to a romanticized rural life, with a love for nature, handmade items, and traditional skills.",
  "Cyberpunk": "You're fascinated by the intersection of technology and counterculture, with a preference for futuristic fashion and neon aesthetics.",
  "Y2K": "You love the nostalgic revival of late 90s and early 2000s fashion, with bold colors and fun, playful elements.",
  "Modern": "You appreciate contemporary design and current trends, with a focus on clean lines and innovative styles.",
  "Naturecore": "You find inspiration in the natural world, with a strong connection to environmental themes and organic elements.",
  "Streetwear": "You're influenced by urban culture and casual fashion, mixing comfort with style."
};

export const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = questionIndex;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const aestheticScores: { [key: string]: number } = {};
    
    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      selectedOption.aesthetic.forEach(aesthetic => {
        if (!aestheticScores[aesthetic]) {
          aestheticScores[aesthetic] = 0;
        }
        aestheticScores[aesthetic] += selectedOption.points;
      });
    });

    const topAesthetic = Object.entries(aestheticScores)
      .sort(([, a], [, b]) => b - a)[0][0];
    
    setResult(topAesthetic);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      calculateResult();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  if (result) {
    return (
      <PageContainer>
        <ResultCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ResultTitle>Your Aesthetic: {result}</ResultTitle>
          <ResultDescription>{
            aestheticDescriptions[result as keyof typeof aestheticDescriptions] || 'No description available.'
          }</ResultDescription>
          <NavButton onClick={() => {
            setCurrentQuestion(0);
            setAnswers([]);
            setResult(null);
          }}>
            Take Quiz Again
          </NavButton>
        </ResultCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Discover Your Aesthetic</Title>
        <Subtitle>
          Answer these questions to find out which aesthetic best matches your style and preferences.
        </Subtitle>
      </Header>

      <QuestionCard
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <QuestionText>{questions[currentQuestion].text}</QuestionText>
        <OptionsContainer>
          {questions[currentQuestion].options.map((option, index) => (
            <Option
              key={index}
              selected={answers[currentQuestion] === index}
              onClick={() => handleAnswer(index)}
            >
              {option.text}
            </Option>
          ))}
        </OptionsContainer>
        <NavigationButtons>
          <NavButton
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'See Result' : 'Next'}
          </NavButton>
        </NavigationButtons>
      </QuestionCard>
    </PageContainer>
  );
}; 