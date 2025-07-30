import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Smartphone, Wrench, GraduationCap, TrendingUp, Zap, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: Wrench,
      title: 'تشخيص الأعطال',
      description: 'نظام ذكي لتشخيص أعطال الهواتف',
      gradient: ['#1E40AF', '#3B82F6'],
      onPress: () => router.push('/diagnosis')
    },
    {
      icon: GraduationCap,
      title: 'برنامج التدريب',
      description: '5 مستويات تدريبية متقدمة',
      gradient: ['#059669', '#10B981'],
      onPress: () => router.push('/training')
    },
    {
      icon: TrendingUp,
      title: 'الإحصائيات',
      description: 'تتبع التقدم والأداء',
      gradient: ['#F97316', '#FB923C'],
      onPress: () => router.push('/records')
    }
  ];

  const stats = [
    { label: 'أعطال مشخصة', value: '127', icon: Smartphone },
    { label: 'مستوى التدريب', value: '3/5', icon: Shield },
    { label: 'نسبة النجاح', value: '94%', icon: Zap }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA']}
        style={styles.backgroundGradient}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>مرحباً بك في</Text>
          <Text style={styles.appTitle}>Alhrizi Fix</Text>
          <Text style={styles.subtitle}>مساعدك الذكي في صيانة الهواتف</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <BlurView key={index} intensity={20} style={styles.statCard}>
              <stat.icon size={24} color="#1E40AF" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </BlurView>
          ))}
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={feature.onPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={feature.gradient}
                style={styles.featureGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <BlurView intensity={10} style={styles.featureContent}>
                  <feature.icon size={32} color="#FFFFFF" />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <BlurView intensity={15} style={styles.quickActionContent}>
                <Smartphone size={20} color="#1E40AF" />
                <Text style={styles.quickActionText}>جهاز جديد</Text>
              </BlurView>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <BlurView intensity={15} style={styles.quickActionContent}>
                <Wrench size={20} color="#1E40AF" />
                <Text style={styles.quickActionText}>تشخيص سريع</Text>
              </BlurView>
            </TouchableOpacity>
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  featuresContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 30,
  },
  featureCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  featureGradient: {
    padding: 2,
  },
  featureContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 8,
  },
});