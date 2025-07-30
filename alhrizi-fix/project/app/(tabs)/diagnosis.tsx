import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Smartphone, Plus, Search, MessageCircle, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import FlowchartDiagnosis from '@/components/FlowchartDiagnosis';
import MeasurementTools from '@/components/MeasurementTools';
import RepairInstructions from '@/components/RepairInstructions';

export default function DiagnosisScreen() {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [faultDescription, setFaultDescription] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: 'yes' | 'no' | 'discuss'}>({});
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussionText, setDiscussionText] = useState('');
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showRepairInstructions, setShowRepairInstructions] = useState(false);

  const devices = [
    { name: 'iPhone 14 Pro', model: 'A2890', image: '📱' },
    { name: 'Samsung Galaxy S23', model: 'SM-S911B', image: '📱' },
    { name: 'Huawei P50 Pro', model: 'JAD-L29', image: '📱' },
    { name: 'Xiaomi 13 Pro', model: '2210132C', image: '📱' },
  ];

  const diagnosticQuestions = [
    'هل الجهاز يعمل عند الضغط على زر التشغيل؟',
    'هل الشاشة تظهر أي إضاءة أو ألوان؟',
    'هل يتم شحن البطارية عند توصيل الشاحن؟',
    'هل يظهر شعار الشركة عند التشغيل؟',
    'هل تعمل الأزرار الجانبية بشكل طبيعي؟'
  ];

  const handleAnswer = (answer: 'yes' | 'no' | 'discuss') => {
    if (answer === 'discuss') {
      setShowDiscussion(true);
      return;
    }
    
    setAnswers({...answers, [currentQuestion]: answer});
    
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete diagnosis
      Alert.alert('تم التشخيص', 'تم حفظ التشخيص بنجاح');
    }
  };

  const submitDiscussion = () => {
    setAnswers({...answers, [currentQuestion]: 'discuss'});
    setShowDiscussion(false);
    setDiscussionText('');
    
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>تشخيص الأعطال</Text>
        <Text style={styles.headerSubtitle}>نظام التشخيص الذكي</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Device Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختيار الجهاز</Text>
          <View style={styles.deviceGrid}>
            {devices.map((device, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.deviceCard,
                  selectedDevice === device.name && styles.selectedDevice
                ]}
                onPress={() => setSelectedDevice(device.name)}
              >
                <BlurView intensity={10} style={styles.deviceContent}>
                  <Text style={styles.deviceEmoji}>{device.image}</Text>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceModel}>{device.model}</Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addDeviceButton}>
            <Plus size={20} color="#1E40AF" />
            <Text style={styles.addDeviceText}>إضافة جهاز جديد</Text>
          </TouchableOpacity>
        </View>

        {/* Fault Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>وصف العطل</Text>
          <BlurView intensity={5} style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="اكتب وصف العطل هنا..."
              placeholderTextColor="#9CA3AF"
              value={faultDescription}
              onChangeText={setFaultDescription}
              multiline
              numberOfLines={3}
            />
          </BlurView>
        </View>

        {/* Diagnostic Questions */}
        {selectedDevice && faultDescription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>أسئلة التشخيص</Text>
            
            {/* Navigation buttons */}
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={[styles.navButton, showFlowchart && styles.activeNavButton]}
                onPress={() => setShowFlowchart(!showFlowchart)}
              >
                <Text style={styles.navButtonText}>مخطط التشخيص</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navButton, showMeasurements && styles.activeNavButton]}
                onPress={() => setShowMeasurements(!showMeasurements)}
              >
                <Text style={styles.navButtonText}>أجهزة القياس</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navButton, showRepairInstructions && styles.activeNavButton]}
                onPress={() => setShowRepairInstructions(!showRepairInstructions)}
              >
                <Text style={styles.navButtonText}>خطوات الإصلاح</Text>
              </TouchableOpacity>
            </View>

            {showFlowchart && (
              <FlowchartDiagnosis 
                deviceName={selectedDevice} 
                faultDescription={faultDescription} 
              />
            )}

            {showMeasurements && (
              <MeasurementTools 
                onReadingsChange={(readings) => console.log('Readings:', readings)} 
              />
            )}

            {showRepairInstructions && (
              <RepairInstructions />
            )}

            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / diagnosticQuestions.length) * 100}%` }
                ]}
              />
            </View>
            
            <BlurView intensity={10} style={styles.questionContainer}>
              <Text style={styles.questionNumber}>
                السؤال {currentQuestion + 1} من {diagnosticQuestions.length}
              </Text>
              <Text style={styles.questionText}>
                {diagnosticQuestions[currentQuestion]}
              </Text>
              
              <View style={styles.answerButtons}>
                <TouchableOpacity
                  style={[styles.answerButton, styles.yesButton]}
                  onPress={() => handleAnswer('yes')}
                >
                  <CheckCircle size={20} color="#FFFFFF" />
                  <Text style={styles.answerButtonText}>نعم</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.answerButton, styles.noButton]}
                  onPress={() => handleAnswer('no')}
                >
                  <XCircle size={20} color="#FFFFFF" />
                  <Text style={styles.answerButtonText}>لا</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.answerButton, styles.discussButton]}
                  onPress={() => handleAnswer('discuss')}
                >
                  <MessageCircle size={20} color="#FFFFFF" />
                  <Text style={styles.answerButtonText}>ناقش</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        )}

        {/* Discussion Modal */}
        {showDiscussion && (
          <BlurView intensity={20} style={styles.discussionOverlay}>
            <View style={styles.discussionModal}>
              <Text style={styles.discussionTitle}>مناقشة السؤال</Text>
              <Text style={styles.discussionQuestion}>
                {diagnosticQuestions[currentQuestion]}
              </Text>
              <TextInput
                style={styles.discussionInput}
                placeholder="اكتب ملاحظاتك أو استفساراتك هنا..."
                placeholderTextColor="#9CA3AF"
                value={discussionText}
                onChangeText={setDiscussionText}
                multiline
                numberOfLines={4}
              />
              <View style={styles.discussionButtons}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={submitDiscussion}
                >
                  <Text style={styles.submitButtonText}>حفظ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowDiscussion(false)}
                >
                  <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        )}
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  deviceCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDevice: {
    borderColor: '#1E40AF',
  },
  deviceContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    alignItems: 'center',
  },
  deviceEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  deviceModel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E40AF',
    borderStyle: 'dashed',
  },
  addDeviceText: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
    marginLeft: 8,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
  },
  textInput: {
    fontSize: 16,
    color: '#1E293B',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1E40AF',
    borderRadius: 3,
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
  },
  questionNumber: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  answerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  answerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  yesButton: {
    backgroundColor: '#059669',
  },
  noButton: {
    backgroundColor: '#DC2626',
  },
  discussButton: {
    backgroundColor: '#F97316',
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  discussionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  discussionModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  discussionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  discussionQuestion: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
    textAlign: 'center',
  },
  discussionInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 20,
  },
  discussionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#1E40AF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeNavButton: {
    backgroundColor: '#1E40AF',
  },
  navButtonText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
  },
});