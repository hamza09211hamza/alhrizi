import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GraduationCap, Star, Play, Lock, CircleCheck as CheckCircle, Award, Cpu, Zap, Map, Wrench, Target } from 'lucide-react-native';
import InteractiveQuiz from '@/components/InteractiveQuiz';

const { width } = Dimensions.get('window');

export default function TrainingScreen() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);

  const trainingLevels = [
    {
      level: 1,
      title: 'التعريف بالقطع الأساسية',
      description: 'تعلم جميع القطع في البورد ووظائفها',
      icon: Cpu,
      color: ['#059669', '#10B981'],
      isUnlocked: true,
      progress: 100,
      lessons: 12,
      duration: '2.5 ساعة'
    },
    {
      level: 2,
      title: 'مسارات البور والقياس',
      description: 'تعلم مسارات الطاقة وأدوات القياس',
      icon: Zap,
      color: ['#1E40AF', '#3B82F6'],
      isUnlocked: true,
      progress: 75,
      lessons: 15,
      duration: '3 ساعات'
    },
    {
      level: 3,
      title: 'قراءة المخططات',
      description: 'تحليل وقراءة المخططات الإلكترونية',
      icon: Map,
      color: ['#F97316', '#FB923C'],
      isUnlocked: true,
      progress: 45,
      lessons: 18,
      duration: '4 ساعات'
    },
    {
      level: 4,
      title: 'إزالة القطع والتنظيف',
      description: 'تقنيات الإزالة والتنظيف والشبلنة',
      icon: Wrench,
      color: ['#7C3AED', '#8B5CF6'],
      isUnlocked: false,
      progress: 0,
      lessons: 20,
      duration: '5 ساعات'
    },
    {
      level: 5,
      title: 'الأعطال المتقدمة',
      description: 'من الأعطال العادية إلى المستحيلة',
      icon: Target,
      color: ['#DC2626', '#EF4444'],
      isUnlocked: false,
      progress: 0,
      lessons: 25,
      duration: '6 ساعات'
    }
  ];

  const currentLevelData = trainingLevels[selectedLevel - 1];

  const levelLessons = [
    {
      id: 1,
      title: 'مقدمة في القطع الإلكترونية',
      duration: '12 دقيقة',
      isCompleted: true,
      type: 'video'
    },
    {
      id: 2,
      title: 'المعالج (CPU) ووظائفه',
      duration: '15 دقيقة',
      isCompleted: true,
      type: 'video'
    },
    {
      id: 3,
      title: 'ذاكرة الوصول العشوائي (RAM)',
      duration: '10 دقيقة',
      isCompleted: true,
      type: 'video'
    },
    {
      id: 4,
      title: 'اختبار تحديد القطع',
      duration: '8 دقائق',
      isCompleted: false,
      type: 'quiz'
    },
    {
      id: 5,
      title: 'المقاومات والمكثفات',
      duration: '18 دقيقة',
      isCompleted: false,
      type: 'video'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>برنامج التدريب</Text>
        <Text style={styles.headerSubtitle}>طور مهاراتك في الصيانة</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Training Levels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المستويات التدريبية</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelsScroll}>
            {trainingLevels.map((level) => (
              <TouchableOpacity
                key={level.level}
                style={[
                  styles.levelCard,
                  selectedLevel === level.level && styles.selectedLevelCard
                ]}
                onPress={() => setSelectedLevel(level.level)}
                disabled={!level.isUnlocked}
              >
                <LinearGradient
                  colors={level.isUnlocked ? level.color : ['#94A3B8', '#CBD5E1']}
                  style={styles.levelGradient}
                >
                  <BlurView intensity={10} style={styles.levelContent}>
                    {level.isUnlocked ? (
                      <level.icon size={32} color="#FFFFFF" />
                    ) : (
                      <Lock size={32} color="#FFFFFF" />
                    )}
                    <Text style={styles.levelNumber}>المستوى {level.level}</Text>
                    <Text style={styles.levelTitle}>{level.title}</Text>
                    {level.isUnlocked && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View 
                            style={[styles.progressFill, { width: `${level.progress}%` }]}
                          />
                        </View>
                        <Text style={styles.progressText}>{level.progress}%</Text>
                      </View>
                    )}
                  </BlurView>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Level Details */}
        <View style={styles.section}>
          <BlurView intensity={15} style={styles.levelDetailsCard}>
            <LinearGradient
              colors={currentLevelData.isUnlocked ? currentLevelData.color : ['#94A3B8', '#CBD5E1']}
              style={styles.levelDetailsHeader}
            >
              <currentLevelData.icon size={40} color="#FFFFFF" />
              <View style={styles.levelDetailsInfo}>
                <Text style={styles.levelDetailsTitle}>{currentLevelData.title}</Text>
                <Text style={styles.levelDetailsDescription}>{currentLevelData.description}</Text>
              </View>
            </LinearGradient>
            
            <View style={styles.levelStats}>
              <View style={styles.statItem}>
                <Play size={20} color="#1E40AF" />
                <Text style={styles.statValue}>{currentLevelData.lessons}</Text>
                <Text style={styles.statLabel}>درس</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={20} color="#F97316" />
                <Text style={styles.statValue}>{currentLevelData.duration}</Text>
                <Text style={styles.statLabel}>مدة</Text>
              </View>
              <View style={styles.statItem}>
                <Award size={20} color="#059669" />
                <Text style={styles.statValue}>{currentLevelData.progress}%</Text>
                <Text style={styles.statLabel}>تقدم</Text>
              </View>
            </View>
            
            {currentLevelData.isUnlocked && (
              <TouchableOpacity 
                style={styles.quizButton}
                onPress={() => setShowQuiz(true)}
              >
                <LinearGradient
                  colors={['#7C3AED', '#8B5CF6']}
                  style={styles.quizGradient}
                >
                  <Target size={20} color="#FFFFFF" />
                  <Text style={styles.quizButtonText}>بدء الاختبار</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </BlurView>
        </View>

        {/* Interactive Quiz Modal */}
        {showQuiz && (
          <View style={styles.quizModal}>
            <InteractiveQuiz 
              level={selectedLevel}
              onComplete={(score) => {
                setShowQuiz(false);
                Alert.alert('نتيجة الاختبار', `لقد حصلت على ${score} نقاط!`);
              }}
            />
          </View>
        )}

        {/* Lessons List */}
        {currentLevelData.isUnlocked && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>دروس المستوى {selectedLevel}</Text>
            {levelLessons.map((lesson) => (
              <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
                <BlurView intensity={10} style={styles.lessonContent}>
                  <View style={styles.lessonInfo}>
                    <View style={styles.lessonHeader}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      {lesson.isCompleted && (
                        <CheckCircle size={20} color="#059669" />
                      )}
                    </View>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                    <View style={styles.lessonType}>
                      <Text style={styles.lessonTypeText}>
                        {lesson.type === 'video' ? '🎥 فيديو' : '📝 اختبار'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Play size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Achievement Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإنجازات</Text>
          <View style={styles.achievementsGrid}>
            <BlurView intensity={10} style={styles.achievementCard}>
              <Award size={24} color="#F97316" />
              <Text style={styles.achievementTitle}>أول تشخيص</Text>
              <Text style={styles.achievementDescription}>أكمل أول تشخيص بنجاح</Text>
            </BlurView>
            <BlurView intensity={10} style={styles.achievementCard}>
              <GraduationCap size={24} color="#059669" />
              <Text style={styles.achievementTitle}>طالب مجتهد</Text>
              <Text style={styles.achievementDescription}>أكمل 10 دروس</Text>
            </BlurView>
          </View>
        </View>
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
  levelsScroll: {
    paddingBottom: 10,
  },
  levelCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  selectedLevelCard: {
    borderWidth: 3,
    borderColor: '#1E40AF',
  },
  levelGradient: {
    padding: 2,
  },
  levelContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 12,
    marginBottom: 4,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  levelDetailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  levelDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  levelDetailsInfo: {
    flex: 1,
    marginLeft: 16,
  },
  levelDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  levelDetailsDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  lessonCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  lessonContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  lessonType: {
    alignSelf: 'flex-start',
  },
  lessonTypeText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#1E40AF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  quizButton: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  quizModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F8FAFC',
    zIndex: 1000,
  },
});