import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { CircleCheck as CheckCircle, Circle as XCircle, Target, Award } from 'lucide-react-native';

interface QuizQuestion {
  id: number;
  type: 'component_identification' | 'measurement_analysis' | 'fault_scenario';
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'component_identification',
    question: 'حدد موقع المعالج الرئيسي في هذا البورد',
    image: '🔧', // في التطبيق الحقيقي، ستكون صورة بورد حقيقية
    options: ['المنطقة A', 'المنطقة B', 'المنطقة C', 'المنطقة D'],
    correctAnswer: 1,
    explanation: 'المعالج الرئيسي يقع عادة في وسط البورد ويكون أكبر الآيسيهات حجماً',
  },
  {
    id: 2,
    type: 'measurement_analysis',
    question: 'إذا كانت قراءة الفولتية على البطارية 2.1V، ما هو التشخيص؟',
    options: ['البطارية سليمة', 'البطارية ضعيفة', 'البطارية تالفة', 'يحتاج فحص إضافي'],
    correctAnswer: 2,
    explanation: 'الفولتية الطبيعية للبطارية يجب أن تكون 3.7V أو أعلى، 2.1V يعني البطارية ضعيفة جداً',
  },
  {
    id: 3,
    type: 'fault_scenario',
    question: 'جهاز لا يشحن ولكن يعمل على البطارية، ما هو السبب المحتمل؟',
    options: ['البطارية تالفة', 'مشكلة في الشاحن', 'مشكلة في دائرة الشحن', 'مشكلة في الشاشة'],
    correctAnswer: 2,
    explanation: 'إذا كان الجهاز يعمل على البطارية ولكن لا يشحن، فالمشكلة في دائرة الشحن وليس البطارية',
  },
];

interface InteractiveQuizProps {
  level: number;
  onComplete: (score: number) => void;
}

export default function InteractiveQuiz({ level, onComplete }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quizQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(score);
    }
  };

  const getOptionStyle = (optionIndex: number) => {
    if (selectedAnswer === null) {
      return styles.option;
    }
    
    if (optionIndex === question.correctAnswer) {
      return [styles.option, styles.correctOption];
    } else if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return [styles.option, styles.wrongOption];
    } else {
      return [styles.option, styles.disabledOption];
    }
  };

  const getOptionIcon = (optionIndex: number) => {
    if (selectedAnswer === null) return null;
    
    if (optionIndex === question.correctAnswer) {
      return <CheckCircle size={20} color="#FFFFFF" />;
    } else if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return <XCircle size={20} color="#FFFFFF" />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Target size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>اختبار المستوى {level}</Text>
        </View>
        <Text style={styles.questionCounter}>
          السؤال {currentQuestion + 1} من {quizQuestions.length}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <BlurView intensity={15} style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          {question.image && (
            <View style={styles.imageContainer}>
              <Text style={styles.placeholderImage}>{question.image}</Text>
              <Text style={styles.imageCaption}>صورة البورد للتحليل</Text>
            </View>
          )}

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
                {getOptionIcon(index)}
              </TouchableOpacity>
            ))}
          </View>

          {showExplanation && (
            <BlurView intensity={10} style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>التفسير:</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </BlurView>
          )}
        </BlurView>

        {showExplanation && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={['#059669', '#10B981']}
              style={styles.nextGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion < quizQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Score indicator */}
        <View style={styles.scoreContainer}>
          <Award size={20} color="#F97316" />
          <Text style={styles.scoreText}>النقاط: {score} / {currentQuestion + (selectedAnswer !== null ? 1 : 0)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questionCounter: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderImage: {
    fontSize: 60,
    marginBottom: 8,
  },
  imageCaption: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  correctOption: {
    backgroundColor: '#059669',
    borderColor: '#047857',
  },
  wrongOption: {
    backgroundColor: '#DC2626',
    borderColor: '#B91C1C',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextGradient: {
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});