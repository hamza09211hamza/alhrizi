import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Zap, Thermometer, Activity, Settings } from 'lucide-react-native';

interface MeasurementReading {
  voltage: string;
  current: string;
  resistance: string;
  temperature: string;
}

interface MeasurementToolsProps {
  onReadingsChange: (readings: MeasurementReading) => void;
}

export default function MeasurementTools({ onReadingsChange }: MeasurementToolsProps) {
  const [readings, setReadings] = useState<MeasurementReading>({
    voltage: '',
    current: '',
    resistance: '',
    temperature: '',
  });

  const updateReading = (field: keyof MeasurementReading, value: string) => {
    const newReadings = { ...readings, [field]: value };
    setReadings(newReadings);
    onReadingsChange(newReadings);
  };

  const tools = [
    {
      name: 'الأفوميتر',
      icon: Zap,
      color: ['#1E40AF', '#3B82F6'],
      measurements: [
        { label: 'الفولتية (V)', key: 'voltage' as keyof MeasurementReading, unit: 'V' },
        { label: 'التيار (A)', key: 'current' as keyof MeasurementReading, unit: 'A' },
        { label: 'المقاومة (Ω)', key: 'resistance' as keyof MeasurementReading, unit: 'Ω' },
      ]
    },
    {
      name: 'الباور سبلاي',
      icon: Activity,
      color: ['#059669', '#10B981'],
      measurements: [
        { label: 'الفولتية المضبوطة', key: 'voltage' as keyof MeasurementReading, unit: 'V' },
        { label: 'التيار المسحوب', key: 'current' as keyof MeasurementReading, unit: 'A' },
      ]
    },
    {
      name: 'مقياس الحرارة',
      icon: Thermometer,
      color: ['#F97316', '#FB923C'],
      measurements: [
        { label: 'درجة الحرارة', key: 'temperature' as keyof MeasurementReading, unit: '°C' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>قراءات أجهزة القياس</Text>
      
      {tools.map((tool, toolIndex) => (
        <BlurView key={toolIndex} intensity={10} style={styles.toolCard}>
          <LinearGradient
            colors={tool.color}
            style={styles.toolHeader}
          >
            <tool.icon size={24} color="#FFFFFF" />
            <Text style={styles.toolName}>{tool.name}</Text>
          </LinearGradient>
          
          <View style={styles.measurementsContainer}>
            {tool.measurements.map((measurement, measurementIndex) => (
              <View key={measurementIndex} style={styles.measurementRow}>
                <Text style={styles.measurementLabel}>{measurement.label}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.measurementInput}
                    value={readings[measurement.key]}
                    onChangeText={(value) => updateReading(measurement.key, value)}
                    placeholder="0.00"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                  <Text style={styles.unitText}>{measurement.unit}</Text>
                </View>
              </View>
            ))}
          </View>
        </BlurView>
      ))}

      <TouchableOpacity style={styles.saveButton}>
        <LinearGradient
          colors={['#7C3AED', '#8B5CF6']}
          style={styles.saveGradient}
        >
          <Settings size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>حفظ القراءات</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  toolCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  toolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  measurementsContainer: {
    padding: 16,
    gap: 12,
  },
  measurementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  measurementLabel: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 100,
  },
  measurementInput: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    flex: 1,
  },
  unitText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});