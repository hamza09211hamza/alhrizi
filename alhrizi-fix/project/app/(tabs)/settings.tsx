import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Settings as SettingsIcon, User, Bell, Moon, Globe, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settingsSections = [
    {
      title: 'الحساب',
      items: [
        {
          icon: User,
          title: 'الملف الشخصي',
          subtitle: 'إدارة معلوماتك الشخصية',
          hasArrow: true,
          onPress: () => {}
        },
        {
          icon: Shield,
          title: 'الخصوصية والأمان',
          subtitle: 'إعدادات الحماية والخصوصية',
          hasArrow: true,
          onPress: () => {}
        }
      ]
    },
    {
      title: 'التطبيق',
      items: [
        {
          icon: Bell,
          title: 'الإشعارات',
          subtitle: 'إدارة الإشعارات والتنبيهات',
          hasSwitch: true,
          switchValue: notifications,
          onSwitchChange: setNotifications
        },
        {
          icon: Moon,
          title: 'الوضع الليلي',
          subtitle: 'التبديل بين الوضع الفاتح والمظلم',
          hasSwitch: true,
          switchValue: darkMode,
          onSwitchChange: setDarkMode
        },
        {
          icon: Globe,
          title: 'اللغة',
          subtitle: 'العربية',
          hasArrow: true,
          onPress: () => {}
        }
      ]
    },
    {
      title: 'المساعدة والدعم',
      items: [
        {
          icon: HelpCircle,
          title: 'مركز المساعدة',
          subtitle: 'الأسئلة الشائعة والدعم',
          hasArrow: true,
          onPress: () => {}
        },
        {
          icon: Info,
          title: 'حول التطبيق',
          subtitle: 'الإصدار 1.0.0',
          hasArrow: true,
          onPress: () => {}
        }
      ]
    }
  ];

  const userInfo = {
    name: 'أحمد محمد',
    email: 'ahmed.mohamed@email.com',
    level: 'فني متقدم',
    avatar: '👨‍🔧'
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#64748B', '#94A3B8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>الإعدادات</Text>
        <Text style={styles.headerSubtitle}>إدارة حسابك وتطبيقك</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <BlurView intensity={15} style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.avatar}>{userInfo.avatar}</Text>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{userInfo.level}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>تعديل</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <BlurView intensity={10} style={styles.settingsContainer}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex !== section.items.length - 1 && styles.settingItemBorder
                  ]}
                  onPress={item.onPress}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingItemLeft}>
                    <View style={styles.settingIconContainer}>
                      <item.icon size={20} color="#1E40AF" />
                    </View>
                    <View style={styles.settingItemContent}>
                      <Text style={styles.settingItemTitle}>{item.title}</Text>
                      <Text style={styles.settingItemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.settingItemRight}>
                    {item.hasSwitch && (
                      <Switch
                        value={item.switchValue}
                        onValueChange={item.onSwitchChange}
                        trackColor={{ false: '#E2E8F0', true: '#1E40AF' }}
                        thumbColor={item.switchValue ? '#FFFFFF' : '#F1F5F9'}
                      />
                    )}
                    {item.hasArrow && (
                      <ChevronRight size={20} color="#9CA3AF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </BlurView>
          </View>
        ))}

        {/* Statistics Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إحصائياتك</Text>
          <BlurView intensity={10} style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>تشخيص مكتمل</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statLabel}>نسبة النجاح</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3/5</Text>
              <Text style={styles.statLabel}>مستوى التدريب</Text>
            </View>
          </BlurView>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <BlurView intensity={10} style={styles.logoutContent}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.logoutText}>تسجيل الخروج</Text>
          </BlurView>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.appVersion}>
          Alhrizi Fix v1.0.0 - تطوير فريق التقنية المتقدمة
        </Text>
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
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    fontSize: 40,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  settingItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  logoutButton: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutContent: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
  },
});