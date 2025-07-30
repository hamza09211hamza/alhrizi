import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ArrowDown, ArrowRight, CircleCheck as CheckCircle, Circle as XCircle, MessageCircle } from 'lucide-react-native';

interface FlowStep {
  id: number;
  question: string;
  type: 'question' | 'action' | 'result';
  yesNext?: number;
  noNext?: number;
  actionText?: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    question: 'هل الجهاز يعمل عند الضغط على زر التشغيل؟',
    type: 'question',
    yesNext: 2,
    noNext: 3,
  },
  {
    id: 2,
    question: 'هل الشاشة تظهر بوضوح؟',
    type: 'question',
    yesNext: 4,
    noNext: 5,
  },
  {
    id: 3,
    question: 'فحص البطارية والشاحن',
    type: 'action',
    actionText: 'قم بقياس الفولتية على البطارية',
  },
  {
    id: 4,
    question: 'الجهاز يعمل بشكل طبيعي',
    type: 'result',
  },
  {
    id: 5,
    question: 'مشكلة في الشاشة أو الكابل',
    type: 'action',
    actionText: 'فحص كابل الشاشة والموصلات',
  },
];

interface FlowchartDiagnosisProps {
  deviceName: string;
  faultDescription: string;
}

export default function FlowchartDiagnosis({ deviceName, faultDescription }: FlowchartDiagnosisProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{[key: number]: 'yes' | 'no'}>({});

  const handleAnswer = (stepId: number, answer: 'yes' | 'no') => {
    const step = flowSteps.find(s => s.id === stepId);
    if (!step) return;

    setAnswers({...answers, [stepId]: answer});
    setCompletedSteps([...completedSteps, stepId]);

    const nextStepId = answer === 'yes' ? step.yesNext : step.noNext;
    if (nextStepId) {
      setCurrentStep(nextStepId);
    }
  };

  const getStepColor = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      return ['#059669', '#10B981'];
    } else if (stepId === currentStep) {
      return ['#1E40AF', '#3B82F6'];
    } else {
      return ['#64748B', '#94A3B8'];
    }
  };

  const renderStep = (step: FlowStep, index: number) => {
    const isActive = step.id === currentStep;
    const isCompleted = completedSteps.includes(step.id);
    const colors = getStepColor(step.id);

    return (
      <View key={step.id} style={styles.stepContainer}>
        <BlurView intensity={15} style={styles.stepCard}>
          <LinearGradient
            colors={colors}
            style={styles.stepGradient}
          >
            <View style={styles.stepContent}>
              <Text style={styles.stepNumber}>{step.id}</Text>
              <Text style={styles.stepText}>{step.question}</Text>
              
              {step.type === 'question' && isActive && (
                <View style={styles.answerButtons}>
                  <TouchableOpacity
                    style={styles.yesButton}
                    onPress={() => handleAnswer(step.id, 'yes')}
                  >
                    <CheckCircle size={16} color="#FFFFFF" />
                    <Text style={styles.buttonText}>نعم</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => handleAnswer(step.id, 'no')}
                  >
                    <XCircle size={16} color="#FFFFFF" />
                    <Text style={styles.buttonText}>لا</Text>
                  </TouchableOpacity>
                </View>
              )}

              {step.type === 'action' && step.actionText && (
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>{step.actionText}</Text>
                </View>
              )}

              {isCompleted && answers[step.id] && (
                <View style={styles.answerIndicator}>
                  <Text style={styles.answerText}>
                    الإجابة: {answers[step.id] === 'yes' ? 'نعم' : 'لا'}
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </BlurView>

        {index < flowSteps.length - 1 && (
          <View style={styles.arrow}>
            <ArrowDown size={24} color="#64748B" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.deviceName}>{deviceName}</Text>
        <Text style={styles.faultText}>{faultDescription}</Text>
      </View>

      <ScrollView style={styles.flowContainer} showsVerticalScrollIndicator={false}>
        {flowSteps.map((step, index) => renderStep(step, index))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  faultText: {
    fontSize: 14,
    color: '#64748B',
  },
  flowContainer: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  stepCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  stepGradient: {
    padding: 20,
  },
  stepContent: {
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  answerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  yesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  noButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  actionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  answerIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  arrow: {
    marginVertical: 8,
  },
});