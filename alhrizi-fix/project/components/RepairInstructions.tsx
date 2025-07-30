import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Thermometer, Wind, Wrench, Droplets, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface RepairStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  temperature?: string;
  airflow?: string;
  tip?: string;
  warning?: string;
}

const repairSteps: RepairStep[] = [
  {
    id: 1,
    title: 'تحضير الكاوية',
    description: 'ضبط درجة حرارة الكاوية حسب نوع القطعة',
    icon: Thermometer,
    temperature: '350°C',
    tip: 'استخدم سن رفيع للقطع الصغيرة',
  },
  {
    id: 2,
    title: 'إعداد الهوت إير',
    description: 'ضبط درجة الحرارة وسرعة الهواء',
    icon: Wind,
    temperature: '380°C',
    airflow: 'متوسط',
    warning: 'لا تستخدم هواء قوي مع القطع الحساسة',
  },
  {
    id: 3,
    title: 'إزالة القطعة',
    description: 'إزالة القطعة بحذر باستخدام الأدوات المناسبة',
    icon: Wrench,
    tip: 'استخدم الفلكس لرفع القطعة بلطف',
  },
  {
    id: 4,
    title: 'التنظيف',
    description: 'تنظيف المكان من بقايا اللحام والأوساخ',
    icon: Droplets,
    tip: 'استخدم الكحول الطبي للتنظيف',
  },
  {
    id: 5,
    title: 'الشبلنة والإرجاع',
    description: 'تطبيق الشبلنة وإرجاع القطعة الجديدة',
    icon: CheckCircle,
    temperature: '320°C',
    warning: 'تأكد من محاذاة القطعة بدقة',
  },
];

export default function RepairInstructions() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompletion = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>خطوات الإصلاح التفصيلية</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {repairSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <TouchableOpacity
              key={step.id}
              style={styles.stepCard}
              onPress={() => toggleStepCompletion(step.id)}
            >
              <BlurView intensity={15} style={styles.stepContent}>
                <LinearGradient
                  colors={isCompleted ? ['#059669', '#10B981'] : ['#1E40AF', '#3B82F6']}
                  style={styles.stepGradient}
                >
                  <View style={styles.stepHeader}>
                    <View style={styles.stepIconContainer}>
                      <step.icon size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.stepInfo}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDescription}>{step.description}</Text>
                    </View>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{step.id}</Text>
                    </View>
                  </View>

                  {/* Technical specifications */}
                  <View style={styles.specsContainer}>
                    {step.temperature && (
                      <View style={styles.specItem}>
                        <Thermometer size={16} color="#FFFFFF" />
                        <Text style={styles.specText}>الحرارة: {step.temperature}</Text>
                      </View>
                    )}
                    {step.airflow && (
                      <View style={styles.specItem}>
                        <Wind size={16} color="#FFFFFF" />
                        <Text style={styles.specText}>الهواء: {step.airflow}</Text>
                      </View>
                    )}
                  </View>

                  {/* Tips and warnings */}
                  {step.tip && (
                    <View style={styles.tipContainer}>
                      <CheckCircle size={16} color="#34D399" />
                      <Text style={styles.tipText}>{step.tip}</Text>
                    </View>
                  )}
                  
                  {step.warning && (
                    <View style={styles.warningContainer}>
                      <AlertTriangle size={16} color="#FBBF24" />
                      <Text style={styles.warningText}>{step.warning}</Text>
                    </View>
                  )}

                  {/* Completion indicator */}
                  {isCompleted && (
                    <View style={styles.completedIndicator}>
                      <CheckCircle size={20} color="#34D399" />
                      <Text style={styles.completedText}>تم الإنجاز</Text>
                    </View>
                  )}
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          التقدم: {completedSteps.length} من {repairSteps.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(completedSteps.length / repairSteps.length) * 100}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  stepContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepGradient: {
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  specsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  specText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 211, 153, 0.3)',
    padding: 8,
    borderRadius: 12,
    gap: 8,
  },
  completedText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
});