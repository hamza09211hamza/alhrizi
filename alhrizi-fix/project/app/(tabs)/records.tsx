import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, Filter, Calendar, Smartphone, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useState } from 'react';

export default function RecordsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const diagnosticRecords = [
    {
      id: 1,
      deviceName: 'iPhone 14 Pro',
      model: 'A2890',
      fault: 'لا يشحن',
      status: 'completed',
      date: '2024-01-15',
      time: '14:30',
      technician: 'أحمد محمد',
      duration: '45 دقيقة',
      solution: 'استبدال موصل الشحن'
    },
    {
      id: 2,
      deviceName: 'Samsung Galaxy S23',
      model: 'SM-S911B',
      fault: 'شاشة سوداء',
      status: 'in_progress',
      date: '2024-01-15',
      time: '16:15',
      technician: 'سارة علي',
      duration: '25 دقيقة',
      solution: 'قيد التشخيص'
    },
    {
      id: 3,
      deviceName: 'Huawei P50 Pro',
      model: 'JAD-L29',
      fault: 'مشكلة في الصوت',
      status: 'completed',
      date: '2024-01-14',
      time: '10:45',
      technician: 'محمد حسن',
      duration: '30 دقيقة',
      solution: 'تنظيف سماعة الأذن'
    },
    {
      id: 4,
      deviceName: 'Xiaomi 13 Pro',
      model: '2210132C',
      fault: 'بطء في الأداء',
      status: 'pending',
      date: '2024-01-14',
      time: '09:20',
      technician: 'فاطمة أحمد',
      duration: '15 دقيقة',
      solution: 'في انتظار القطع'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'in_progress':
        return '#F97316';
      case 'pending':
        return '#DC2626';
      default:
        return '#64748B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'in_progress':
        return 'قيد العمل';
      case 'pending':
        return 'معلق';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in_progress':
        return Clock;
      case 'pending':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const filteredRecords = diagnosticRecords.filter(record => {
    const matchesSearch = record.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.fault.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'إجمالي التشخيصات', value: '127', color: '#1E40AF' },
    { label: 'مكتملة', value: '89', color: '#059669' },
    { label: 'قيد العمل', value: '23', color: '#F97316' },
    { label: 'معلقة', value: '15', color: '#DC2626' }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#059669', '#10B981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>سجل التشخيصات</Text>
        <Text style={styles.headerSubtitle}>تتبع جميع أعمال الصيانة</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <BlurView key={index} intensity={15} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </BlurView>
          ))}
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <BlurView intensity={10} style={styles.searchBox}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="البحث في السجلات..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </BlurView>
          
          <View style={styles.filterButtons}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'completed', label: 'مكتمل' },
              { key: 'in_progress', label: 'قيد العمل' },
              { key: 'pending', label: 'معلق' }
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  filterStatus === filter.key && styles.activeFilterButton
                ]}
                onPress={() => setFilterStatus(filter.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filterStatus === filter.key && styles.activeFilterButtonText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Records List */}
        <View style={styles.recordsList}>
          {filteredRecords.map((record) => {
            const StatusIcon = getStatusIcon(record.status);
            return (
              <TouchableOpacity 
                key={record.id} 
                style={styles.recordCard}
                onPress={() => setSelectedRecord(record)}
              >
                <BlurView intensity={10} style={styles.recordContent}>
                  <View style={styles.recordHeader}>
                    <View style={styles.deviceInfo}>
                      <Smartphone size={20} color="#1E40AF" />
                      <View style={styles.deviceDetails}>
                        <Text style={styles.deviceName}>{record.deviceName}</Text>
                        <Text style={styles.deviceModel}>{record.model}</Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
                      <StatusIcon size={16} color="#FFFFFF" />
                      <Text style={styles.statusText}>{getStatusText(record.status)}</Text>
                    </View>
                  </View>

                  <View style={styles.faultContainer}>
                    <Text style={styles.faultLabel}>العطل:</Text>
                    <Text style={styles.faultText}>{record.fault}</Text>
                  </View>

                  <View style={styles.solutionContainer}>
                    <Text style={styles.solutionLabel}>الحل:</Text>
                    <Text style={styles.solutionText}>{record.solution}</Text>
                  </View>

                  <View style={styles.recordFooter}>
                    <View style={styles.technicianInfo}>
                      <Text style={styles.technicianLabel}>الفني:</Text>
                      <Text style={styles.technicianName}>{record.technician}</Text>
                    </View>
                    <View style={styles.timeInfo}>
                      <Calendar size={14} color="#64748B" />
                      <Text style={styles.timeText}>{record.date}</Text>
                      <Clock size={14} color="#64748B" />
                      <Text style={styles.timeText}>{record.time}</Text>
                    </View>
                  </View>

                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{record.duration}</Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredRecords.length === 0 && (
          <BlurView intensity={10} style={styles.emptyState}>
            <Search size={48} color="#94A3B8" />
            <Text style={styles.emptyStateTitle}>لا توجد نتائج</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery 
                ? 'لم يتم العثور على سجلات تطابق البحث'
                : 'لا توجد سجلات في هذا القسم'
              }
            </Text>
          </BlurView>
        )}

        {/* Detailed Record Modal */}
        {selectedRecord && (
          <View style={styles.modalOverlay}>
            <BlurView intensity={20} style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>تفاصيل التشخيص</Text>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>معلومات الجهاز</Text>
                  <Text style={styles.modalText}>{selectedRecord.deviceName} - {selectedRecord.model}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>وصف العطل</Text>
                  <Text style={styles.modalText}>{selectedRecord.fault}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>الحل المطبق</Text>
                  <Text style={styles.modalText}>{selectedRecord.solution}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>تفاصيل إضافية</Text>
                  <Text style={styles.modalText}>الفني: {selectedRecord.technician}</Text>
                  <Text style={styles.modalText}>التاريخ: {selectedRecord.date}</Text>
                  <Text style={styles.modalText}>الوقت: {selectedRecord.time}</Text>
                  <Text style={styles.modalText}>المدة: {selectedRecord.duration}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedRecord(null)}
                >
                  <Text style={styles.closeButtonText}>إغلاق</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterButton: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  recordsList: {
    gap: 16,
    marginBottom: 40,
  },
  recordCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recordContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  deviceModel: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  faultContainer: {
    marginBottom: 12,
  },
  faultLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  faultText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  solutionContainer: {
    marginBottom: 16,
  },
  solutionLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  solutionText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  technicianInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  technicianLabel: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 6,
  },
  technicianName: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
  },
  durationBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  modalOverlay: {
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
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  closeButton: {
    backgroundColor: '#1E40AF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});